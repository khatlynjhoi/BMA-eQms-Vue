<script setup lang="ts">
defineProps<{
  modelValue?: string | number | Record<string, any>;
  field: {
    label: string;
    options: any[];
    itemTitle?: string;
    itemValue?: string;
  };
  error?: boolean;
  errorMessages?: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();
</script>

<template>
  <div class="form-group">
    <label class="text-caption font-weight-bold text-secondary mb-1 d-block">{{ field.label }}</label>
    <v-select
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :items="field.options"
      :item-title="field.itemTitle || 'label'"
      :item-value="field.itemValue || 'value'"
      :error="error"
      :error-messages="errorMessages"
      density="comfortable"
      hide-details="auto"
      variant="outlined"
      color="primary"
    />
  </div>
</template>