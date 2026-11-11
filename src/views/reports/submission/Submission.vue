<script setup lang="ts">
import { ref } from 'vue';
import CardHeader from '@/components/shared/CardHeader.vue';

const search = ref('');

const submissions = ref([
  { id: 1, controlNo: 'BMA-F-2026-001', formTitle: 'Equipment Calibration Log', department: 'Engine Dept', submittedBy: 'C/E Santos', dateSubmitted: '2026-11-02', status: 'Validated' },
  { id: 2, controlNo: 'BMA-F-2026-002', formTitle: 'Student Clearance Form', department: 'Registrar', submittedBy: 'M. Reyes', dateSubmitted: '2026-11-05', status: 'Pending Approval' }
]);

const headers = [
  { title: 'Control Number', key: 'controlNo', sortable: true },
  { title: 'Form Title', key: 'formTitle', sortable: true },
  { title: 'Department', key: 'department', sortable: true },
  { title: 'Submitted By', key: 'submittedBy' },
  { title: 'Date Submitted', key: 'dateSubmitted', align: 'center' as const },
  { title: 'Status', key: 'status', align: 'center' as const }
];
</script>

<template>
  <CardHeader title="FORM SUBMISSIONS DIRECTORY (CLAUSE 7.5)">
    <div class="pa-6">
      <p class="text-body-2 text-secondary mb-4">
        ISO 9001:2026 Clause 7.5.3 – Departmental Report Submissions & Documented Information Archive
      </p>

      <v-card border elevation="0" rounded="lg">
        <v-card-title class="pa-4 border-b">
          <v-text-field
            v-model="search"
            placeholder="Search submissions by control no. or form title..."
            density="compact"
            variant="outlined"
            style="max-width: 360px"
            hide-details
            prepend-inner-icon="mdi-magnify"
          />
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="submissions"
          :search="search"
          class="elevation-0 text-body-2"
        >
          <template #item.status="{ item }">
            <v-chip
              :color="item.status === 'Validated' ? 'success' : 'warning'"
              size="small"
              variant="tonal"
              label
            >
              {{ item.status }}
            </v-chip>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </CardHeader>
</template>