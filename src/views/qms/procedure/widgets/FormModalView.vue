<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  modelValue: boolean;
  formDetails: {
    isModalLoading: boolean;
    content: any;
    link?: string | null;
  };
  formData?: any;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'update', payload: FormData): void;
}>();

const formModalTab = ref('one');

const closeModal = () => {
  emit('update:modelValue', false);
};

const handleUpdate = () => {
  const payload = new FormData();
  if (props.formData) {
    Object.keys(props.formData).forEach((key) => {
      payload.append(key, props.formData[key]);
    });
  }
  emit('update', payload);
};
</script>

<template>
  <v-dialog :model-value="modelValue" @update:model-value="closeModal" max-width="850">
    <v-card rounded="lg">
      <v-card-title class="pa-4 bg-primary text-white d-flex align-center justify-space-between">
        <span class="text-h6 font-weight-bold">Form Specification & Preview</span>
        <v-btn icon variant="text" color="white" size="small" aria-label="Close Dialog" @click="closeModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-tabs v-model="formModalTab" color="primary" class="px-4 border-b">
        <v-tab value="one">DETAILS & PREVIEW</v-tab>
        <v-tab v-if="formData" value="two">EDIT METADATA</v-tab>
      </v-tabs>

      <div v-if="formDetails.isModalLoading" class="d-flex justify-center align-center pa-10">
        <v-progress-circular indeterminate color="primary" size="48" />
      </div>

      <v-window v-else v-model="formModalTab" class="pa-4">
        <!-- Preview Tab -->
        <v-window-item value="one">
          <div class="mb-3">
            <span class="text-caption font-weight-bold text-secondary">{{ formDetails.content?.formCode }}</span>
            <h3 class="text-h5 font-weight-bold text-primary">{{ formDetails.content?.formName }}</h3>
          </div>
          <iframe
            v-if="formDetails.link"
            :src="`${formDetails.link}#toolbar=0&navpanes=0`"
            style="width: 100%; height: 65vh; border: none"
          />
        </v-window-item>

        <!-- Edit Tab -->
        <v-window-item value="two" v-if="formData">
          <v-form @submit.prevent="handleUpdate">
            <v-text-field v-model="formData.formCode" label="Form Code" variant="outlined" density="compact" class="mb-3" />
            <v-text-field v-model="formData.formName" label="Form Name" variant="outlined" density="compact" class="mb-3" />
            <v-select
              v-model="formData.formRetention"
              label="Retention Period (Clause 7.5.3)"
              :items="['Permanent', '1 Year', '2 Years', '3 Years', '5 Years', 'Until Superseded']"
              variant="outlined"
              density="compact"
              class="mb-4"
            />
            <v-btn type="submit" color="primary" variant="flat">Save Metadata</v-btn>
          </v-form>
        </v-window-item>
      </v-window>
    </v-card>
  </v-dialog>
</template>