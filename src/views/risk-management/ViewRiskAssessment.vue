<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import RiskAssessmentTableList from './components/RiskAssessmentTableList.vue';
import AddRiskDescriptionModel from './components/AddRiskDescriptionModel.vue';
import RiskReportModal from './components/RiskReportModal.vue';
import { GeneralController } from '@/stores/GeneralController';
import alertService from '@/services/alertService';

const route = useRoute();
const contentLoading = ref(true);
const formLoader = ref(false);
const openModel = ref(false);
const openReportModel = ref(false);

const formData = ref({
  risk: '',
  activity: '',
  date_created: ''
});

const riskFormData = ref<Record<string, any>>({
  risk: '',
  risks_description: '',
  control_measures: '',
  who_at_risk: null,
  consequence: null,
  likelihood: null,
  action_to_minimize: '',
  action_by_whom: '',
  action_by_when: '',
  action_effectiveness: '',
  residual_risk: '',
  risk_decision: '',
  opportunity_identified: '',
  opportunity_rate: ''
});

const riskAssessments = ref<any>({ registered_risk: [] });
const riskPDFModal = ref<any>(null);

const safeEncrypt = (data: any) => btoa(String(data));

const consequence = [
  { id: 1, term: '(1) Insignificant' },
  { id: 2, term: '(2) Minor' },
  { id: 3, term: '(3) Moderate' },
  { id: 4, term: '(4) Major' },
  { id: 5, term: '(5) Severe' }
];

const likelihood = [
  { id: 1, term: '(1) Rare' },
  { id: 2, term: '(2) Unlikely' },
  { id: 3, term: '(3) Possible' },
  { id: 4, term: '(4) Likely' },
  { id: 5, term: '(5) Almost Certain' }
];

const when_action = [
  { id: 'urgently', name: 'urgently' },
  { id: 'immediately', name: 'immediately' },
  { id: 'within the day', name: 'within the day' },
  { id: 'within 1 week', name: 'within 1 week' },
  { id: 'Before Next Audit', name: 'Before Next Audit' }
];

const risk_decision = [
  { id: 'a', name: 'A' },
  { id: 'b', name: 'B' },
  { id: 'c', name: 'C' }
];

const opportunity_rating = [
  { id: 'high', name: 'High' },
  { id: 'medium', name: 'Medium' },
  { id: 'low', name: 'Low' }
];

const headers = [
  { title: 'Action', key: 'actionBtn', align: 'start' as const },
  { title: 'Hazards / Risks Description', key: 'risks_description', align: 'start' as const },
  { title: 'Existing Control Measures', key: 'control_measures', align: 'start' as const },
  { title: 'Consequence', key: 'consequence', align: 'start' as const },
  { title: 'Likelihood', key: 'likelihood', align: 'start' as const },
  { title: 'Action to Minimize Risks', key: 'who_at_risk', align: 'start' as const }
];

const loadRiskAssessment = async () => {
  contentLoading.value = true;
  try {
    const targetId = route.params.riskId || route.params.id;
    const controller = new GeneralController();
    const data: any = await controller.retrieveData('risk-and-opportunity/view-risk-v1', { risk: String(targetId) }, 'risk');
    
    if (data) {
      riskAssessments.value = data;
      formData.value.activity = data.activity;
      formData.value.date_created = data.date_created;
      formData.value.risk = safeEncrypt(data.id);
      riskFormData.value.risk = safeEncrypt(data.id);

      const pdfRes = await controller.retrieveFile(formData.value.risk, 'risk-and-opportunity/risk-pdf-report');
      const blob = pdfRes instanceof Blob
        ? pdfRes
        : new Blob([new Uint8Array(pdfRes)], { type: 'application/pdf' });
      riskPDFModal.value = {
        content: data,
        link: URL.createObjectURL(blob),
        isModalLoading: false
      };
    }
  } catch (error) {
    console.error('Failed to load risk assessment details:', error);
  } finally {
    contentLoading.value = false;
  }
};

onMounted(() => {
  loadRiskAssessment();
});

const submitUpload = async () => {
  const confirmed = await alertService.confirm('Are you sure you want to update this Risk Assessment activity?');
  if (!confirmed.isConfirmed) return;

  formLoader.value = true;
  try {
    const form = new FormData();
    Object.keys(formData.value).forEach((key) => {
      form.append(key, (formData.value as any)[key]);
    });
    await GeneralController.storeItem('risk-and-opportunity/update-risk', form);
    alertService.toast('Activity risk assessment updated.');
    await loadRiskAssessment();
  } catch (error) {
    alertService.error('Update failed.');
  } finally {
    formLoader.value = false;
  }
};

const addRisk = () => {
  openModel.value = true;
};

const editRisk = (item: any) => {
  riskFormData.value = { ...item, risk: safeEncrypt(item.id), action: 'update' };
  openModel.value = true;
};

const removeRisk = async (item: any) => {
  const confirmed = await alertService.confirm('Are you sure you want to remove this hazard description?');
  if (!confirmed.isConfirmed) return;

  formLoader.value = true;
  try {
    const payload = new FormData();
    payload.append('risk', safeEncrypt(item.id));
    const controller = new GeneralController();
    await GeneralController.removeItem('risk-and-opportunity/remove-register-risk', payload);
    alertService.toast('Hazard description line removed.');
    await loadRiskAssessment();
  } catch (error) {
    alertService.error('Failed to remove hazard line.');
  } finally {
    formLoader.value = false;
  }
};

const saveRisk = async () => {
  formLoader.value = true;
  try {
    const form = new FormData();
    Object.keys(riskFormData.value).forEach((key) => {
      form.append(key, riskFormData.value[key] ?? '');
    });

    const isUpdate = riskFormData.value.action === 'update';
    const endpoint = isUpdate
      ? 'risk-and-opportunity/update-register-risk'
      : 'risk-and-opportunity/add-risk';

    await GeneralController.storeItem(endpoint, form);
    alertService.toast(isUpdate ? 'Hazard entry updated.' : 'New hazard entry added.');
    openModel.value = false;
    await loadRiskAssessment();
  } catch (error) {
    alertService.error('Save hazard entry failed.');
  } finally {
    formLoader.value = false;
  }
};

const showPDF = () => {
  openReportModel.value = true;
};
</script>

<template>
  <div>
    <v-card variant="outlined" elevation="0" class="bg-surface mb-5 rounded-lg">
      <v-card-item>
        <div class="d-flex justify-space-between align-center">
          <v-card-title class="text-h5 font-weight-bold">VIEW & EDIT RISK ASSESSMENT (CLAUSE 6.1)</v-card-title>
        </div>
      </v-card-item>
      <v-divider />

      <v-card-text class="pa-6">
        <div v-if="contentLoading" class="d-flex justify-center align-center pa-10">
          <v-progress-circular indeterminate color="primary" size="48" />
        </div>

        <v-form v-else @submit.prevent="submitUpload">
          <v-row dense>
            <v-col cols="12" md="8">
              <v-text-field
                v-model="formData.activity"
                label="Activity / Process / Procedure Name*"
                variant="outlined"
                density="compact"
                required
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="formData.date_created"
                label="Assessment Date*"
                type="date"
                variant="outlined"
                density="compact"
                required
              />
            </v-col>
          </v-row>

          <div class="d-flex justify-end ga-2 my-4">
            <v-btn color="success" variant="flat" size="small" @click="showPDF">
              View PDF Report
            </v-btn>
            <v-btn type="submit" color="primary" variant="flat" size="small">
              Update Activity Assessment Header
            </v-btn>
          </div>

          <v-divider class="my-4" />

          <RiskAssessmentTableList
            :data="riskAssessments?.registered_risk || []"
            :headers="headers"
            @add="addRisk"
            @edit="editRisk"
            @removed="removeRisk"
          />
        </v-form>
      </v-card-text>
    </v-card>

    <AddRiskDescriptionModel
      v-model="openModel"
      :form-data="riskFormData"
      :consequence="consequence"
      :likelihood="likelihood"
      :when_action="when_action"
      :risk_decision="risk_decision"
      :opportunity_rating="opportunity_rating"
      @addRisk="saveRisk"
      @update:formData="riskFormData = $event"
    />

    <RiskReportModal
      v-if="riskPDFModal"
      v-model="openReportModel"
      :form-details="riskPDFModal"
    />
  </div>
</template>