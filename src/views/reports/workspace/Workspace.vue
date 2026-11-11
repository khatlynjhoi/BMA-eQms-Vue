<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ModalFormEdit from './components/ModalFormEdit.vue';
import TableRequestList from './components/TableRequestList.vue';
import ViewRequest from './components/ViewRequest.vue';
import { FormResponseService } from '@/services/formResponseService';
import alertService from '@/services/alertService';

const tab = ref('three');
const contentLoading = ref(false);
const openModel = ref(false);
const openRequestModal = ref(false);

const formList = ref<any[]>([]);
const requestList = ref<any[]>([]);
const formSelected = ref<any>(null);
const formPreview = ref<any>(null);

const service = new FormResponseService();

const tableHeader = [
  { title: 'Control Number', key: 'control_number', align: 'start' as const },
  { title: 'Form Name', key: 'form_name', align: 'start' as const },
  { title: 'Status', key: 'status', align: 'start' as const },
  { title: 'Date Created', key: 'created_at', align: 'start' as const }
];

const revokePdfLink = () => {
  if (formPreview.value?.pdfLink && formPreview.value.pdfLink.startsWith('blob:')) {
    URL.revokeObjectURL(formPreview.value.pdfLink);
    formPreview.value.pdfLink = null;
  }
};

const getForm = async () => {
  try {
    const data: any = await service.getFormList();
    formList.value = data?.formList || [];
    requestList.value = data?.requestList || [];
    if (requestList.value.length > 0) {
      tab.value = 'one';
    }
  } catch (error) {
    console.error('Error fetching forms/requests:', error);
  }
};

onMounted(async () => {
  contentLoading.value = true;
  await getForm();
  contentLoading.value = false;
});

onBeforeUnmount(() => {
  revokePdfLink();
});

const editFormSelected = (form: any) => {
  formSelected.value = form;
  openModel.value = true;
};

const updateFormResponse = async (form: any) => {
  const confirmed = await alertService.confirm('Update this Form Request?');
  if (!confirmed.isConfirmed) {
    formSelected.value = form;
    openModel.value = true;
    return;
  }

  contentLoading.value = true;
  try {
    const formData = new FormData();
    formData.append('response', String(form.response));
    formData.append('responses', JSON.stringify(form.data));

    await service.updateFormResponse(formData);
    alertService.toast('Form request updated successfully.');
    await getForm();
  } catch (err: any) {
    console.error('Update form error:', err);
    alertService.error('Failed to update form request.');
  } finally {
    contentLoading.value = false;
  }
};

const removeFormResponse = async (response: any) => {
  const confirmed = await alertService.confirm('Remove this Form Request?');
  if (!confirmed.isConfirmed) return;

  contentLoading.value = true;
  try {
    const formData = new FormData();
    formData.append('response', String(response.id));
    await service.removeFormResponse(formData);
    alertService.toast('Request removed successfully.');
    await getForm();
  } catch (err: any) {
    console.error('Remove form error:', err);
    alertService.error('Failed to remove request.');
  } finally {
    contentLoading.value = false;
  }
};

const viewRequest = async (response: any) => {
  revokePdfLink();
  try {
    const blob: any = await service.viewResponsePdf(response.id);
    const url = URL.createObjectURL(blob);
    formPreview.value = {
      pdfLink: url,
      control: false
    };
    openRequestModal.value = true;
  } catch (error) {
    console.error('View PDF error:', error);
    alertService.error('Unable to generate PDF preview.');
  }
};
</script>

<template>
  <v-card variant="outlined" elevation="0" class="bg-surface mb-5 rounded-lg">
    <v-card-item>
      <div class="d-flex justify-space-between align-center">
        <v-card-title class="text-h5 font-weight-bold">FORM REQUESTS WORKSPACE (CLAUSE 7.5)</v-card-title>
      </div>
    </v-card-item>
    <v-divider />

    <v-card-text class="pa-0">
      <div v-if="contentLoading" class="d-flex justify-center align-center pa-10">
        <v-progress-circular indeterminate color="primary" size="48" />
      </div>

      <template v-else>
        <v-tabs v-model="tab" color="primary" class="px-4 border-b">
          <v-tab value="one">MY REQUESTS</v-tab>
          <v-tab value="two">SUBMISSIONS</v-tab>
          <v-tab value="three">CREATE REQUEST</v-tab>
        </v-tabs>

        <v-window v-model="tab" class="pa-4">
          <v-window-item value="one">
            <TableRequestList
              :data="requestList"
              :headers="tableHeader"
              @edit="editFormSelected"
              @removed="removeFormResponse"
              @view="viewRequest"
            />
          </v-window-item>

          <v-window-item value="two">
            <v-card border elevation="0" class="pa-6 text-center text-secondary">
              <v-icon size="40" class="mb-2">mdi-file-document-multiple-outline</v-icon>
              <p class="text-body-1 mb-0">No submission logs available.</p>
            </v-card>
          </v-window-item>

          <v-window-item value="three">
            <v-card border elevation="0" class="pa-6 text-center text-secondary">
              <v-icon size="40" class="mb-2">mdi-plus-circle-outline</v-icon>
              <p class="text-body-1 mb-0">Form Request Builder Studio</p>
            </v-card>
          </v-window-item>
        </v-window>
      </template>
    </v-card-text>
  </v-card>

  <ModalFormEdit
    v-if="formSelected"
    v-model="openModel"
    :form-selected="formSelected"
    @update="updateFormResponse"
  />

  <ViewRequest
    v-if="formPreview"
    v-model="openRequestModal"
    :preview="formPreview"
  />
</template>