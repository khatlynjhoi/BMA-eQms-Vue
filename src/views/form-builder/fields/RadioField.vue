<script setup lang="ts">
defineProps<{
  modelValue?: string | number;
  field: {
    label: string;
    options: string[];
  };
  error?: boolean;
  errorMessages?: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void;
}>();
</script>

<template>
  <div class="form-group">
    <label class="text-caption font-weight-bold text-secondary mb-1 d-block">{{ field.label }}</label>
    <v-radio-group
      :model-value="modelValue"
      :error="error"
      :error-messages="errorMessages"
      density="comfortable"
      hide-details="auto"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <v-radio
        v-for="(option, index) in field.options"
        :key="index"
        :label="option"
        :value="option"
        color="primary"
      />
    </v-radio-group>
  </div>
</template>