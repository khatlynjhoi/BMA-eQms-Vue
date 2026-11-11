<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useImprovementStore } from '@/stores/improvement';

export interface CapaItem {
  id?: number | string;
  capaNumber: string;
  source: string;
  issueDescription: string;
  rootCauseAnalysis: string;
  assignedPerson: string;
  targetDate?: string;
  status: 'Open' | 'In Progress' | 'Closed' | 'Under Verification';
}

const improvementStore = useImprovementStore();
const search = ref('');

const headers = [
  { title: 'CAPA #', key: 'capaNumber', sortable: true },
  { title: 'Source', key: 'source', sortable: true },
  { title: 'Issue Description', key: 'issueDescription' },
  { title: 'Root Cause (5 Whys / Fishbone)', key: 'rootCauseAnalysis' },
  { title: 'Assigned Responsible', key: 'assignedPerson' },
  { title: 'Status', key: 'status', align: 'center' as const }
];

onMounted(() => {
  improvementStore.fetchCapaLogs();
});

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Closed': return 'success';
    case 'Open': return 'error';
    case 'In Progress': return 'info';
    case 'Under Verification': return 'warning';
    default: return 'secondary';
  }
};
</script>

<template>
  <v-container fluid class="pa-6">
    <div class="mb-4">
      <h2 class="text-h4 font-weight-bold">CORRECTIVE ACTION (CAPA) LOG</h2>
      <p class="text-subtitle-1 text-secondary">
        ISO 9001:2026 Clause 10.2 – Nonconformity Evaluation & Corrective Action Tracking
      </p>
    </div>

    <v-card border elevation="0" rounded="lg">
      <v-card-title class="pa-4 border-b d-flex justify-space-between align-center">
        <v-text-field
          v-model="search"
          placeholder="Search CAPA records..."
          density="compact"
          variant="outlined"
          style="max-width: 320px"
          hide-details
          prepend-inner-icon="mdi-magnify"
        />
        <v-btn color="primary" variant="flat" size="small">
          <v-icon class="mr-1">mdi-plus</v-icon> Register New CAPA
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="improvementStore.capaLogs || []"
        :search="search"
        :loading="improvementStore.loading"
        class="elevation-0 text-body-2"
      >
        <template #item.status="{ item }">
          <v-chip
            :color="getStatusColor(item.status)"
            size="small"
            variant="tonal"
            label
          >
            {{ item.status }}
          </v-chip>
        </template>

        <template #item.capaNumber="{ item }">
          <span class="font-weight-bold text-primary">{{ item.capaNumber }}</span>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>