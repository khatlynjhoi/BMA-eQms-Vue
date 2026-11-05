<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FormBuilderService } from '@/services/formBuilderService';
import TableFormList from './components/TableFormList.vue';
import PreviewForm from '../reports/workspace/components/PreviewForm.vue';
import BuilderCanvas from './components/BuilderCanvas.vue';
import alertService from '@/services/alertService';

const contentActive = ref('1');
const service = new FormBuilderService();

const formList = ref<any[]>([]);
const buildFormList = ref<any[]>([]);

const tableHeader = [
  { title: 'FORM NAME', key: 'form_name', align: 'start' as const },
  { title: 'FORM CODE', key: 'form_code', align: 'start' as const },
  { title: 'ACTION', key: 'action', align: 'end' as const, sortable: false }
];

const selectedForm = ref<any>({
  id: null,
  form_id: null,
  form_code: null,
  form_name: null,
  format_code: null,
  form_schema: [],
  pageProperties: { pageSize: 'a4', orientation: 'portrait', pageModifiers: 'whole' }
});

const preLoad = async () => {
  try {
    const data: any = await service.getFormList();
    formList.value = data?.formList || [];
    buildFormList.value = data?.buildFormList || [];
  } catch (error) {
    console.error('Failed to load form builder data:', error);
  }
};

onMounted(() => {
  preLoad();
});

const handleFormAction = (formId: number, mode: 'preview' | 'edit') => {
  const form = buildFormList.value.find((f) => f.id === formId);
  if (!form) return;

  const targetForm = { ...form };
  if (typeof targetForm.form_schema === 'string') {
    try {
      targetForm.form_schema = JSON.parse(targetForm.form_schema);
    } catch (e) {
      targetForm.form_schema = [];
    }
  }

  if (typeof targetForm.pageProperties === 'string') {
    try {
      targetForm.pageProperties = JSON.parse(targetForm.pageProperties);
    } catch (e) {
      targetForm.pageProperties = { pageSize: 'a4', orientation: 'portrait', pageModifiers: 'whole' };
    }
  }

  selectedForm.value = targetForm;
  contentActive.value = mode === 'preview' ? '3' : '2';
};

const previewForm = (formId: number) => handleFormAction(formId, 'preview');
const editForm = (formId: number) => handleFormAction(formId, 'edit');

const saveForm = async (formToSave: any) => {
  try {
    const formData = new FormData();
    if (formToSave.id) {
      formData.append('id', String(formToSave.id));
    }
    formData.append('form', String(formToSave.form_id));
    formData.append('form_code', formToSave.form_code || '');
    formData.append('schema', JSON.stringify(formToSave.form_schema));
    formData.append('pageProperties', JSON.stringify(formToSave.pageProperties));

    const response = await service.storeForm(formData);
    alertService.toast(response?.message || 'Form saved successfully.');

    selectedForm.value = {
      id: null,
      form_id: null,
      form_code: null,
      form_name: null,
      format_code: null,
      form_schema: []
    };
    await preLoad();
    contentActive.value = '1';
  } catch (error) {
    console.error('Save form error:', error);
    alertService.error('Failed to save form configuration.');
  }
};

const exportToJson = (formBuilderData: any) => {
  const jsonString = JSON.stringify(formBuilderData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${formBuilderData.form_code || 'form'}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

const handleFormPreviewClick = () => {
  alertService.toast('Form preview action triggered.');
};
</script>

<template>
  <v-container fluid class="pa-6">
    <v-card border elevation="0" rounded="lg">
      <v-tabs v-model="contentActive" color="primary" class="px-4 border-b">
        <v-tab value="1" class="font-weight-medium">QMS FORMS LIST</v-tab>
        <v-tab value="2" class="font-weight-medium">FORM BUILDER CANVAS</v-tab>
        <v-tab value="3" class="font-weight-medium">FORM PREVIEW</v-tab>
      </v-tabs>

      <v-window v-model="contentActive" class="pa-4">
        <v-window-item value="1">
          <TableFormList
            :data="buildFormList"
            :headers="tableHeader"
            :role="1"
            @edit="editForm"
            @preview="previewForm"
            @export="exportToJson"
          />
        </v-window-item>
        
        <v-window-item value="2">
          <BuilderCanvas :form-list="formList" :form="selectedForm" @save="saveForm" />
        </v-window-item>
        
        <v-window-item value="3">
          <PreviewForm v-if="selectedForm" :form-selected="selectedForm" @store="handleFormPreviewClick" />
        </v-window-item>
      </v-window>
    </v-card>
  </v-container>
</template>