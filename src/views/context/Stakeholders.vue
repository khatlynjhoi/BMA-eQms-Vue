<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGovernanceStore } from '@/stores/governance';

const governanceStore = useGovernanceStore();
const search = ref('');

const headers = [
  { title: 'Stakeholder Name', key: 'stakeholderName', sortable: true },
  { title: 'Category', key: 'category', sortable: true },
  { title: 'Needs & Expectations', key: 'needsAndExpectations' },
  { title: 'Applicable Requirements', key: 'applicableRequirements' },
  { title: 'Monitoring Frequency', key: 'reviewFrequency', align: 'center' as const }
];

onMounted(() => {
  governanceStore.fetchInterestedParties();
});
</script>

<template>
  <v-container fluid class="pa-6">
    <div class="mb-4">
      <h2 class="text-h4 font-weight-bold">Interested Parties Register</h2>
      <p class="text-subtitle-1 text-secondary">ISO 9001:2026 Clause 4.2 – Regulatory & Industry Requirements Matrix</p>
    </div>

    <v-card elevation="0" border>
      <v-card-title class="pa-4">
        <v-text-field
          v-model="search"
          placeholder="Filter stakeholders (e.g., MARINA, CHED)..."
          density="compact"
          variant="outlined"
          style="max-width: 320px"
          hide-details
        />
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="governanceStore.interestedParties"
        :search="search"
        :loading="governanceStore.loading"
        class="elevation-0"
      >
        <template v-slot:item.category="{ item }">
          <v-chip color="primary" size="small" variant="tonal">{{ item.category }}</v-chip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>