<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue?: string[];
  field: {
    label: string;
    options: string[];
  };
  error?: boolean;
  errorMessages?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>();

const internalValue = computed({
  get: () => props.modelValue || [],
  set: (val: string[]) => emit('update:modelValue', val)
});
</script>

<template>
  <div class="form-group">
    <label class="text-caption font-weight-bold text-secondary mb-2 d-block">{{ field.label }}</label>
    <v-checkbox
      v-for="opt in field.options"
      :key="opt"
      :label="opt"
      :value="opt"
      v-model="internalValue"
      :error="error"
      density="compact"
      color="primary"
      hide-details
    />
    <div v-if="error && errorMessages" class="text-error text-caption mt-1">
      {{ errorMessages }}
    </div>
  </div>
</template>