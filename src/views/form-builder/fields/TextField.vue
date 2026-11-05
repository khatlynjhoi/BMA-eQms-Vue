<script setup lang="ts">
defineProps<{
  modelValue?: string | number;
  field: {
    label: string;
    type?: string;
  };
  error?: boolean;
  errorMessages?: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();
</script>

<template>
  <div class="form-group">
    <label class="text-caption font-weight-bold text-secondary mb-1 d-block">{{ field.label }}</label>
    <v-text-field
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :error="error"
      :error-messages="errorMessages"
      :type="field.type || 'text'"
      density="comfortable"
      hide-details="auto"
      variant="outlined"
      color="primary"
    />
  </div>
</template>