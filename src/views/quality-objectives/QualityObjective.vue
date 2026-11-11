<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import QualityObjectiveList from './components/QualityObjectiveList.vue';
import QualityObjectiveModal from './components/QualityObjectiveModal.vue';
import { GeneralController } from '@/stores/GeneralController';
import { useAuthStore } from '@/stores/auth';
import alertService from '@/services/alertService';

const router = useRouter();
const authStore = useAuthStore();

const contentLoading = ref(true);
const pageLoader = ref(false);
const tab = ref('one');

const academicModal = ref({
  show: false,
  formInput: '',
  procedure: null as any
});

const titleOption = ref<any[]>([]);
const qualityObjectiveList = ref<any[]>([]);
const submissionObjectiveList = ref<any[]>([]);
const dataBankObjectiveList = ref<any[]>([]);

const objectiveModal = ref({
  show: false,
  link: null as string | null,
  data: null as any,
  isModalLoading: true
});

const userRole = computed(() => Number(authStore.user?.roleID || 6));

const departmentHeader = [
  { title: 'Academic Year', key: 'academic', align: 'start' as const },
  { title: 'Procedure', key: 'procedure', align: 'start' as const },
  { title: 'Objectives', key: 'objectives', align: 'start' as const },
  { title: 'Completion', key: 'completionProgress', align: 'start' as const }
];

const submissionHeader = [
  { title: 'Academic Year', key: 'academic', align: 'start' as const },
  { title: 'Procedure', key: 'procedure', align: 'start' as const },
  { title: 'Objectives', key: 'objectives', align: 'start' as const },
  { title: 'Completion', key: 'completionProgress', align: 'start' as const },
  { title: 'Department', key: 'department', align: 'start' as const },
  { title: 'Owner Name', key: 'created_by', align: 'start' as const },
  { title: 'Status', key: 'status', align: 'start' as const }
];

const retrieveData = async () => {
  contentLoading.value = true;
  try {
    const formData = new FormData();
    formData.append('search', '');
    const controller = new GeneralController();
    const response: any = await controller.retrieveData('quality-objective/retrieve-data-list', formData, 'data');
    if (response) {
      dataBankObjectiveList.value = response.approvedList || [];
      qualityObjectiveList.value = response.ownerList || [];
      submissionObjectiveList.value = response.submittedList || [];
    }
  } catch (error) {
    console.error('Error fetching quality objectives:', error);
    alertService.error('Failed to retrieve Quality Objectives.');
  } finally {
    contentLoading.value = false;
  }
};

onMounted(async () => {
  try {
    const controller = new GeneralController();
    titleOption.value = await controller.retrieveData('amendment/categories', { search: 'Procedure' }, 'data');
  } catch (e) {
    console.error('Failed categories load', e);
  }
  await retrieveData();
});

const storeAcademicYear = async () => {
  pageLoader.value = true;
  try {
    const formData = new FormData();
    formData.append('academic', academicModal.value.formInput);
    formData.append('procedure', String(academicModal.value.procedure));

    await GeneralController.storeItem('quality-objective/store', formData);

    alertService.toast('Quality Objective record created successfully.');
    academicModal.value = { show: false, formInput: '', procedure: null };
    await retrieveData();
  } catch (err: any) {
    alertService.error('Failed to store Quality Objective.');
  } finally {
    pageLoader.value = false;
  }
};

const onView = (data: any) => {
  router.push(`/quality-objectives/monitoring/view/${data.id}`);
};

const onViewPDF = async (item: any) => {
  objectiveModal.value.show = true;
  objectiveModal.value.data = item;
  objectiveModal.value.isModalLoading = true;

  try {
    const controller = new GeneralController();
    const response = await controller.retrieveFile(String(item.id), 'quality-objective/pdf-qualityObjective');
    const blob = response instanceof Blob
      ? response
      : new Blob([new Uint8Array(response)], { type: 'application/pdf' });
    objectiveModal.value.link = URL.createObjectURL(blob);
  } catch (error) {
    alertService.error('Failed to load PDF report preview.');
  } finally {
    objectiveModal.value.isModalLoading = false;
  }
};

const onSubmit = async (item: any) => {
  const confirmed = await alertService.confirm('Do you want to submit this Quality Objective for approval?');
  if (confirmed.isConfirmed) {
    alertService.toast('Quality Objective submitted.');
  }
};

const onRemoved = async (data: any) => {
  const confirmed = await alertService.confirm('Are you sure you want to delete this Quality Objective?');
  if (confirmed.isConfirmed) {
    try {
      const formData = new FormData();
      formData.append('objective', String(data.id));
      await GeneralController.removeItem('quality-objective/removed', formData);
      alertService.toast('Quality Objective removed.');
      await retrieveData();
    } catch (error) {
      alertService.error('Delete action failed.');
    }
  }
};
</script>

<template>
  <v-card variant="outlined" elevation="0" class="bg-surface mb-5 rounded-lg">
    <v-card-item>
      <div class="d-flex justify-space-between align-center">
        <v-card-title class="text-h5 font-weight-bold">
          QUALITY OBJECTIVES MANAGEMENT (ISO 9001:2026 CLAUSE 6.2)
        </v-card-title>
        <v-btn color="primary" variant="flat" @click="academicModal.show = true">
          <v-icon class="mr-1">mdi-plus</v-icon> New Quality Objective
        </v-btn>
      </div>
    </v-card-item>
    <v-divider />

    <v-card-text class="pa-0">
      <div v-if="contentLoading" class="d-flex justify-center align-center pa-10">
        <v-progress-circular indeterminate color="primary" size="48" />
      </div>

      <template v-else>
        <v-tabs v-model="tab" color="primary" class="px-4 border-b">
          <v-tab value="one">MY QUALITY OBJECTIVES</v-tab>
          <v-tab v-if="userRole !== 6" value="two">SUBMISSIONS</v-tab>
          <v-tab v-if="userRole !== 5" value="three">INSTITUTIONAL DATA BANK</v-tab>
        </v-tabs>

        <v-window v-model="tab" class="pa-4">
          <v-window-item value="one">
            <QualityObjectiveList
              :data="qualityObjectiveList"
              :headers="departmentHeader"
              :role="userRole"
              @view="onView"
              @viewPDF="onViewPDF"
              @removed="onRemoved"
              @submit="onSubmit"
            />
          </v-window-item>
          <v-window-item value="two" v-if="userRole !== 6">
            <QualityObjectiveList
              :data="submissionObjectiveList"
              :headers="submissionHeader"
              :role="5"
              @view="onView"
              @viewPDF="onViewPDF"
              @removed="onRemoved"
              @submit="onSubmit"
            />
          </v-window-item>
          <v-window-item value="three" v-if="userRole !== 5">
            <QualityObjectiveList
              :data="dataBankObjectiveList"
              :headers="submissionHeader"
              :role="1"
              @view="onView"
              @viewPDF="onViewPDF"
            />
          </v-window-item>
        </v-window>
      </template>
    </v-card-text>
  </v-card>

  <!-- PDF Preview Modal -->
  <QualityObjectiveModal
    v-if="objectiveModal.show"
    v-model="objectiveModal.show"
    :form-details="objectiveModal"
  />

  <!-- Create Dialog -->
  <v-dialog v-model="academicModal.show" max-width="450">
    <v-card rounded="lg" class="pa-4">
      <v-card-title class="px-0 pt-0 text-h6 font-weight-bold">Create Quality Objective</v-card-title>
      <v-form @submit.prevent="storeAcademicYear">
        <v-text-field
          v-model="academicModal.formInput"
          label="Academic Year (e.g. 2025-2026)*"
          variant="outlined"
          density="compact"
          required
          class="mb-3"
        />
        <v-select
          v-model="academicModal.procedure"
          :items="titleOption"
          item-title="name"
          item-value="id"
          label="Target QMS Procedure*"
          variant="outlined"
          density="compact"
          required
          class="mb-4"
        />
        <div class="d-flex justify-end ga-2">
          <v-btn variant="text" @click="academicModal.show = false">Cancel</v-btn>
          <v-btn type="submit" color="primary" variant="flat">Create</v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>