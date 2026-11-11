<script setup lang="ts">
import { ref } from 'vue';

const drawer = ref(true);
</script>

<template>
  <v-app>
    <!-- Left Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" width="280" elevation="0" class="border-e">
      <div class="pa-4 border-b">
        <div class="text-subtitle-1 font-weight-bold text-primary">BALIWAG MARITIME</div>
        <div class="text-caption text-medium-emphasis">e-QMS PORTAL (ISO 9001:2026)</div>
      </div>

      <v-list density="compact" nav class="mt-2">
        <v-list-subheader class="text-caption font-weight-bold">DASHBOARD & OVERVIEW</v-list-subheader>
        <v-list-item prepend-icon="mdi-view-dashboard-outline" title="Executive Dashboard" to="/dashboard" active-color="primary" />

        <v-list-subheader class="text-caption font-weight-bold mt-2">CLAUSE 4 & 5: CONTEXT & GOVERNANCE</v-list-subheader>
        <v-list-item prepend-icon="mdi-earth" title="Context & Climate Assessment" to="/context/climate" />
        <v-list-item prepend-icon="mdi-account-group-outline" title="Interested Parties Register" to="/context/interested-parties" />
        <v-list-item prepend-icon="mdi-shield-account-outline" title="Quality Policy & Ethics" to="/context/quality-policy" />

        <v-list-subheader class="text-caption font-weight-bold mt-2">CLAUSE 6: PLANNING, RISKS & CHANGE</v-list-subheader>
        <v-list-item prepend-icon="mdi-alert-outline" title="Risk Management Workspace" to="/risk-management" />
        <v-list-item prepend-icon="mdi-lightbulb-outline" title="Opportunity Register" to="/risk-management/opportunities" />
        <v-list-item prepend-icon="mdi-bullseye-arrow" title="Quality Objectives" to="/quality-objectives" />

        <v-list-subheader class="text-caption font-weight-bold mt-2">CLAUSE 7: SUPPORT & KNOWLEDGE</v-list-subheader>
        <v-list-item prepend-icon="mdi-file-document-outline" title="Documented Information" to="/documents" />
        <v-list-item prepend-icon="mdi-file-edit-outline" title="Management of Change (MOC)" to="/documents/amendment" />
        <v-list-item prepend-icon="mdi-book-open-outline" title="Organizational Knowledge" to="/documents/knowledge-bank" />

        <v-list-subheader class="text-caption font-weight-bold mt-2">CLAUSE 8: OPERATIONS & RESILIENCE</v-list-subheader>
        <v-list-item prepend-icon="mdi-shield-check-outline" title="Operations & Resilience" to="/operations/resilience" />

        <v-list-subheader class="text-caption font-weight-bold mt-2">CLAUSE 9 & 10: AUDITS & CAPA</v-list-subheader>
        <v-list-item prepend-icon="mdi-clipboard-check-outline" title="Internal Audits" to="/audits" />
        <v-list-item prepend-icon="mdi-alert-circle-outline" title="CAPA Log" to="/capa" />
      </v-list>
    </v-navigation-drawer>

    <!-- Top App Bar -->
    <v-app-bar flat border-b class="px-2">
      <v-btn icon="mdi-menu" variant="text" @click="drawer = !drawer" />

      <v-text-field
        density="compact"
        variant="solo-filled"
        flat
        hide-details
        placeholder="Search SOPs, Risks, MOC, CAPA..."
        prepend-inner-icon="mdi-magnify"
        class="ml-2"
        style="max-width: 380px;"
      />

      <v-spacer />

      <v-btn icon class="mr-2">
        <v-badge content="4" color="error">
          <v-icon>mdi-bell-outline</v-icon>
        </v-badge>
      </v-btn>

      <v-avatar color="primary" size="36">
        <span class="text-caption font-weight-bold text-white">BM</span>
      </v-avatar>
    </v-app-bar>

    <!-- Main Viewport (Prevents Content Overlap under App Bar) -->
    <v-main>
      <v-container fluid class="pa-6">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>