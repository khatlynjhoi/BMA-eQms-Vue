<script setup lang="ts">
import { ref, computed } from 'vue';
import FormModalView from '../widgets/FormModalView.vue';
import { GeneralController } from '@/stores/GeneralController';
import alertService from '@/services/alertService';

const props = defineProps<{
  procedure: string | number;
  formList?: any[];
}>();

const emit = defineEmits(['update:formList']);

const formTab = ref(props.formList && props.formList.length > 0 ? 'one' : 'two');
const openModel = ref(false);
const formLoader = ref(false);
const errorMessages = ref<string | null>(null);

const formData = ref({
  formName: '',
  formCode: '',
  formRetention: '3 Years',
  formStatus: '1',
  formFile: [] as any[]
});

const formInfo = ref({
  isModalLoading: true,
  content: null as any,
  link: null as string | null
});

const formDataEdit = ref<any>({});

const safeEncrypt = (data: any) => btoa(String(data));

const viewForm = async (formId: any) => {
  openModel.value = true;
  formInfo.value.isModalLoading = true;
  const encryptedId = safeEncrypt(formId);

  try {
    const controller = new GeneralController();
    const response = await controller.retrieveFile(encryptedId, 'forms/view');
    const blob = response instanceof Blob
      ? response
      : new Blob([new Uint8Array(response)], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const formDetails: any = await controller.retrieveData('forms/retrieve', { form: encryptedId }, 'form');

    formInfo.value = {
      content: formDetails,
      link: url,
      isModalLoading: false
    };

    formDataEdit.value = {
      formID: formDetails?.id,
      formName: formDetails?.formName,
      formCode: formDetails?.formCode,
      formRetention: formDetails?.formRetention,
      formStatus: formDetails?.formStatus
    };
  } catch (error) {
    console.error('Error fetching form file:', error);
    formInfo.value.isModalLoading = false;
  }
};

const submitForm = async () => {
  if (!formData.value.formCode || !formData.value.formName) {
    alertService.error('Please enter all required form fields.');
    return;
  }

  formLoader.value = true;
  errorMessages.value = null;

  try {
    const payload = new FormData();
    payload.append('procedure', String(props.procedure));
    payload.append('formName', formData.value.formName);
    payload.append('formCode', formData.value.formCode);
    payload.append('formRetention', formData.value.formRetention);
    payload.append('formStatus', formData.value.formStatus);

    if (formData.value.formFile && formData.value.formFile.length > 0) {
      const file = Array.isArray(formData.value.formFile) ? formData.value.formFile[0] : formData.value.formFile;
      payload.append('formFile', file);
    }

    const controller = new GeneralController();
    const response: any = await GeneralController.storeItemFiles('forms/store-forms', payload);

    alertService.toast('Form attached successfully.');
    emit('update:formList', response.formList || []);
    formTab.value = 'one';

    formData.value = {
      formName: '',
      formCode: '',
      formRetention: '3 Years',
      formStatus: '1',
      formFile: []
    };
  } catch (error: any) {
    console.error('Submit form error:', error);
    errorMessages.value = error?.message || 'Failed to save form record.';
  } finally {
    formLoader.value = false;
  }
};

const updateForm = async (updatedData: FormData) => {
  try {
    const controller = new GeneralController();
    const response: any = await GeneralController.storeItemFiles('forms/update', updatedData);
    emit('update:formList', response.formList || []);
    openModel.value = false;
    alertService.toast('Form details updated.');
  } catch (error) {
    console.error('Update form error:', error);
  }
};
</script>

<template>
  <div>
    <v-tabs v-model="formTab" color="primary" class="mb-4">
      <v-tab value="one" class="font-weight-medium">LIST OF FORMS</v-tab>
      <v-tab value="two" class="font-weight-medium">ADD FORM</v-tab>
    </v-tabs>

    <v-window v-model="formTab">
      <!-- Form List View -->
      <v-window-item value="one">
        <v-list v-if="formList && formList.length > 0" border rounded class="py-0">
          <v-list-item
            v-for="(item, index) in formList"
            :key="index"
            class="py-3 px-4 border-b cursor-pointer"
            @click="viewForm(item.id)"
          >
            <span class="text-subtitle-1 font-weight-bold text-primary">{{ item.form_code }}</span>
            <span class="text-body-2 mx-2">|</span>
            <span class="text-body-1">{{ item.form_name }}</span>
          </v-list-item>
        </v-list>
        <v-card v-else border elevation="0" class="pa-6 text-center text-secondary">
          <v-icon size="40" class="mb-2">mdi-file-document-outline</v-icon>
          <p class="text-body-1 mb-0">No operational forms linked to this procedure.</p>
        </v-card>

        <FormModalView
          v-if="formInfo.content"
          v-model="openModel"
          :form-details="formInfo"
          :form-data="formDataEdit"
          @update="updateForm"
        />
      </v-window-item>

      <!-- Add Form Entry -->
      <v-window-item value="two" class="pa-4">
        <v-alert v-if="errorMessages" type="error" variant="tonal" class="mb-4" closable>
          {{ errorMessages }}
        </v-alert>

        <div v-if="formLoader" class="d-flex flex-column justify-center align-center pa-8">
          <v-progress-circular indeterminate color="primary" size="40" />
          <p class="text-subtitle-2 text-primary font-weight-bold mt-2">Saving Form Data...</p>
        </div>

        <v-form v-else @submit.prevent="submitForm">
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field v-model="formData.formCode" label="Form Code*" placeholder="e.g. ADM-001" variant="outlined" density="compact" class="mb-3" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="formData.formName" label="Form Name*" placeholder="Enter form title" variant="outlined" density="compact" class="mb-3" />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="formData.formStatus"
                label="Scope / Classification*"
                :items="[
                  { title: 'General Forms', value: '1' },
                  { title: 'Departmental Forms', value: '0' }
                ]"
                variant="outlined"
                density="compact"
                class="mb-3"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="formData.formRetention"
                label="Retention Period (Clause 7.5.3)*"
                :items="['Permanent', '1 Year', '2 Years', '3 Years', '5 Years', 'Until Superseded']"
                variant="outlined"
                density="compact"
                class="mb-3"
              />
            </v-col>
            <v-col cols="12">
              <v-file-input v-model="formData.formFile" label="Attach Template PDF File" accept=".pdf" variant="outlined" density="compact" prepend-icon="mdi-file-pdf-box" class="mb-4" />
            </v-col>
            <v-col cols="12" class="text-right">
              <v-btn type="submit" color="primary" variant="flat">Submit Form</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-window-item>
    </v-window>
  </div>
</template>