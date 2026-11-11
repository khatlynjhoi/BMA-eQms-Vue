<script setup lang="ts">
import { ref } from 'vue';
import CardHeader from '@/components/shared/CardHeader.vue';

const routingStages = [
  { step: 1, title: 'Submission Initiated', desc: 'Process owner submits completed QMS form.', status: 'Completed' },
  { step: 2, title: 'Department Head Review', desc: 'Initial verification and content approval.', status: 'Completed' },
  { step: 3, title: 'QMR Validation', desc: 'Quality Management Representative compliance check.', status: 'In Progress' },
  { step: 4, title: 'Documented Information Archival', desc: 'Final registration in Institutional Data Bank.', status: 'Pending' }
];
</script>

<template>
  <CardHeader title="SUBMISSION TRACKER WORKSPACE (CLAUSE 7.5.3)">
    <div class="pa-6">
      <div class="mb-4">
        <h3 class="text-h6 font-weight-bold text-primary mb-1">Real-Time Routing & Validation Workflow</h3>
        <p class="text-body-2 text-secondary">
          Track document approval stages, routing bottlenecks, and validation sign-offs.
        </p>
      </div>

      <v-card border elevation="0" rounded="lg" class="pa-6 bg-grey-lighten-5 mb-4">
        <v-timeline align="start" side="end">
          <v-timeline-item
            v-for="stage in routingStages"
            :key="stage.step"
            :dot-color="stage.status === 'Completed' ? 'success' : stage.status === 'In Progress' ? 'warning' : 'grey'"
            size="small"
          >
            <div class="d-flex justify-space-between align-center">
              <div>
                <h4 class="text-subtitle-1 font-weight-bold mb-1">{{ stage.title }}</h4>
                <p class="text-caption text-secondary mb-0">{{ stage.desc }}</p>
              </div>
              <v-chip
                :color="stage.status === 'Completed' ? 'success' : stage.status === 'In Progress' ? 'warning' : 'secondary'"
                size="x-small"
                label
              >
                {{ stage.status }}
              </v-chip>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card>
    </div>
  </CardHeader>
</template>