<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGovernanceStore } from '@/stores/governance';
import alertService from '@/services/alertService';
import SvgSprite from '@/components/shared/SvgSprite.vue';

const governanceStore = useGovernanceStore();
const search = ref('');
const dialog = ref(false);

const headers = [
  { title: 'Academic Year', key: 'academicYear', sortable: true },
  { title: 'Department', key: 'departmentName', sortable: true },
  { title: 'Physical Risk', key: 'physicalRiskImpact', sortable: true },
  { title: 'Regulatory Impact', key: 'regulatoryImpact', sortable: true },
  { title: 'Mitigation Strategy', key: 'mitigationStrategy' },
  { title: 'Status', key: 'status', align: 'center' as const },
  { title: 'Actions', key: 'actions', align: 'end' as const, sortable: false }
];

const newAssessment = ref({
  academicYear: '2026-2027',
  departmentName: '',
  physicalRiskImpact: 'Low',
  regulatoryImpact: 'Compliant',
  mitigationStrategy: '',
  evaluationNotes: ''
});

onMounted(() => {
  governanceStore.fetchClimateAssessments();
});

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'Severe': return 'error';
    case 'High': return 'warning';
    case 'Medium': return 'info';
    default: return 'success';
  }
};

const handleSave = async () => {
  if (!newAssessment.value.departmentName || !newAssessment.value.mitigationStrategy) {
    alertService.error('Please fill in all required fields.');
    return;
  }
  dialog.value = false;
  alertService.toast('Climate assessment recorded successfully.');
};
</script>

<template>
  <v-container fluid class="pa-6">
    <v-row class="mb-4" align="center">
      <v-col cols="12" md="8">
        <h2 class="text-h4 font-weight-bold">Climate & Operational Context Assessment</h2>
        <p class="text-subtitle-1 text-secondary">ISO 9001:2026 Clause 4.1 – Environmental & Regulatory Impact Log</p>
      </v-col>
      <v-col cols="12" md="4" class="text-right">
        <v-btn color="primary" @click="dialog = true">
          <template v-slot:prepend>
            <SvgSprite name="custom-plus-outline" style="width: 18px; height: 18px" />
          </template>
          New Assessment
        </v-btn>
      </v-col>
    </v-row>

    <v-card elevation="0" border>
      <v-card-title class="pa-4">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          placeholder="Search climate assessments..."
          hide-details
          density="compact"
          variant="outlined"
          style="max-width: 320px"
        />
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="governanceStore.climateAssessments"
        :search="search"
        :loading="governanceStore.loading"
        class="elevation-0"
      >
        <template v-slot:item.physicalRiskImpact="{ item }">
          <v-chip :color="getImpactColor(item.physicalRiskImpact)" size="small" label>
            {{ item.physicalRiskImpact }}
          </v-chip>
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip
            :color="item.status === 'Approved' ? 'success' : item.status === 'Submitted' ? 'info' : 'warning'"
            size="small"
            variant="tonal"
          >
            {{ item.status }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn icon variant="text" size="small" color="primary">
            <SvgSprite name="custom-edit-outline" style="width: 16px; height: 16px" />
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Entry Dialog -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="pa-4 bg-primary text-white">Record Climate Assessment</v-card-title>
        <v-card-text class="pa-4">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="newAssessment.academicYear" label="Academic Year" variant="outlined" density="compact" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="newAssessment.departmentName" label="Department" variant="outlined" density="compact" required />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="newAssessment.physicalRiskImpact"
                :items="['Low', 'Medium', 'High', 'Severe']"
                label="Physical Climate Risk"
                variant="outlined"
                density="compact"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="newAssessment.regulatoryImpact"
                :items="['Compliant', 'Pending Review', 'Non-Compliant']"
                label="Regulatory Impact"
                variant="outlined"
                density="compact"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="newAssessment.mitigationStrategy" label="Mitigation Action Plan" variant="outlined" rows="3" density="compact" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn variant="text" @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="handleSave">Submit Assessment</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>