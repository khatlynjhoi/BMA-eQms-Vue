<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { GeneralController } from '@/stores/GeneralController';

const route = useRoute();
const contentLoading = ref(true);
const amendmentData = ref<any>(null);

const retrieveAmendment = async () => {
  const targetId = route.params.data || route.params.id;
  if (!targetId) return;

  try {
    const controller = new GeneralController();
    const response = await controller.retrieveData('amendment/retrieve', { data: String(targetId) }, 'data');
    amendmentData.value = response;
  } catch (error) {
    console.error('Failed to load amendment comparison files:', error);
  } finally {
    contentLoading.value = false;
  }
};

onMounted(() => {
  retrieveAmendment();
});
</script>

<template>
  <v-card variant="outlined" elevation="0" class="bg-surface mb-5 rounded-lg">
    <v-card-item>
      <v-card-title class="text-h5 font-weight-bold">
        DOCUMENT AMENDMENT COMPARISON (CLAUSE 6.3)
      </v-card-title>
    </v-card-item>
    <v-divider />

    <v-card-text class="pa-4">
      <div v-if="contentLoading" class="d-flex justify-center align-center pa-10">
        <v-progress-circular indeterminate color="primary" size="48" />
      </div>

      <v-row v-else>
        <v-col cols="12" md="6">
          <div class="pa-3 bg-grey-lighten-4 rounded mb-2 font-weight-bold text-subtitle-2 border">
            CURRENT APPROVED FILE
          </div>
          <iframe
            v-if="amendmentData?.originalFile"
            :src="`${amendmentData.originalFile}#toolbar=0&navpanes=0`"
            style="width: 100%; height: 75vh; border: 1px solid #e0e0e0"
          />
          <v-card v-else border elevation="0" class="pa-10 text-center text-secondary">
            No original document preview available.
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <div class="pa-3 bg-blue-lighten-5 text-primary rounded mb-2 font-weight-bold text-subtitle-2 border">
            PROPOSED REVISION (MOC EVALUATION)
          </div>
          <iframe
            v-if="amendmentData?.amendmentFile"
            :src="`${amendmentData.amendmentFile}#toolbar=0&navpanes=0`"
            style="width: 100%; height: 75vh; border: 1px solid #e0e0e0"
          />
          <v-card v-else border elevation="0" class="pa-10 text-center text-secondary">
            No proposed amendment file available.
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>