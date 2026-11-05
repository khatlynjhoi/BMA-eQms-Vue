<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CardHeader from '@/components/shared/CardHeader.vue';
import VersionTableList from './versionControl/VersionTableList.vue';
import { GeneralController } from '@/stores/GeneralController';

const tab = ref('one');
const contentLoading = ref(true);
const formVersionList = ref<any[]>([]);
const procedureVersionList = ref<any[]>([]);

const formHeader = [
  { title: 'Form Name', key: 'formName', sortable: true },
  { title: 'Updated By', key: 'updatedBy', sortable: true },
  { title: 'Timestamp', key: 'updatedAt', sortable: true },
  { title: 'Description of Change', key: 'description' }
];

const procedureHeader = [
  { title: 'Procedure Title', key: 'formName', sortable: true },
  { title: 'Updated By', key: 'updatedBy', sortable: true },
  { title: 'Timestamp', key: 'updatedAt', sortable: true },
  { title: 'Description of Change', key: 'description' }
];

onMounted(async () => {
  try {
    const controller = new GeneralController();
    const procedureVersion = await controller.retrieveData('procedure/version-control', { search: null }, 'version');
    const formVersion = await controller.retrieveData('forms/version-control', { search: null }, 'version');

    procedureVersionList.value = Array.isArray(procedureVersion) ? procedureVersion : [];
    formVersionList.value = Array.isArray(formVersion) ? formVersion : [];
  } catch (error) {
    console.error('Failed to load version control history:', error);
  } finally {
    contentLoading.value = false;
  }
});
</script>

<template>
  <CardHeader title="SYSTEM VERSION CONTROLS" class="overflow-hidden">
    <div class="pa-2">
      <div v-if="contentLoading" class="d-flex justify-center align-center pa-10">
        <v-progress-circular indeterminate color="primary" size="48" />
      </div>

      <template v-else>
        <v-tabs v-model="tab" color="primary" class="px-4 border-b">
          <v-tab value="one" class="font-weight-medium">PROCEDURES</v-tab>
          <v-tab value="two" class="font-weight-medium">FORMS</v-tab>
        </v-tabs>

        <v-window v-model="tab" class="pa-4">
          <v-window-item value="one">
            <VersionTableList :headers="procedureHeader" :revisions="procedureVersionList" />
          </v-window-item>
          <v-window-item value="two">
            <VersionTableList :headers="formHeader" :revisions="formVersionList" />
          </v-window-item>
        </v-window>
      </template>
    </div>
  </CardHeader>
</template>