<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { GeneralController } from '@/stores/GeneralController';
import ProcedureModalView from '../widgets/ProcedureModalView.vue';
import alertService from '@/services/alertService';

const props = defineProps<{
  procedure: string | number;
}>();

const subTab = ref('one');
const formLoader = ref(false);
const selectedFile = ref<File | null>(null);
const description = ref('');
const fileError = ref('');
const versionFiles = ref<any[]>([]);

const showModal = ref(false);
const selectedVersion = ref<any>(null);
const versionLink = ref<string | null>(null);

const safeEncrypt = (data: any) => btoa(String(data));

const cleanupVersionLink = () => {
  if (versionLink.value && versionLink.value.startsWith('blob:')) {
    URL.revokeObjectURL(versionLink.value);
    versionLink.value = null;
  }
};

const fetchVersionList = async () => {
  try {
    const controller = new GeneralController();
    const data: any = await controller.retrieveData(
      'procedure/retrieve/file-list',
      { procedure: String(props.procedure) },
      'versionList'
    );
    versionFiles.value = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to fetch procedure versions:', error);
  }
};

onMounted(() => {
  fetchVersionList();
});

onBeforeUnmount(() => {
  cleanupVersionLink();
});

const loadVersionPdf = async (encryptedVersionId: string) => {
  cleanupVersionLink();
  try {
    const controller = new GeneralController();
    const response = await controller.retrieveFile(encryptedVersionId, 'procedure/retrieve/version/view');
    const pdfData = response instanceof Blob ? response : new Uint8Array(response).buffer as ArrayBuffer;
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    versionLink.value = URL.createObjectURL(blob);
  } catch (error) {
    console.error('Failed to view version PDF:', error);
    alertService.error('Could not load version PDF document.');
  }
};

const openModal = async (versionId: any) => {
  const encId = safeEncrypt(versionId);
  try {
    const controller = new GeneralController();
    selectedVersion.value = await controller.retrieveData(
      'procedure/retrieve/version/details',
      { version: encId },
      'version'
    );
    showModal.value = true;
    await loadVersionPdf(encId);
  } catch (error) {
    console.error('Error fetching version details:', error);
  }
};

const uploadFiles = async () => {
  fileError.value = '';
  if (!selectedFile.value) {
    fileError.value = 'Please select a PDF file to upload.';
    return;
  }

  const fileToUpload = Array.isArray(selectedFile.value) ? selectedFile.value[0] : selectedFile.value;
  if (fileToUpload.type !== 'application/pdf') {
    fileError.value = 'Only PDF format files are permitted for QMS document revisions.';
    return;
  }

  formLoader.value = true;
  try {
    const formData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('description', description.value);
    formData.append('procedure', String(props.procedure));

    const controller = new GeneralController();
    await GeneralController.storeItemFiles('procedure/store/file', formData);

    alertService.toast('Procedure revision uploaded successfully.');
    description.value = '';
    selectedFile.value = null;
    subTab.value = 'one';
    await fetchVersionList();
  } catch (error: any) {
    console.error('Upload failed:', error);
    alertService.error('Failed to upload procedure revision file.');
  } finally {
    formLoader.value = false;
  }
};
</script>

<template>
  <div class="pa-2">
    <div v-if="formLoader" class="d-flex flex-column justify-center align-center pa-10">
      <v-progress-circular indeterminate color="primary" size="48" />
      <p class="text-subtitle-1 text-primary font-weight-bold mt-3">Uploading Revision File...</p>
    </div>

    <div v-else>
      <v-tabs v-model="subTab" color="primary" class="mb-4">
        <v-tab value="one" class="font-weight-medium">VERSION HISTORY</v-tab>
        <v-tab value="two" class="font-weight-medium">UPLOAD REVISION</v-tab>
      </v-tabs>

      <v-window v-model="subTab">
        <!-- Version History List -->
        <v-window-item value="one">
          <v-list v-if="versionFiles.length > 0" border rounded class="py-0">
            <v-list-item
              v-for="(item, index) in versionFiles"
              :key="index"
              class="py-3 px-4 border-b"
              @click="openModal(item.id)"
            >
              <div class="d-flex justify-space-between align-center">
                <div>
                  <h4 class="text-subtitle-1 font-weight-bold mb-1">Version {{ item.version }}</h4>
                  <p class="text-body-2 text-secondary mb-1">{{ item.description || 'No revision summary provided.' }}</p>
                  <span class="text-caption text-secondary">
                    Uploaded By: {{ item.uploadedBy }} | Date: {{ item.uploadedDate }}
                  </span>
                </div>
                <v-btn variant="tonal" size="small" color="primary">View Version</v-btn>
              </div>
            </v-list-item>
          </v-list>
          <v-card v-else border elevation="0" class="pa-6 text-center text-secondary">
            <v-icon size="40" class="mb-2">mdi-history</v-icon>
            <p class="text-body-1 mb-0">No historical procedure revisions recorded.</p>
          </v-card>

          <ProcedureModalView
            v-if="selectedVersion"
            v-model="showModal"
            :version-details="selectedVersion"
            :version-link="versionLink || ''"
          />
        </v-window-item>

        <!-- Revision Upload Form -->
        <v-window-item value="two" class="pa-4">
          <v-form @submit.prevent="uploadFiles">
            <v-file-input
              v-model="selectedFile"
              label="Attach QMS PDF Document*"
              accept=".pdf"
              variant="outlined"
              density="comfortable"
              show-size
              prepend-icon="mdi-file-pdf-box"
              :error="!!fileError"
              :error-messages="fileError"
              class="mb-3"
            />
            <v-textarea
              v-model="description"
              label="Revision Details & Justification (Clause 6.3)*"
              variant="outlined"
              density="comfortable"
              rows="4"
              class="mb-4"
              clearable
            />
            <v-btn type="submit" color="primary" variant="flat">
              Upload Procedure Revision
            </v-btn>
          </v-form>
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>