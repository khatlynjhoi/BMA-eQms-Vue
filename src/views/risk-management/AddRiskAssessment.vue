<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { GeneralController } from '@/stores/GeneralController';
import alertService from '@/services/alertService';

const router = useRouter();
const formLoader = ref(false);

export interface RiskFormState {
  activity: string;
  date_created: string;
  risks_description: string;
  control_measures: string;
  who_at_risk: string;
  consequence: number | null;
  likelihood: number | null;
  action_to_minimize: string;
  action_by_whom: string;
  action_by_when: string | null;
  action_effectiveness: string;
  residual_risk: string;
  risk_decision: string | null;
  opportunity_identified: string;
  opportunity_rate: string | null;
}

const formData = ref<RiskFormState>({
  activity: '',
  date_created: '',
  risks_description: '',
  control_measures: '',
  who_at_risk: '',
  consequence: null,
  likelihood: null,
  action_to_minimize: '',
  action_by_whom: '',
  action_by_when: null,
  action_effectiveness: '',
  residual_risk: '',
  risk_decision: null,
  opportunity_identified: '',
  opportunity_rate: null
});

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
  { id: 'within 2 days', name: 'within 2 days' },
  { id: 'within 1 week', name: 'within 1 week' },
  { id: 'within 1 month', name: 'within one month' },
  { id: 'Before Next Audit', name: 'Before Next Audit' },
  { id: 'Continuous', name: 'Continuous' }
];

const risk_decision = [
  { id: 'a', name: 'A' },
  { id: 'b', name: 'B' },
  { id: 'c', name: 'C' },
  { id: 'd', name: 'D' },
  { id: 'e', name: 'E' }
];

const opportunity_rating = [
  { id: 'very-high', name: 'Very High' },
  { id: 'high', name: 'High' },
  { id: 'medium', name: 'Medium' },
  { id: 'low', name: 'Low' },
  { id: 'very-low', name: 'Very Low' }
];

const submitUpload = async () => {
  const confirmed = await alertService.confirm('Submit this new Risk and Opportunity assessment (Clause 6.1)?');
  if (!confirmed.isConfirmed) return;

  formLoader.value = true;
  try {
    const form = new FormData();
    Object.keys(formData.value).forEach((key) => {
      form.append(key, (formData.value as any)[key] ?? '');
    });

    const response: any = await GeneralController.storeItem('risk-and-opportunity/store-risk', form);
    
    if (response && (response.status === 200 || response.ok)) {
      alertService.toast('Risk Assessment created successfully.');
      const data = response.data || (await response.json?.());
      const targetId = data?.data?.id || data?.id;
      router.push(`/risk-management/view/${targetId}`);
    } else {
      alertService.error('Failed to create Risk Assessment.');
    }
  } catch (error) {
    console.error('Create risk error:', error);
    alertService.error('An error occurred during submission.');
  } finally {
    formLoader.value = false;
  }
};
</script>

<template>
  <v-card variant="outlined" elevation="0" class="bg-surface mb-5 rounded-lg">
    <v-card-item>
      <v-card-title class="text-h5 font-weight-bold">
        CREATE RISK & OPPORTUNITY ASSESSMENT (CLAUSE 6.1)
      </v-card-title>
    </v-card-item>
    <v-divider />

    <v-card-text class="pa-6">
      <div v-if="formLoader" class="d-flex justify-center align-center pa-10">
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

        <v-text-field
          v-model="formData.risks_description"
          label="Hazards / Risks Description*"
          variant="outlined"
          density="compact"
          required
          class="my-2"
        />

        <v-text-field
          v-model="formData.control_measures"
          label="Existing Control Measures*"
          variant="outlined"
          density="compact"
          required
          class="mb-3"
        />

        <v-row dense>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="formData.who_at_risk"
              label="Who / What is at Risk?*"
              variant="outlined"
              density="compact"
              required
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="formData.consequence"
              :items="consequence"
              item-title="term"
              item-value="id"
              label="Consequence Severity*"
              variant="outlined"
              density="compact"
              required
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="formData.likelihood"
              :items="likelihood"
              item-title="term"
              item-value="id"
              label="Likelihood Probability*"
              variant="outlined"
              density="compact"
              required
            />
          </v-col>
        </v-row>

        <v-text-field
          v-model="formData.action_to_minimize"
          label="Action to be Taken to Minimize Risks*"
          variant="outlined"
          density="compact"
          required
          class="my-3"
        />

        <v-row dense>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="formData.action_by_whom"
              label="Action Responsible Person*"
              variant="outlined"
              density="compact"
              required
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="formData.action_by_when"
              :items="when_action"
              item-title="name"
              item-value="id"
              label="Target Completion Timeline*"
              variant="outlined"
              density="compact"
              required
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="formData.action_effectiveness"
              label="Action Effectiveness Rate (%)*"
              variant="outlined"
              density="compact"
              required
            />
          </v-col>
        </v-row>

        <v-row dense class="mt-2">
          <v-col cols="12" md="4">
            <v-select
              v-model="formData.risk_decision"
              :items="risk_decision"
              item-title="name"
              item-value="id"
              label="Risk Decision Category*"
              variant="outlined"
              density="compact"
              required
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="formData.opportunity_identified"
              label="Opportunity Identified over Risk*"
              variant="outlined"
              density="compact"
              required
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="formData.opportunity_rate"
              :items="opportunity_rating"
              item-title="name"
              item-value="id"
              label="Opportunity Rate*"
              variant="outlined"
              density="compact"
              required
            />
          </v-col>
        </v-row>

        <div class="text-right mt-6">
          <v-btn type="submit" color="primary" variant="flat">
            Save Risk & Opportunity Assessment
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>