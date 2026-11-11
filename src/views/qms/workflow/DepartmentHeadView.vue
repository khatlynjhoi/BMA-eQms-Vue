<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AmendmentTableList from './components/AmendmentTableList.vue';
import QMRView from './QMRView.vue';
import { GeneralController } from '@/stores/GeneralController';
import { useAuthStore } from '@/stores/auth';
import alertService from '@/services/alertService';

const authStore = useAuthStore();
const tab = ref('one');
const contentLoading = ref(true);
const formLoader = ref(false);

const draftAmendments = ref<any[]>([]);
const submissionAmendments = ref<any[]>([]);
const verificationAmendments = ref<any[]>([]);
const userRole = ref<number | null>(null);

const headers = [
  { title: 'Status', key: 'status', align: 'start' as const },
  { title: 'Amendment Control No.', key: 'amendmentControl', align: 'start' as const },
  { title: 'Procedure / Form Name', key: 'name', align: 'start' as const },
  { title: 'Classification', key: 'reference', align: 'start' as const },
  { title: 'Submission Date', key: 'submittedData', align: 'start' as const }
];

const draftHeader = [
  { title: 'Procedure / Form Name', key: 'name', align: 'start' as const },
  { title: 'Classification', key: 'reference', align: 'start' as const },
  { title: 'Description of Changes', key: 'descriptionOfChanges', align: 'start' as const },
  { title: 'Date Created', key: 'createdAt', align: 'start' as const },
  { title: 'Actions', key: 'draftAction', align: 'center' as const, sortable: false }
];

const retrieveAmendments = async () => {
  const creatorType = userRole.value === 6 ? 'level 1' : 'creator';
  const controller = new GeneralController();
  return await controller.retrieveData('amendment/list-of-amendments', { userType: creatorType }, 'list');
};

const loadData = async () => {
  contentLoading.value = true;
  try {
    const response: any = await retrieveAmendments();
    if (response) {
      draftAmendments.value = response.draftList || [];
      submissionAmendments.value = response.submissionList || [];
      verificationAmendments.value = response.verificationList || [];
    }
  } catch (error) {
    console.error('Error fetching amendments:', error);
  } finally {
    contentLoading.value = false;
  }
};

onMounted(async () => {
  userRole.value = Number(authStore.user?.roleID || 0);
  if (userRole.value === 6) {
    tab.value = 'three';
  }
  await loadData();
});

const draftSubmit = async (id: number | string) => {
  const confirmed = await alertService.confirm('Submit this document amendment for QMR verification?');
  if (!confirmed.isConfirmed) return;

  formLoader.value = true;
  try {
    const formData = new FormData();
    formData.append('id', String(id));
    await GeneralController.storeItem('amendment/submission', formData);
    alertService.toast('Amendment submitted for verification.');
    await loadData();
  } catch (error) {
    alertService.error('Failed to submit amendment.');
  } finally {
    formLoader.value = false;
  }
};

const draftRemove = async (id: number | string) => {
  const confirmed = await alertService.confirm('Are you sure you want to discard this amendment draft?');
  if (confirmed.isConfirmed) {
    alertService.toast('Amendment draft removed.');
  }
};

const draftView = (item: any) => {
  console.log('Viewing draft details:', item);
};
</script>

<template>
  <v-card variant="outlined" elevation="0" class="bg-surface mb-5 rounded-lg">
    <v-card-item>
      <div class="d-flex justify-space-between align-center">
        <v-card-title class="text-h5 font-weight-bold">MANAGEMENT OF CHANGE WORKFLOW (CLAUSE 6.3)</v-card-title>
        <v-btn color="primary" to="/qms/approval-workflow/create" variant="flat">
          <v-icon class="mr-1">mdi-plus</v-icon> Create Amendment
        </v-btn>
      </div>
    </v-card-item>
    <v-divider />

    <v-card-text class="pa-0">
      <v-tabs v-model="tab" color="primary" class="px-4 border-b">
        <v-tab value="one">DRAFT AMENDMENTS</v-tab>
        <v-tab value="two">SUBMISSIONS</v-tab>
        <v-tab v-if="userRole === 6" value="three">PENDING VERIFICATION (QMR)</v-tab>
      </v-tabs>

      <div v-if="contentLoading" class="d-flex justify-center align-center pa-10">
        <v-progress-circular indeterminate color="primary" size="48" />
      </div>

      <v-window v-else v-model="tab" class="pa-4">
        <v-window-item value="one">
          <AmendmentTableList
            :data="draftAmendments"
            :headers="draftHeader"
            @view="draftView"
            @remove="draftRemove"
            @submit="draftSubmit"
          />
        </v-window-item>
        <v-window-item value="two">
          <AmendmentTableList :data="submissionAmendments" :headers="headers" />
        </v-window-item>
        <v-window-item value="three" v-if="userRole === 6">
          <QMRView :amendment-list="verificationAmendments" />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>