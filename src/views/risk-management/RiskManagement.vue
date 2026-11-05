<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import RiskTableList from './components/RiskTableList.vue';
import RiskReportModal from './components/RiskReportModal.vue';
import RiskAssessmentValidation from './components/RiskAssessmentValidation.vue';
import { GeneralController } from '@/stores/GeneralController';
import { useAuthStore } from '@/stores/auth';
import alertService from '@/services/alertService';

const authStore = useAuthStore();

const tab = ref('one');
const contentLoading = ref(true);
const formLoader = ref(false);

const openModel = ref(false);
const riskAssessments = ref<any>(null);
const ownerRiskAssessments = ref<any[]>([]);
const submissionRiskAssessments = ref<any[]>([]);
const dataBankRiskAssessments = ref<any[]>([]);

const riskAssessmentValidation = ref({
  modalShow: false,
  content: null as any
});

const userRole = computed(() => Number(authStore.user?.roleID || 6));

const headers = (role: number) => {
  const qmrHeader = [
    { title: 'Department', key: 'department', align: 'start' as const },
    { title: 'Activity / Process / Procedure', key: 'activity', align: 'start' as const },
    { title: 'Hazards Description', key: 'description', align: 'start' as const },
    { title: 'Control Measures', key: 'control_measures', align: 'start' as const },
    { title: 'Year', key: 'date_created', align: 'start' as const },
    { title: 'Risk Level', key: 'initial_risk_level', align: 'start' as const }
  ];
  const departmentHeader = [
    { title: 'Date', key: 'date_created', align: 'start' as const },
    { title: 'Activity / Process / Procedure', key: 'activity', align: 'start' as const },
    { title: 'Status', key: 'status', align: 'start' as const }
  ];
  const sdoHeader = [
    { title: 'Date', key: 'date_created', align: 'start' as const },
    { title: 'Activity / Process / Procedure', key: 'activity', align: 'start' as const },
    { title: 'Hazards Description', key: 'registeredRisk', align: 'start' as const },
    { title: 'Department', key: 'department', align: 'start' as const },
    { title: 'Owner Name', key: 'created_by', align: 'start' as const },
    { title: 'Status', key: 'status', align: 'start' as const }
  ];
  return role === 1 ? qmrHeader : role === 5 ? sdoHeader : departmentHeader;
};

const retrieveDataList = async () => {
  contentLoading.value = true;
  try {
    const controller = new GeneralController();
    const response: any = await controller.retrieveData('risk-and-opportunity/risk-list', {}, 'risk');
    if (response) {
      ownerRiskAssessments.value = response.ownerList || [];
      submissionRiskAssessments.value = response.submittedList || [];
      dataBankRiskAssessments.value = response.dataBankList || [];
    }
  } catch (error) {
    console.error('Error fetching risk list:', error);
  } finally {
    contentLoading.value = false;
  }
};

onMounted(() => {
  retrieveDataList();
});

const onView = async (item: any) => {
  formLoader.value = true;
  openModel.value = true;
  try {
    const controller = new GeneralController();
    const response = await controller.retrieveFile(String(item), 'risk-and-opportunity/risk-pdf-report');
    const blob = response instanceof Blob
      ? response
      : new Blob([new Uint8Array(response)], { type: 'application/pdf' });
    const contentData = await controller.retrieveData('risk-and-opportunity/view-risk-v1', { risk: String(item) }, 'risk');
    
    riskAssessments.value = {
      content: contentData,
      link: URL.createObjectURL(blob),
      isModalLoading: false
    };
  } catch (error) {
    alertService.error('Failed to generate PDF report view.');
  } finally {
    formLoader.value = false;
  }
};

const onValidate = async (item: any) => {
  formLoader.value = true;
  riskAssessmentValidation.value.modalShow = true;
  try {
    const controller = new GeneralController();
    const response = await controller.retrieveFile(String(item.id), 'risk-and-opportunity/risk-pdf-report');
    const blob = response instanceof Blob
      ? response
      : new Blob([new Uint8Array(response)], { type: 'application/pdf' });
    const contentData = await controller.retrieveData('risk-and-opportunity/view-validation', { risk: String(item.id) }, 'risk');

    riskAssessmentValidation.value.content = {
      content: contentData,
      link: URL.createObjectURL(blob),
      validation: item,
      isModalLoading: false
    };
  } catch (error) {
    alertService.error('Failed to view assessment validation.');
  } finally {
    formLoader.value = false;
  }
};

const onEdit = (item: any) => {
  window.location.href = `/risk/risk-management/view/${item.riskId || item.id}`;
};

const onSubmit = async (data: any) => {
  const confirmed = await alertService.confirm('Do you want to submit this Risk Assessment for validation?');
  if (!confirmed.isConfirmed) return;

  formLoader.value = true;
  try {
    const formData = new FormData();
    formData.append('risk', String(data.id));
    await GeneralController.removeItem('risk-and-opportunity/submit-risk', formData);
    alertService.toast('Risk assessment submitted successfully.');
    await retrieveDataList();
  } catch (error) {
    alertService.error('Submission failed.');
  } finally {
    formLoader.value = false;
  }
};

const onDelete = async (data: any) => {
  const confirmed = await alertService.confirm('Are you sure you want to remove this Risk Assessment?');
  if (!confirmed.isConfirmed) return;

  formLoader.value = true;
  try {
    const formData = new FormData();
    formData.append('risk', String(data.id));
    await GeneralController.removeItem('risk-and-opportunity/removed-risk', formData);
    alertService.toast('Risk assessment removed.');
    await retrieveDataList();
  } catch (error) {
    alertService.error('Remove action failed.');
  } finally {
    formLoader.value = false;
  }
};

const onApproved = async (data: any) => {
  const confirmed = await alertService.confirm('Approve this Risk Assessment?');
  if (!confirmed.isConfirmed) return;

  try {
    const formData = new FormData();
    formData.append('validateID', String(data.verificationId));
    formData.append('status', '1');
    await GeneralController.storeItem('risk-and-opportunity/risk-validation', formData);
    alertService.toast('Risk assessment approved.');
    riskAssessmentValidation.value.modalShow = false;
    await retrieveDataList();
  } catch (error) {
    alertService.error('Approval failed.');
  }
};

const onDisapproved = async (data: FormData) => {
  try {
    await GeneralController.storeItem('risk-and-opportunity/risk-validation', data);
    alertService.toast('Risk assessment disapproved.');
    riskAssessmentValidation.value.modalShow = false;
    await retrieveDataList();
  } catch (error) {
    alertService.error('Disapproval recording failed.');
  }
};
</script>

<template>
  <v-card variant="outlined" elevation="0" class="bg-surface mb-5 rounded-lg">
    <v-card-item>
      <div class="d-flex justify-space-between align-center">
        <v-card-title class="text-h5 font-weight-bold">RISK MANAGEMENT WORKSPACE (CLAUSE 6.1)</v-card-title>
        <v-btn color="primary" to="/risk/risk-management/create-new" variant="flat">
          <v-icon class="mr-1">mdi-plus</v-icon> Register Risk Assessment
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
          <v-tab value="one">MY RISKS</v-tab>
          <v-tab v-if="userRole !== 6" value="two">SUBMISSIONS</v-tab>
          <v-tab v-if="userRole !== 5" value="three">INSTITUTIONAL DATA BANK</v-tab>
        </v-tabs>

        <v-window v-model="tab" class="pa-4">
          <v-window-item value="one">
            <RiskTableList
              :data="ownerRiskAssessments"
              :headers="headers(2)"
              :role="2"
              @view="onView"
              @removed="onDelete"
              @edit="onEdit"
              @submit="onSubmit"
            />
          </v-window-item>
          <v-window-item value="two" v-if="userRole !== 6">
            <RiskTableList
              :data="submissionRiskAssessments"
              :headers="headers(5)"
              :role="5"
              @view="onView"
              @removed="onDelete"
              @edit="onEdit"
              @validate="onValidate"
            />
          </v-window-item>
          <v-window-item value="three" v-if="userRole !== 5">
            <RiskTableList
              :data="dataBankRiskAssessments"
              :headers="headers(1)"
              :role="1"
              @view="onView"
              @removed="onDelete"
              @edit="onEdit"
            />
          </v-window-item>
        </v-window>
      </template>
    </v-card-text>
  </v-card>

  <RiskReportModal
    v-if="riskAssessments"
    v-model="openModel"
    :form-details="riskAssessments"
  />

  <RiskAssessmentValidation
    v-if="riskAssessmentValidation.content"
    v-model="riskAssessmentValidation.modalShow"
    :form-details="riskAssessmentValidation.content"
    @approved="onApproved"
    @disapproved="onDisapproved"
  />
</template>