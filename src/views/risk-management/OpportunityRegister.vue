<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRiskStore } from '@/stores/risk';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import alertService from '@/services/alertService';

const riskStore = useRiskStore();
const search = ref('');

const headers = [
  { title: 'Opportunity Title', key: 'opportunityTitle', sortable: true },
  { title: 'Category', key: 'category', sortable: true },
  { title: 'Expected Outcome', key: 'expectedOutcome' },
  { title: 'Target Date', key: 'targetCompletionDate', align: 'center' as const },
  { title: 'Responsible', key: 'responsiblePerson' },
  { title: 'Status', key: 'status', align: 'center' as const }
];

onMounted(() => {
  riskStore.fetchOpportunities();
});

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Achieved': return 'success';
    case 'In Progress': return 'info';
    case 'Under Evaluation': return 'warning';
    default: return 'secondary';
  }
};

const registerOpportunity = () => {
  alertService.toast('Opening Opportunity Creation Dialog');
};
</script>

<template>
  <v-container fluid class="pa-6">
    <v-row class="mb-4" align="center">
      <v-col cols="12" md="8">
        <h2 class="text-h4 font-weight-bold">OPPORTUNITY REGISTER</h2>
        <p class="text-subtitle-1 text-secondary">ISO 9001:2026 Clause 6.1.2 – Process & Institutional Growth Pursuits</p>
      </v-col>
      <v-col cols="12" md="4" class="text-right">
        <v-btn color="primary" variant="flat" @click="registerOpportunity">
          <template v-slot:prepend>
            <SvgSprite name="custom-plus-outline" style="width: 18px; height: 18px" />
          </template>
          Register Opportunity
        </v-btn>
      </v-col>
    </v-row>

    <v-card elevation="0" border rounded="lg">
      <v-card-title class="pa-4 border-b">
        <v-text-field
          v-model="search"
          placeholder="Search opportunities..."
          density="compact"
          variant="outlined"
          style="max-width: 320px"
          hide-details
          prepend-inner-icon="mdi-magnify"
        />
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="riskStore.opportunities || []"
        :search="search"
        :loading="riskStore.loading"
        class="elevation-0"
      >
        <template v-slot:item.status="{ item }">
          <v-chip :color="getStatusColor(item.status)" size="small" label>
            {{ item.status }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>