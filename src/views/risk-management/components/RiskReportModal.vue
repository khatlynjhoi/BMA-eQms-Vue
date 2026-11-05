<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  modelValue: boolean;
  formDetails: {
    isModalLoading: boolean;
    content?: any;
    link?: string | null;
  };
}>();

const emit = defineEmits(['update:modelValue']);

const formModalClose = () => {
  emit('update:modelValue', false);
};
</script>

<template>
  <v-dialog :model-value="modelValue" @update:model-value="formModalClose" max-width="1000" persistent>
    <v-card rounded="lg">
      <v-card-title class="pa-4 bg-primary text-white d-flex align-center justify-space-between">
        <span class="text-h6 font-weight-bold">Risk Assessment PDF Report</span>
        <v-btn icon variant="text" color="white" size="small" @click="formModalClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <div v-if="formDetails.isModalLoading" class="d-flex justify-center align-center pa-10">
        <v-progress-circular indeterminate color="primary" size="48" />
      </div>

      <v-card-text v-else class="pa-4">
        <div class="mb-3">
          <span class="text-caption text-secondary">{{ formDetails.content?.department?.name || formDetails.content?.department }}</span>
        </div>
        <iframe
          v-if="formDetails.link"
          :src="`${formDetails.link}#toolbar=0&navpanes=0`"
          style="width: 100%; height: 75vh; border: none"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>