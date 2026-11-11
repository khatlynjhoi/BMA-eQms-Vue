<script setup lang="ts">
defineProps<{
  modelValue: boolean;
  preview: {
    pdfLink: string;
    control?: boolean;
  };
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const formModalClose = () => {
  emit('update:modelValue', false);
};
</script>

<template>
  <v-dialog :model-value="modelValue" @update:model-value="formModalClose" max-width="800">
    <v-card rounded="lg">
      <v-card-title class="pa-4 bg-primary text-white d-flex align-center justify-space-between">
        <span class="text-h6 font-weight-bold">Preview Form Request Document (Clause 7.5)</span>
        <v-btn icon variant="text" color="white" size="small" aria-label="Close Preview" @click="formModalClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pa-0">
        <iframe
          v-if="preview?.pdfLink"
          :src="`${preview.pdfLink}#toolbar=0&navpanes=0&scrollbar=0`"
          style="width: 100%; height: 75vh; border: none"
        />
        <div v-else class="pa-10 text-center text-secondary">
          No PDF preview link available.
        </div>
      </v-card-text>

      <v-card-actions class="pa-4 border-t">
        <v-spacer />
        <v-btn variant="text" @click="formModalClose">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>