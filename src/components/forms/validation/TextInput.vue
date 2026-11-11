<script setup lang="ts">
import { toRef } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  value: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  successMessage: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
});

const nameRef = toRef(props, 'name');

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta
} = useField(nameRef, undefined, {
  initialValue: props.value
});
</script>

<template>
  <div class="TextInput" :class="{ 'has-error': !!errorMessage, success: meta.valid }">
    <v-text-field
      v-model="inputValue"
      :name="name"
      :id="name"
      :type="type"
      variant="outlined"
      density="comfortable"
      :placeholder="placeholder || label"
      :color="meta.valid ? 'success' : 'primary'"
      :error-messages="errorMessage"
      class="mb-3"
      hide-details="auto"
      @input="handleChange"
      @blur="handleBlur"
    />
  </div>
</template>