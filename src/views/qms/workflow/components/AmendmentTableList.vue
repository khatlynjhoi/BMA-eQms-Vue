<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  data: any[];
  headers?: any[];
}>();

defineEmits<{
  (e: 'view', item: any): void;
  (e: 'submit', id: number | string): void;
  (e: 'remove', id: number | string): void;
}>();

const search = ref('');
const statusFilter = ref<string | null>(null);
const statusOptions = ['Approved', 'Pending', 'Rejected'];

const defaultHeaders = [
  { title: 'Status', key: 'status', align: 'start' as const },
  { title: 'Amendment Control No.', key: 'amendmentControl', align: 'start' as const },
  { title: 'Procedure / Form Name', key: 'name', align: 'start' as const },
  { title: 'Classification', key: 'reference', align: 'start' as const },
  { title: 'Submission Date', key: 'submittedData', align: 'start' as const },
  { title: 'Actions', key: 'draftAction', align: 'center' as const, sortable: false }
];

const headersList = computed(() => props.headers || defaultHeaders);

const filteredData = computed(() => {
  if (!props.data) return [];
  if (!statusFilter.value) return props.data;
  return props.data.filter(
    (item) => item.status?.toLowerCase() === statusFilter.value?.toLowerCase()
  );
});

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'approved': return 'success';
    case 'pending': return 'warning';
    case 'rejected': return 'error';
    default: return 'secondary';
  }
};

const exportCSV = () => {
  const csvContent = [
    ['ID', 'Amendment Control', 'Classification', 'Description of Changes', 'Updated At', 'Status'],
    ...filteredData.value.map((row) => [
      row.id,
      row.amendmentControl || row.amendment_control,
      row.model || row.reference,
      `"${(row.descriptionOfChanges || row.description_of_changes || '').replace(/"/g, '""')}"`,
      new Date(row.updated_at || Date.now()).toLocaleString(),
      row.status
    ])
  ]
    .map((e) => e.join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `bma_qms_amendments_${Date.now()}.csv`);
  link.click();
  URL.revokeObjectURL(link.href);
};
</script>

<template>
  <v-container fluid class="pa-0">
    <v-toolbar flat color="transparent" class="mb-4">
      <v-toolbar-title class="text-h6 font-weight-bold px-0">
        REGISTERED AMENDMENT REQUESTS
      </v-toolbar-title>
      <v-spacer />

      <v-select
        v-model="statusFilter"
        :items="statusOptions"
        label="Filter Status"
        variant="outlined"
        density="compact"
        hide-details
        clearable
        class="mr-2"
        style="max-width: 160px"
      />

      <v-text-field
        v-model="search"
        placeholder="Search amendments..."
        variant="outlined"
        density="compact"
        hide-details
        prepend-inner-icon="mdi-magnify"
        class="mr-2"
        style="max-width: 220px"
      />

      <v-btn color="primary" variant="flat" size="small" @click="exportCSV">
        Export CSV
      </v-btn>
    </v-toolbar>

    <v-card border elevation="0" rounded="lg">
      <v-data-table
        :items="filteredData"
        :headers="headersList"
        :search="search"
        class="elevation-0 text-body-2"
      >
        <template #item.status="{ item }">
          <v-chip :color="getStatusColor(item.status)" size="small" label>
            {{ item.status }}
          </v-chip>
        </template>

        <template #item.amendmentControl="{ item }">
          <router-link :to="`/qms/approval-workflow/view/${item.id}`" class="text-primary font-weight-bold text-decoration-none">
            {{ item.amendmentControl || item.amendment_control }}
          </router-link>
        </template>

        <template #item.draftAction="{ item }">
          <v-menu>
            <template #activator="{ props: menuProps }">
              <v-btn variant="tonal" color="primary" size="small" v-bind="menuProps">
                Action
              </v-btn>
            </template>
            <v-list border density="compact">
              <v-list-item @click="$emit('view', item)">
                <v-list-item-title>View Details</v-list-item-title>
              </v-list-item>
              <v-list-item @click="$emit('submit', item.id)">
                <v-list-item-title class="text-success">Submit Amendment</v-list-item-title>
              </v-list-item>
              <v-list-item @click="$emit('remove', item.id)">
                <v-list-item-title class="text-error">Remove</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>