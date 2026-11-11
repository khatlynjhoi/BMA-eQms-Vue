<script setup lang="ts">
import { ref, computed, watch } from 'vue';

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
  const schema = props.formSelected?.form_schema || props.formSelected?.schema;
  if (!schema) return [];
  if (typeof schema === 'string') {
    try {
      return JSON.parse(schema);
    } catch (e) {
      console.error('Invalid schema JSON:', e);
      return [];
    }
  }
  return schema;
});

const initializeFormData = () => {
  const newFormData: Record<string, any> = {};
  parsedSchema.value.forEach((field: any) => {
    const existingAnswer = props.formSelected?.answers?.find(
      (ans: any) => ans.field_key === field.model
    );

    if (existingAnswer) {
      newFormData[field.model] = existingAnswer.field_value;
    } else if (field.type === 'checkbox') {
      newFormData[field.model] = [];
    } else {
      newFormData[field.model] = '';
    }
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

const validateForm = () => {
  const newErrors: Record<string, string> = {};
  parsedSchema.value.forEach((field: any) => {
    if (field.required && (!formData.value[field.model] || (Array.isArray(formData.value[field.model]) && !formData.value[field.model].length))) {
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
    response: props.formSelected.id || props.formSelected.response
  });
  emit('update:modelValue', false);
};
</script>

<template>
  <v-dialog :model-value="modelValue" @update:model-value="formModalClose" max-width="700">
    <v-card rounded="lg">
      <v-card-title class="pa-4 bg-primary text-white d-flex align-center justify-space-between">
        <span class="text-h6 font-weight-bold">{{ formSelected?.form_name || 'Edit Form Request' }}</span>
        <v-btn icon variant="text" color="white" size="small" aria-label="Close Edit Modal" @click="formModalClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pa-6">
        <div v-for="field in parsedSchema" :key="field.id || field.model" class="mb-4">
          <label class="text-caption font-weight-bold text-secondary mb-1 d-block">{{ field.label }}</label>

          <!-- Text / Number / Date Input -->
          <v-text-field
            v-if="field.type === 'text' || field.type === 'number' || field.type === 'date'"
            v-model="formData[field.model]"
            :type="field.type === 'date' ? 'date' : (field.type === 'number' ? 'number' : 'text')"
            :error="hasError(field)"
            :error-messages="getErrorMessage(field)"
            density="comfortable"
            variant="outlined"
            color="primary"
            hide-details="auto"
          />

          <!-- Textarea -->
          <v-textarea
            v-else-if="field.type === 'textarea'"
            v-model="formData[field.model]"
            :error="hasError(field)"
            :error-messages="getErrorMessage(field)"
            density="comfortable"
            variant="outlined"
            color="primary"
            rows="3"
            hide-details="auto"
          />

          <!-- Select Dropdown -->
          <v-select
            v-else-if="field.type === 'select'"
            v-model="formData[field.model]"
            :items="field.options || []"
            :error="hasError(field)"
            :error-messages="getErrorMessage(field)"
            density="comfortable"
            variant="outlined"
            color="primary"
            hide-details="auto"
          />

          <!-- Radio Group -->
          <v-radio-group
            v-else-if="field.type === 'radio'"
            v-model="formData[field.model]"
            :error="hasError(field)"
            :error-messages="getErrorMessage(field)"
            density="comfortable"
            hide-details="auto"
          >
            <v-radio
              v-for="(opt, idx) in field.options"
              :key="idx"
              :label="opt"
              :value="opt"
              color="primary"
            />
          </v-radio-group>

          <!-- Checkbox Group -->
          <div v-else-if="field.type === 'checkbox'">
            <v-checkbox
              v-for="opt in field.options"
              :key="opt"
              v-model="formData[field.model]"
              :label="opt"
              :value="opt"
              density="compact"
              color="primary"
              hide-details
            />
            <div v-if="hasError(field)" class="text-error text-caption mt-1">
              {{ getErrorMessage(field) }}
            </div>
          </div>

          <!-- Default Text Fallback -->
          <v-text-field
            v-else
            v-model="formData[field.model]"
            :error="hasError(field)"
            :error-messages="getErrorMessage(field)"
            density="comfortable"
            variant="outlined"
            color="primary"
            hide-details="auto"
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