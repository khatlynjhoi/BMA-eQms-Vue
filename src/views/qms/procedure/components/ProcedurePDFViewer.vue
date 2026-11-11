<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { GeneralController } from '@/stores/GeneralController';

const props = defineProps<{
  fileID: string | number;
  model?: string;
}>();

const pdfFile = ref<string | null>(null);
const error = ref<string | null>(null);
const loading = ref(false);

const cleanupBlobUrl = () => {
  if (pdfFile.value && pdfFile.value.startsWith('blob:')) {
    URL.revokeObjectURL(pdfFile.value);
    pdfFile.value = null;
  }
};

const loadFile = async () => {
  if (!props.fileID || props.fileID === 0 || props.fileID === '0') {
    cleanupBlobUrl();
    return;
  }

  cleanupBlobUrl();
  error.value = null;
  loading.value = true;

  try {
    const controller = new GeneralController();
    const response = await controller.retrieveFile(String(props.fileID), 'procedure/documents/view');
    const blob = response instanceof Blob
      ? response
      : new Blob([new Uint8Array(response)], { type: 'application/pdf' });
    pdfFile.value = URL.createObjectURL(blob);
  } catch (err: any) {
    console.error('PDF load error:', err);
    error.value = 'Unable to load PDF document. Please verify access permissions.';
  } finally {
    loading.value = false;
  }
};

watch(() => props.fileID, () => {
  loadFile();
});

onMounted(() => {
  loadFile();
});

onBeforeUnmount(() => {
  cleanupBlobUrl();
});
</script>

<template>
  <div v-if="error" class="pa-6 text-center text-error font-weight-bold">
    <v-icon size="36" color="error" class="mb-2">mdi-alert-circle-outline</v-icon>
    <p>{{ error }}</p>
  </div>
  <div v-else-if="loading" class="d-flex flex-column justify-center align-center pa-10">
    <v-progress-circular indeterminate color="primary" size="48" />
    <p class="text-subtitle-1 text-primary font-weight-bold mt-3">Loading Documented Information...</p>
  </div>
  <div v-else-if="pdfFile" class="pdf-container">
    <iframe :src="`${pdfFile}#toolbar=0&navpanes=0`" class="full-screen-iframe" frameborder="0" @contextmenu.prevent />
  </div>
  <div v-else class="pa-6 text-center text-secondary">
    Please select a valid procedure document to view.
  </div>
</template>

<style scoped>
.full-screen-iframe {
  width: 100%;
  height: 80vh;
  border: none;
}
</style>