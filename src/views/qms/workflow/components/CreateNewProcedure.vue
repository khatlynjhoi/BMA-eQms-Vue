<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { GeneralController } from '@/stores/GeneralController';
import alertService from '@/services/alertService';

const router = useRouter();

const formLoader = ref(false);
const selectedFile = ref<File | null>(null);
const description = ref('');
const fileError = ref('');

const categoryOption = ['Procedure', 'Forms'];
const titleOption = ref<any[]>([]);
const category = ref('');
const value = ref('');

const categoryData = async () => {
  value.value = '';
  titleOption.value = [];
  try {
    const controller = new GeneralController();
    const response: any = await controller.retrieveData(
      'amendment/categories',
      { search: category.value },
      'data'
    );
    titleOption.value = Array.isArray(response) ? response : [];
  } catch (error) {
    console.error('Failed to load category items:', error);
  }
};

const handleUpload = async () => {
  fileError.value = '';
  if (!selectedFile.value) {
    fileError.value = 'Please select a PDF file to upload.';
    return;
  }

  const fileToUpload = Array.isArray(selectedFile.value) ? selectedFile.value[0] : selectedFile.value;
  if (fileToUpload.type !== 'application/pdf') {
    fileError.value = 'Only PDF document format is allowed.';
    return;
  }

  const confirmed = await alertService.confirm('Submit this document amendment proposal for evaluation?');
  if (!confirmed.isConfirmed) return;

  formLoader.value = true;
  try {
    const formData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('description', description.value);
    formData.append('category', category.value);
    formData.append('value', value.value);

    const response: any = await GeneralController.storeItem('amendment/create', formData);
    if (response?.ok || response?.status === 200) {
      alertService.toast('Amendment proposal submitted successfully.');
      router.push('/qms/approval-workflow');
    } else {
      alertService.error('Failed to submit amendment proposal.');
    }
  } catch (err) {
    console.error('Upload error:', err);
    alertService.error('An unexpected error occurred during submission.');
  } finally {
    formLoader.value = false;
  }
};
</script>

<template>
  <v-card variant="outlined" elevation="0" class="bg-surface mb-5 rounded-lg">
    <v-card-item>
      <v-card-title class="text-h5 font-weight-bold">
        CREATE DOCUMENT AMENDMENT PROPOSAL (CLAUSE 6.3)
      </v-card-title>
    </v-card-item>
    <v-divider />

    <v-card-text class="pa-6">
      <div v-if="formLoader" class="d-flex flex-column justify-center align-center pa-10">
        <v-progress-circular indeterminate color="primary" size="48" />
        <p class="text-subtitle-1 text-primary font-weight-bold mt-3">Submitting Amendment Proposal...</p>
      </div>

      <v-form v-else @submit.prevent="handleUpload">
        <v-row density="comfortable">
          <v-col cols="12" md="6">
            <v-select
              v-model="category"
              :items="categoryOption"
              label="Document Classification*"
              variant="outlined"
              density="compact"
              required
              @update:model-value="categoryData"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="value"
              :items="titleOption"
              item-title="name"
              item-value="id"
              label="Target Procedure / Form*"
              variant="outlined"
              density="compact"
              required
              :disabled="!category"
            />
          </v-col>

          <v-col cols="12">
            <v-file-input
              v-model="selectedFile"
              label="Attach Proposed PDF Revision*"
              accept=".pdf"
              variant="outlined"
              density="compact"
              show-size
              prepend-icon="mdi-file-pdf-box"
              :error="!!fileError"
              :error-messages="fileError"
            />
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="description"
              label="Justification & Description of Changes (Clause 6.3)*"
              variant="outlined"
              density="compact"
              rows="4"
              required
            />
          </v-col>

          <v-col cols="12" class="text-right">
            <v-btn type="submit" color="primary" variant="flat">
              Submit Amendment Proposal
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>