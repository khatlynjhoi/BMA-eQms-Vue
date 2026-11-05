<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useGovernanceStore } from '@/stores/governance';
import { useRiskStore } from '@/stores/risk';
import { useImprovementStore } from '@/stores/improvement';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import Announcement from './components/Announcement.vue';

const authStore = useAuthStore();
const governanceStore = useGovernanceStore();
const riskStore = useRiskStore();
const improvementStore = useImprovementStore();

onMounted(async () => {
  await Promise.allSettled([
    governanceStore.fetchClimateAssessments(),
    riskStore.fetchRiskAssessments(),
    riskStore.fetchOpportunities(),
    improvementStore.fetchCapaLogs()
  ]);
});
</script>

<template>
  <v-container fluid class="pa-6">
    <!-- Executive Welcome Header -->
    <v-row class="mb-4" align="center">
      <v-col cols="12" md="8">
        <h2 class="text-h4 font-weight-bold">
          Welcome back, {{ authStore.user?.name || 'QMS User' }}
        </h2>
        <p class="text-subtitle-1 text-secondary">
          Baliwag Maritime Academy — Electronic Quality Management System (ISO 9001:2026)
        </p>
      </v-col>
    </v-row>

    <!-- Executive Metrics Cards -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="3">
        <v-card elevation="0" border class="pa-4">
          <div class="d-flex align-center justify-space-between">
            <div>
              <span class="text-caption text-secondary font-weight-bold">CLIMATE ASSESSMENTS</span>
              <h3 class="text-h4 font-weight-bold mt-1">{{ governanceStore.climateAssessments?.length || 0 }}</h3>
            </div>
            <v-avatar color="primary" variant="tonal" size="48">
              <SvgSprite name="custom-shield-outline" style="width: 24px; height: 24px" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card elevation="0" border class="pa-4">
          <div class="d-flex align-center justify-space-between">
            <div>
              <span class="text-caption text-secondary font-weight-bold">ACTIVE THREAT RISKS</span>
              <h3 class="text-h4 font-weight-bold mt-1 text-warning">{{ riskStore.pendingRisks?.length || 0 }}</h3>
            </div>
            <v-avatar color="warning" variant="tonal" size="48">
              <SvgSprite name="custom-alert-outline" style="width: 24px; height: 24px" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card elevation="0" border class="pa-4">
          <div class="d-flex align-center justify-space-between">
            <div>
              <span class="text-caption text-secondary font-weight-bold">OPPORTUNITIES</span>
              <h3 class="text-h4 font-weight-bold mt-1 text-success">{{ riskStore.opportunities?.length || 0 }}</h3>
            </div>
            <v-avatar color="success" variant="tonal" size="48">
              <SvgSprite name="custom-rocket-outline" style="width: 24px; height: 24px" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card elevation="0" border class="pa-4">
          <div class="d-flex align-center justify-space-between">
            <div>
              <span class="text-caption text-secondary font-weight-bold">OPEN CAPA LOGS</span>
              <h3 class="text-h4 font-weight-bold mt-1 text-error">{{ improvementStore.openCapas?.length || 0 }}</h3>
            </div>
            <v-avatar color="error" variant="tonal" size="48">
              <SvgSprite name="custom-refresh-outline" style="width: 24px; height: 24px" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Quick Directives & System Status -->
    <v-row class="mb-6">
      <v-col cols="12" md="7">
        <v-card elevation="0" border class="pa-4 h-100">
          <v-card-title class="px-0 pt-0 text-h6 font-weight-bold mb-3">
            ISO 9001:2026 Directives & Quick Actions
          </v-card-title>
          <v-list lines="two" class="pa-0">
            <v-list-item to="/context/climate" border rounded class="mb-2">
              <template v-slot:prepend>
                <v-avatar color="primary" variant="tonal" size="40" class="mr-3">
                  <SvgSprite name="custom-document-text-outline" style="width: 20px; height: 20px" />
                </v-avatar>
              </template>
              <v-list-item-title class="font-weight-medium">Climate & Context Assessment</v-list-item-title>
              <v-list-item-subtitle>Review Clause 4.1 environmental and regulatory context logs</v-list-item-subtitle>
            </v-list-item>

            <v-list-item to="/risk-management/opportunities" border rounded class="mb-2">
              <template v-slot:prepend>
                <v-avatar color="success" variant="tonal" size="40" class="mr-3">
                  <SvgSprite name="custom-rocket-outline" style="width: 20px; height: 20px" />
                </v-avatar>
              </template>
              <v-list-item-title class="font-weight-medium">Opportunity Register</v-list-item-title>
              <v-list-item-subtitle>Track Clause 6.1.2 institutional growth pursuits</v-list-item-subtitle>
            </v-list-item>

            <v-list-item to="/qms/approval-workflow" border rounded class="mb-2">
              <template v-slot:prepend>
                <v-avatar color="info" variant="tonal" size="40" class="mr-3">
                  <SvgSprite name="custom-edit-outline" style="width: 20px; height: 20px" />
                </v-avatar>
              </template>
              <v-list-item-title class="font-weight-medium">Management of Change (MOC)</v-list-item-title>
              <v-list-item-subtitle>Manage Clause 6.3 document amendment requests</v-list-item-subtitle>
            </v-list-item>

            <v-list-item to="/improvement/capa-log" border rounded>
              <template v-slot:prepend>
                <v-avatar color="error" variant="tonal" size="40" class="mr-3">
                  <SvgSprite name="custom-alert-outline" style="width: 20px; height: 20px" />
                </v-avatar>
              </template>
              <v-list-item-title class="font-weight-medium">Corrective Action (CAPA) Log</v-list-item-title>
              <v-list-item-subtitle>Track Clause 10.2 non-conformities & audit findings</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="5">
        <v-card elevation="0" border class="pa-4 h-100">
          <v-card-title class="px-0 pt-0 text-h6 font-weight-bold mb-3">System Compliance Status</v-card-title>
          
          <div class="py-2">
            <div class="d-flex justify-space-between mb-1">
              <span class="text-caption font-weight-bold">ISO 9001:2026 HLS Alignment</span>
              <span class="text-caption font-weight-bold text-primary">100% Aligned</span>
            </div>
            <v-progress-linear model-value="100" color="primary" height="8" rounded />

            <div class="d-flex justify-space-between mb-1 mt-4">
              <span class="text-caption font-weight-bold">Documented Information (Clause 7.5)</span>
              <span class="text-caption font-weight-bold text-success">Compliant</span>
            </div>
            <v-progress-linear model-value="92" color="success" height="8" rounded />

            <div class="d-flex justify-space-between mb-1 mt-4">
              <span class="text-caption font-weight-bold">Internal Audit Cycle (Clause 9.2)</span>
              <span class="text-caption font-weight-bold text-info">In Progress</span>
            </div>
            <v-progress-linear model-value="75" color="info" height="8" rounded />
          </div>

          <v-divider class="my-4" />

          <div class="d-flex align-center">
            <v-icon color="success" class="mr-2" size="small">mdi-check-circle-outline</v-icon>
            <span class="text-caption text-secondary">High-Level Structure (HLS) framework fully operational.</span>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Academy Announcement Board -->
    <v-row>
      <v-col cols="12">
        <Announcement />
      </v-col>
    </v-row>
  </v-container>
</template>