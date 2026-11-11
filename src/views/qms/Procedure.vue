<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CardHeader from '@/components/shared/CardHeader.vue';
import DetailedView from './components/DetailedView.vue';
import { GeneralController } from '@/stores/GeneralController';

const procedureList = ref<any[]>([]);
const contentLoading = ref(true);
const subContentLoading = ref(false);

const procedureDetails = ref({
  prodId: '' as string | number,
  prodName: 'PROCEDURE SPECIFICATION',
  prodVersion: 'VERSION 1.0',
  fileID: 0 as string | number,
  formLists: [] as any[]
});

const safeEncrypt = (data: any) => btoa(String(data));

const loadData = async () => {
  const controller = new GeneralController();
  return await controller.retrieveData('procedure/retrieve/list', { search: null }, 'procedures');
};

const viewProcedure = async (rawId: any) => {
  subContentLoading.value = true;
  const encryptedId = safeEncrypt(rawId);
  try {
    const controller = new GeneralController();
    const response: any = await controller.retrieveData('procedure/retrieve/view', { procedure: encryptedId }, 'procedure');
    if (response) {
      procedureDetails.value = {
        prodId: safeEncrypt(response.id),
        prodName: response.procedure_name,
        prodVersion: `VERSION ${response.file?.version || '1.0'}`,
        formLists: response.forms || [],
        fileID: safeEncrypt(response.file?.id || 0)
      };
    }
  } catch (error) {
    console.error('Failed to view procedure:', error);
  } finally {
    subContentLoading.value = false;
  }
};

onMounted(async () => {
  const data: any = await loadData();
  procedureList.value = Array.isArray(data) ? data : [];
  contentLoading.value = false;
});
</script>

<template>
  <v-row>
    <v-col cols="12" md="5">
      <CardHeader title="QMS PROCEDURES (CLAUSE 7.5)" class="overflow-hidden">
        <div class="pa-2">
          <div v-if="contentLoading" class="d-flex justify-center align-center pa-8">
            <v-progress-circular indeterminate color="primary" size="40" />
          </div>

          <v-list v-else border rounded="lg" class="py-0">
            <v-list-item
              v-for="(item, index) in procedureList"
              :key="index"
              class="py-3 px-4 border-b cursor-pointer"
              @click="viewProcedure(item.id)"
            >
              <span class="text-body-1 font-weight-bold">{{ item.procedureName }}</span>
              <template #append>
                <v-chip size="x-small" color="success" variant="flat">
                  {{ item.formCount || 0 }} Forms
                </v-chip>
              </template>
            </v-list-item>
          </v-list>
        </div>
      </CardHeader>
    </v-col>

    <v-col cols="12" md="7">
      <div v-if="subContentLoading" class="d-flex flex-column justify-center align-center pa-10 border rounded-lg bg-surface">
        <v-progress-circular indeterminate color="primary" size="48" />
        <p class="text-subtitle-1 text-primary font-weight-bold mt-3">Loading Procedure File...</p>
      </div>
      <DetailedView v-else :detailed="procedureDetails" />
    </v-col>
  </v-row>
</template>