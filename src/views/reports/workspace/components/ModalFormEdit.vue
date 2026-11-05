<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import TextField from '@/views/form-builder/fields/TextField.vue';
import SelectField from '@/views/form-builder/fields/SelectField.vue';
import RadioField from '@/views/form-builder/fields/RadioField.vue';
import CheckboxField from '@/views/form-builder/fields/CheckboxField.vue';
import TableField from '@/views/form-builder/fields/TableField.vue';

const props = defineProps<{
  formSelected: any;
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'update', payload: { data: Record<string, any>; response: number | string }): void;
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
    if (field.type === 'table') {
      newFormData[field.model] = [];
    } else {
      const existingAnswer = props.formSelected.answers?.find(
        (ans: any) => ans.field_key === field.model
      );
      newFormData[field.model] = existingAnswer ? existingAnswer.field_value : '';
    }
  });
  formData.value = newFormData;
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

const formModalClose = () => {
  emit('update:modelValue', false);
};

const submitForm = () => {
  if (!validateForm()) return;
  emit('update', {
    data: formData.value,
    response: props.formSelected.id
  });
  emit('update:modelValue', false);
};
</script>

<template>
  <v-dialog :model-value="modelValue" @update:model-value="formModalClose" max-width="700">
    <v-card rounded="lg">
      <v-card-title class="pa-4 bg-primary text-white d-flex align-center justify-space-between">
        <span class="text-h6 font-weight-bold">{{ formSelected?.form_name || 'Edit Form Request' }}</span>
        <v-btn icon variant="text" color="white" size="small" @click="formModalClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pa-6">
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

      <v-card-actions class="pa-4 pt-0">
        <v-spacer />
        <v-btn variant="text" @click="formModalClose">Cancel</v-btn>
        <v-btn color="primary" variant="flat" @click="submitForm">Update Request</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>