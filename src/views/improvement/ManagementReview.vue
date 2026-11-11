<script setup lang="ts">
import { ref } from 'vue';
import CardHeader from '@/components/shared/CardHeader.vue';

const tab = ref('inputs');

const reviewInputs = [
  { clause: '9.3.2 a', topic: 'Status of actions from previous management reviews', owner: 'QMR Office', status: 'Completed' },
  { clause: '9.3.2 b', topic: 'Changes in external and internal issues (Clause 4.1 / 4.2)', owner: 'Top Management', status: 'Ready for Review' },
  { clause: '9.3.2 c', topic: 'QMS performance and effectiveness (Objectives, Nonconformities, Audit results)', owner: 'All Process Owners', status: 'In Progress' },
  { clause: '9.3.2 d', topic: 'Adequacy of resources', owner: 'Administration & Finance', status: 'Ready for Review' },
  { clause: '9.3.2 e', topic: 'Effectiveness of actions taken to address risks and opportunities', owner: 'Risk Management Team', status: 'Ready for Review' }
];

const inputHeaders = [
  { title: 'Standard Ref.', key: 'clause', sortable: true },
  { title: 'Management Review Input Topic', key: 'topic' },
  { title: 'Responsible Owner', key: 'owner' },
  { title: 'Status', key: 'status', align: 'center' as const }
];
</script>

<template>
  <CardHeader title="MANAGEMENT REVIEW WORKSPACE (CLAUSE 9.3)">
    <div class="pa-4">
      <v-card border elevation="0" rounded="lg" class="mb-4 bg-grey-lighten-4 pa-4">
        <div class="d-flex justify-space-between align-center">
          <div>
            <h3 class="text-h6 font-weight-bold text-primary">Annual Executive Quality Management Review</h3>
            <span class="text-caption text-secondary">
              Mandatory Top Management Review Inputs (Clause 9.3.2) & Action Outputs (Clause 9.3.3)
            </span>
          </div>
          <v-btn color="primary" variant="flat">
            <v-icon class="mr-1">mdi-plus</v-icon> Create Review Meeting
          </v-btn>
        </div>
      </v-card>

      <v-tabs v-model="tab" color="primary" class="border-b mb-4">
        <v-tab value="inputs">REVIEW INPUTS (CLAUSE 9.3.2)</v-tab>
        <v-tab value="outputs">DECISIONS & OUTPUTS (CLAUSE 9.3.3)</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="inputs">
          <v-card border elevation="0" rounded="lg">
            <v-data-table
              :headers="inputHeaders"
              :items="reviewInputs"
              class="elevation-0 text-body-2"
            >
              <template #item.status="{ item }">
                <v-chip
                  :color="item.status === 'Completed' ? 'success' : item.status === 'Ready for Review' ? 'info' : 'warning'"
                  size="small"
                  label
                >
                  {{ item.status }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card>
        </v-window-item>

        <v-window-item value="outputs">
          <v-card border elevation="0" rounded="lg" class="pa-6 text-center text-secondary">
            <v-icon size="40" color="primary" class="mb-2">mdi-notebook-check-outline</v-icon>
            <h4 class="text-subtitle-1 font-weight-bold text-primary mb-1">Management Review Outputs & Action Minutes</h4>
            <p class="text-body-2 mb-0">
              Decisions on opportunities for improvement, QMS updates, and resource requirements will be recorded during executive sign-off.
            </p>
          </v-card>
        </v-window-item>
      </v-window>
    </div>
  </CardHeader>
</template>