<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import TextField from '@/views/form-builder/fields/TextField.vue';
import SelectField from '@/views/form-builder/fields/SelectField.vue';
import RadioField from '@/views/form-builder/fields/RadioField.vue';
import CheckboxField from '@/views/form-builder/fields/CheckboxField.vue';
import TableField from '@/views/form-builder/fields/TableField.vue';

const props = defineProps<{
  formSelected: any;
}>();

const emit = defineEmits<{
  (e: 'store', payload: { formId: number | string; data: Record<string, any> }): void;
}>();

const formData = ref<Record<string, any>>({});
const errors = ref<Record<string, string>>({});

const parsedSchema = computed(() => {
  if (!props.formSelected?.form_schema) return [];
  if (typeof props.formSelected.form_schema === 'string') {
    try {
      return JSON.parse(props.formSelected.form_schema);
    } catch (e) {
      console.error('Invalid schema JSON:', e);
      return [];
    }
  }
  return props.formSelected.form_schema;
});

const initializeFormData = () => {
  const newFormData: Record<string, any> = {};
  parsedSchema.value.forEach((field: any) => {
    newFormData[field.model] = field.type === 'table' ? [] : '';
  });
  formData.value = newFormData;
  errors.value = {};
};

watch(
  () => props.formSelected,
  () => {
    initializeFormData();
  },
  { immediate: true, deep: true }
);

const resolveComponent = (type: string) => {
  switch (type) {
    case 'text': return TextField;
    case 'select': return SelectField;
    case 'radio': return RadioField;
    case 'checkbox': return CheckboxField;
    case 'table': return TableField;
    case 'date': return TextField;
    default: return TextField;
  }
};

const validateForm = () => {
  const newErrors: Record<string, string> = {};
  parsedSchema.value.forEach((field: any) => {
    if (field.required && !formData.value[field.model]) {
      newErrors[field.model] = `${field.label || 'Field'} is required`;
    }
  });
  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const hasError = (field: any) => !!errors.value[field.model];
const getErrorMessage = (field: any) => errors.value[field.model] || '';

const submitForm = () => {
  if (!validateForm()) return;
  emit('store', {
    formId: props.formSelected.id,
    data: formData.value
  });
};

const resetForm = () => {
  initializeFormData();
};
</script>

<template>
  <div>
    <v-card-title class="px-0 pt-0 text-h5 font-weight-bold text-primary mb-4">
      {{ formSelected?.form_name || 'Form Request Preview' }}
    </v-card-title>

    <v-card-text class="px-0">
      <div v-for="field in parsedSchema" :key="field.id" class="mb-4">
        <component
          :is="resolveComponent(field.type)"
          v-model="formData[field.model]"
          :field="field"
          :error="hasError(field)"
          :error-messages="getErrorMessage(field)"
        />
      </div>
    </v-card-text>

    <v-card-actions class="px-0 pt-4 border-t">
      <v-spacer />
      <v-btn variant="text" @click="resetForm">Clear Form</v-btn>
      <v-btn color="primary" variant="flat" @click="submitForm">Submit Form Request</v-btn>
    </v-card-actions>
  </div>
</template>