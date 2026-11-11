<script setup lang="ts">
import { ref } from 'vue';
import CardHeader from '@/components/shared/CardHeader.vue';

const tab = ref('schedule');
const search = ref('');

const auditSchedule = ref([
  { id: 1, cycle: 'Q1 2026', department: 'Maritime Education', scope: 'Clause 7.1 & 8.1 Operations', leadAuditor: 'Capt. Smith', auditDate: '2026-03-15', status: 'Scheduled' },
  { id: 2, cycle: 'Q2 2026', department: 'Quality Assurance & QMR', scope: 'Clause 4.0 - 6.0 Governance', leadAuditor: 'Dr. Johnson', auditDate: '2026-06-10', status: 'Planned' }
]);

const auditFindings = ref([
  { id: 101, refNo: 'NC-2026-01', department: 'Deck Department', findingType: 'Minor NC', clause: '7.5.3 Document Control', description: 'Outdated version of Form BMA-04 found at workstation.', status: 'CAPA Issued' },
  { id: 102, refNo: 'OFI-2026-02', department: 'Engine Department', findingType: 'OFI', clause: '6.1 Risk Management', description: 'Consider digitalizing log entries for preventive maintenance.', status: 'Under Review' }
]);

const scheduleHeaders = [
  { title: 'Audit Cycle', key: 'cycle', sortable: true },
  { title: 'Target Department', key: 'department', sortable: true },
  { title: 'Audit Scope', key: 'scope' },
  { title: 'Lead Auditor', key: 'leadAuditor' },
  { title: 'Audit Date', key: 'auditDate' },
  { title: 'Status', key: 'status', align: 'center' as const }
];

const findingHeaders = [
  { title: 'Ref No.', key: 'refNo', sortable: true },
  { title: 'Department', key: 'department' },
  { title: 'Classification', key: 'findingType' },
  { title: 'Standard Clause', key: 'clause' },
  { title: 'Finding Summary', key: 'description' },
  { title: 'Status', key: 'status', align: 'center' as const }
];

const getFindingColor = (type: string) => {
  switch (type) {
    case 'Major NC': return 'error';
    case 'Minor NC': return 'warning';
    case 'OFI': return 'info';
    default: return 'secondary';
  }
};
</script>

<template>
  <CardHeader title="INTERNAL AUDIT PROGRAM WORKSPACE (CLAUSE 9.2)">
    <div class="pa-4">
      <v-tabs v-model="tab" color="primary" class="border-b mb-4">
        <v-tab value="schedule">AUDIT PROGRAM SCHEDULE</v-tab>
        <v-tab value="findings">AUDIT FINDINGS & NON-CONFORMITIES</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="schedule">
          <v-card border elevation="0" rounded="lg">
            <v-card-title class="pa-4 border-b d-flex justify-space-between align-center">
              <v-text-field
                v-model="search"
                placeholder="Search audit schedule..."
                density="compact"
                variant="outlined"
                style="max-width: 300px"
                hide-details
                prepend-inner-icon="mdi-magnify"
              />
              <v-btn color="primary" variant="flat" size="small">
                <v-icon class="mr-1">mdi-calendar-plus</v-icon> Schedule Internal Audit
              </v-btn>
            </v-card-title>

            <v-data-table
              :headers="scheduleHeaders"
              :items="auditSchedule"
              :search="search"
              class="elevation-0 text-body-2"
            >
              <template #item.status="{ item }">
                <v-chip color="primary" size="small" variant="tonal" label>
                  {{ item.status }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card>
        </v-window-item>

        <v-window-item value="findings">
          <v-card border elevation="0" rounded="lg">
            <v-card-title class="pa-4 border-b d-flex justify-space-between align-center">
              <v-text-field
                v-model="search"
                placeholder="Search audit findings..."
                density="compact"
                variant="outlined"
                style="max-width: 300px"
                hide-details
                prepend-inner-icon="mdi-magnify"
              />
              <v-btn color="primary" variant="flat" size="small">
                <v-icon class="mr-1">mdi-plus</v-icon> Log Audit Finding
              </v-btn>
            </v-card-title>

            <v-data-table
              :headers="findingHeaders"
              :items="auditFindings"
              :search="search"
              class="elevation-0 text-body-2"
            >
              <template #item.findingType="{ item }">
                <v-chip :color="getFindingColor(item.findingType)" size="small" label>
                  {{ item.findingType }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card>
        </v-window-item>
      </v-window>
    </div>
  </CardHeader>
</template>