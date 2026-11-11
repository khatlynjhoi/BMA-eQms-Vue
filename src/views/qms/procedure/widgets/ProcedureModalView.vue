<script setup lang="ts">
defineProps<{
  modelValue: boolean;
  versionDetails: {
    version: string | number;
    description?: string;
    uploadedBy?: string;
    uploadedDate?: string;
  };
  versionLink?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const closeModal = () => {
  emit('update:modelValue', false);
};
</script>

<template>
  <v-dialog :model-value="modelValue" @update:model-value="closeModal" max-width="850">
    <v-card rounded="lg">
      <v-card-title class="pa-4 bg-primary text-white d-flex align-center justify-space-between">
        <span class="text-h6 font-weight-bold">Version History Specification</span>
        <v-btn icon variant="text" color="white" size="small" aria-label="Close Version Modal" @click="closeModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pa-6">
        <div class="mb-4">
          <span class="text-caption font-weight-bold text-secondary">REVISION VERSION</span>
          <h3 class="text-h5 font-weight-bold text-primary mb-1">Version {{ versionDetails.version }}</h3>
          <p class="text-body-2 text-high-emphasis mb-3">{{ versionDetails.description || 'No version summary logged.' }}</p>

          <v-row density="compact" class="bg-grey-lighten-4 pa-3 rounded">
            <v-col cols="6">
              <span class="text-caption text-secondary">UPLOADED BY</span>
              <p class="text-subtitle-2 font-weight-bold mb-0">{{ versionDetails.uploadedBy || 'System Administrator' }}</p>
            </v-col>
            <v-col cols="6">
              <span class="text-caption text-secondary">REVISION DATE</span>
              <p class="text-subtitle-2 font-weight-bold mb-0">{{ versionDetails.uploadedDate || 'N/A' }}</p>
            </v-col>
          </v-row>
        </div>

        <iframe
          v-if="versionLink"
          :src="`${versionLink}#toolbar=0&navpanes=0`"
          style="width: 100%; height: 60vh; border: none"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>