<script setup lang="ts">
import { ref } from 'vue';
import CardHeader from '@/components/shared/CardHeader.vue';

export interface RoleItem {
  id: number | string;
  roleName: string;
  clauseAuthority: string;
  assignedUsersCount: number;
  permissions: string[];
  status: 'Active' | 'Restricted';
}

const search = ref('');
const dialog = ref(false);

const roles = ref<RoleItem[]>([
  {
    id: 1,
    roleName: 'Quality Management Representative (QMR)',
    clauseAuthority: 'Clause 5.3 / 9.3',
    assignedUsersCount: 2,
    permissions: ['Full QMS Admin', 'Management Review Lead', 'CAR Final Approval', 'Document Control'],
    status: 'Active'
  },
  {
    id: 2,
    roleName: 'Lead Internal Auditor',
    clauseAuthority: 'Clause 9.2',
    assignedUsersCount: 5,
    permissions: ['Audit Program Design', 'Audit Report Issuance', 'NC Findings Logging'],
    status: 'Active'
  },
  {
    id: 3,
    roleName: 'Department Head / Process Owner',
    clauseAuthority: 'Clause 4.4 / 8.1',
    assignedUsersCount: 12,
    permissions: ['Process KPI Tracking', 'Risk Register Management', 'CAR Response Submission'],
    status: 'Active'
  },
  {
    id: 4,
    roleName: 'Document Controller',
    clauseAuthority: 'Clause 7.5',
    assignedUsersCount: 3,
    permissions: ['Document Indexing', 'Master List Maintenance', 'Distribution Management'],
    status: 'Active'
  }
]);

const headers = [
  { title: 'Role Title', key: 'roleName', sortable: true },
  { title: 'ISO 9001:2026 Authority Scope', key: 'clauseAuthority', sortable: true },
  { title: 'Assigned Users', key: 'assignedUsersCount', align: 'center' as const },
  { title: 'Key Permissions', key: 'permissions' },
  { title: 'Status', key: 'status', align: 'center' as const },
  { title: 'Actions', key: 'actions', align: 'end' as const, sortable: false }
];
</script>

<template>
  <CardHeader title="QMS ROLES & PERMISSIONS MANAGEMENT (CLAUSE 5.3)">
    <div class="pa-6">
      <v-row class="mb-4" align="center">
        <v-col cols="12" md="8">
          <p class="text-body-2 text-secondary mb-0">
            System-wide role permission matrix configuration and organizational authority scopes.
          </p>
        </v-col>
        <v-col cols="12" md="4" class="text-right">
          <v-btn color="primary" variant="flat" @click="dialog = true">
            <template #prepend>
              <v-icon>mdi-shield-plus-outline</v-icon>
            </template>
            Create QMS Role
          </v-btn>
        </v-col>
      </v-row>

      <v-card border elevation="0" rounded="lg">
        <v-card-title class="pa-4 border-b">
          <v-text-field
            v-model="search"
            placeholder="Search roles or permission scopes..."
            density="compact"
            variant="outlined"
            style="max-width: 360px"
            hide-details
            prepend-inner-icon="mdi-magnify"
          />
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="roles"
          :search="search"
          class="elevation-0 text-body-2"
        >
          <template #item.roleName="{ item }">
            <span class="font-weight-bold text-primary">{{ item.roleName }}</span>
          </template>

          <template #item.permissions="{ item }">
            <div class="d-flex flex-wrap ga-1 py-1">
              <v-chip
                v-for="(p, idx) in item.permissions"
                :key="idx"
                size="x-small"
                color="primary"
                variant="outlined"
                label
              >
                {{ p }}
              </v-chip>
            </div>
          </template>

          <template #item.status="{ item }">
            <v-chip
              :color="item.status === 'Active' ? 'success' : 'warning'"
              size="small"
              variant="tonal"
              label
            >
              {{ item.status }}
            </v-chip>
          </template>

          <template #item.actions="{ item }">
            <v-btn icon variant="text" size="small" color="primary" aria-label="Configure Role">
              <v-icon size="18">mdi-shield-edit-outline</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </CardHeader>
</template>