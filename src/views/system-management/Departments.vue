<script setup lang="ts">
import { ref } from 'vue';
import CardHeader from '@/components/shared/CardHeader.vue';

export interface DepartmentItem {
  id: number | string;
  code: string;
  name: string;
  head: string;
  operationalUnit: string;
  status: 'Active' | 'Inactive';
}

const search = ref('');
const dialog = ref(false);

const departments = ref<DepartmentItem[]>([
  {
    id: 1,
    code: 'DEPT-MAR-ENG',
    name: 'Marine Engineering',
    head: 'C/E Roberto Santos',
    operationalUnit: 'Academic Division',
    status: 'Active'
  },
  {
    id: 2,
    code: 'DEPT-MAR-NAV',
    name: 'Marine Navigation',
    head: 'Capt. Manuel Reyes',
    operationalUnit: 'Academic Division',
    status: 'Active'
  },
  {
    id: 3,
    code: 'DEPT-QMS',
    name: 'Quality Management Office',
    head: 'Dr. Elena Cruz (QMR)',
    operationalUnit: 'Executive Division',
    status: 'Active'
  },
  {
    id: 4,
    code: 'DEPT-REG',
    name: 'Registrar & Admissions',
    head: 'Ms. Clara Dizon',
    operationalUnit: 'Administrative Division',
    status: 'Active'
  }
]);

const headers = [
  { title: 'Code', key: 'code', sortable: true },
  { title: 'Department Name', key: 'name', sortable: true },
  { title: 'Operational Division', key: 'operationalUnit', sortable: true },
  { title: 'Department Head', key: 'head' },
  { title: 'Status', key: 'status', align: 'center' as const },
  { title: 'Actions', key: 'actions', align: 'end' as const, sortable: false }
];

const newDepartment = ref<Partial<DepartmentItem>>({
  code: '',
  name: '',
  head: '',
  operationalUnit: '',
  status: 'Active'
});

const handleSave = () => {
  if (!newDepartment.value.name || !newDepartment.value.code) return;
  departments.value.push({
    id: Date.now(),
    code: newDepartment.value.code,
    name: newDepartment.value.name,
    head: newDepartment.value.head || 'Unassigned',
    operationalUnit: newDepartment.value.operationalUnit || 'General',
    status: newDepartment.value.status || 'Active'
  });
  dialog.value = false;
  newDepartment.value = { code: '', name: '', head: '', operationalUnit: '', status: 'Active' };
};
</script>

<template>
  <CardHeader title="DEPARTMENTAL STRUCTURE & SCHEMAS (CLAUSE 5.3)">
    <div class="pa-6">
      <v-row class="mb-4" align="center">
        <v-col cols="12" md="8">
          <p class="text-body-2 text-secondary mb-0">
            Institutional department directory, operational divisions, and department head assignments.
          </p>
        </v-col>
        <v-col cols="12" md="4" class="text-right">
          <v-btn color="primary" variant="flat" @click="dialog = true">
            <template #prepend>
              <v-icon>mdi-plus</v-icon>
            </template>
            Add Department
          </v-btn>
        </v-col>
      </v-row>

      <v-card border elevation="0" rounded="lg">
        <v-card-title class="pa-4 border-b">
          <v-text-field
            v-model="search"
            placeholder="Search departments by code or title..."
            density="compact"
            variant="outlined"
            style="max-width: 360px"
            hide-details
            prepend-inner-icon="mdi-magnify"
          />
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="departments"
          :search="search"
          class="elevation-0 text-body-2"
        >
          <template #item.code="{ item }">
            <span class="font-weight-bold text-primary">{{ item.code }}</span>
          </template>

          <template #item.status="{ item }">
            <v-chip
              :color="item.status === 'Active' ? 'success' : 'secondary'"
              size="small"
              variant="tonal"
              label
            >
              {{ item.status }}
            </v-chip>
          </template>

          <template #item.actions="{ item }">
            <v-btn icon variant="text" size="small" color="primary" aria-label="Edit Department">
              <v-icon size="18">mdi-pencil-outline</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>

      <!-- Add Department Dialog -->
      <v-dialog v-model="dialog" max-width="500">
        <v-card rounded="lg">
          <v-card-title class="pa-4 bg-primary text-white font-weight-bold">
            Add Department Unit
          </v-card-title>
          <v-card-text class="pa-6">
            <v-row dense>
              <v-col cols="12">
                <v-text-field v-model="newDepartment.code" label="Department Code*" variant="outlined" density="compact" />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newDepartment.name" label="Department Name*" variant="outlined" density="compact" />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newDepartment.operationalUnit" label="Operational Division" variant="outlined" density="compact" />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newDepartment.head" label="Department Head / Lead" variant="outlined" density="compact" />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="pa-4 border-t">
            <v-spacer />
            <v-btn variant="text" @click="dialog = false">Cancel</v-btn>
            <v-btn color="primary" variant="flat" @click="handleSave">Save Department</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </CardHeader>
</template>