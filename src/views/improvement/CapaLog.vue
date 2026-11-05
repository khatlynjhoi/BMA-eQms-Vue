<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useImprovementStore } from '@/stores/improvement';

const improvementStore = useImprovementStore();
const search = ref('');

const headers = [
  { title: 'CAPA #', key: 'capaNumber', sortable: true },
  { title: 'Source', key: 'source', sortable: true },
  { title: 'Issue Description', key: 'issueDescription' },
  { title: 'Root Cause', key: 'rootCauseAnalysis' },
  { title: 'Assigned To', key: 'assignedPerson' },
  { title: 'Status', key: 'status', align: 'center' as const }
];

onMounted(() => {
  improvementStore.fetchCapaLogs();
});
</script>

<template>
  <v-container fluid class="pa-6">
    <div class="mb-4">
      <h2 class="text-h4 font-weight-bold">Corrective Action (CAPA) Log</h2>
      <p class="text-subtitle-1 text-secondary">ISO 9001:2026 Clause 10.2 – Non-Conformity Management & Escalations</p>
    </div>

    <v-card elevation="0" border>
      <v-card-title class="pa-4">
        <v-text-field
          v-model="search"
          placeholder="Filter CAPA records..."
          density="compact"
          variant="outlined"
          style="max-width: 320px"
          hide-details
        />
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="improvementStore.capaLogs"
        :search="search"
        :loading="improvementStore.loading"
        class="elevation-0"
      >
        <template v-slot:item.status="{ item }">
          <v-chip
            :color="item.status === 'Closed' ? 'success' : item.status === 'Open' ? 'error' : 'warning'"
            size="small"
            variant="tonal"
          >
            {{ item.status }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>