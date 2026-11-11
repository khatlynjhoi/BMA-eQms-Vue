<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  data: any[];
  headers?: any[];
  role?: number;
}>();

const emit = defineEmits<{
  (e: 'submit', item: any): void;
  (e: 'validate', item: any): void;
  (e: 'view', id: number | string): void;
  (e: 'edit', item: any): void;
  (e: 'removed', item: any): void;
}>();

const search = ref('');
const selectedYear = ref<string | null>(null);

const defaultHeaders = [
  { title: 'Date', key: 'date_created', align: 'start' as const },
  { title: 'Activity / Process / Procedure', key: 'activity', align: 'start' as const },
  { title: 'Status', key: 'status', align: 'start' as const }
];

const headersList = computed(() => props.headers || defaultHeaders);

const filteredItems = computed(() => {
  if (!props.data) return [];
  return props.data.filter((i) => {
    const statusMatch = selectedYear.value && selectedYear.value !== 'All'
      ? selectedYear.value === 'Draft'
        ? !i.status
        : i.status &&
          ((selectedYear.value === 'Pending' && i.status.is_approved === 2) ||
            (selectedYear.value === 'Approved' && i.status.is_approved === 1) ||
            (selectedYear.value === 'Rejected' && i.status.is_approved === 0))
      : true;
    const searchMatch = search.value
      ? i.activity?.toLowerCase().includes(search.value.toLowerCase())
      : true;
    return statusMatch && searchMatch;
  });
});

const filterOptions = computed(() => {
  if (props.role !== 1) {
    return ['All', 'Draft', 'Pending', 'Approved', 'Rejected'];
  } else {
    const uniqueYears = [
      ...new Set(props.data.map((i) => new Date(i.date_created).getFullYear()))
    ];
    return uniqueYears.filter((y) => !isNaN(y)).sort((a, b) => b - a);
  }
});

const getStatusColor = (status: number | undefined) => {
  return status === 1 ? 'success' : status === 0 ? 'error' : 'warning';
};

const statusName = (status: number | undefined) => {
  return status === 1 ? 'Approved' : status === 0 ? 'Rejected' : 'Pending';
};
</script>

<template>
  <v-container fluid class="pa-0">
    <v-toolbar flat color="transparent" class="d-flex justify-space-between align-center mb-4">
      <v-toolbar-title class="text-h6 font-weight-bold px-0">
        RISK ASSESSMENTS (CLAUSE 6.1)
      </v-toolbar-title>

      <div class="d-flex align-center">
        <v-select
          v-model="selectedYear"
          :items="filterOptions"
          label="Filter Status"
          variant="outlined"
          density="compact"
          hide-details
          clearable
          style="width: 160px"
          class="me-3"
        />
        <v-text-field
          v-model="search"
          placeholder="Search activity..."
          variant="outlined"
          density="compact"
          hide-details
          prepend-inner-icon="mdi-magnify"
          style="width: 240px"
        />
      </div>
    </v-toolbar>

    <v-card border elevation="0" rounded="lg">
      <v-data-table
        :items="filteredItems"
        :headers="headersList"
        :search="search"
        class="elevation-0 text-body-2"
      >
        <template #item.date_created="{ item }">
          <span>{{ item.date_created }}</span>
        </template>

        <template #item.registeredRisk="{ item }">
          <div v-for="(riskRegister, index) in item.registeredRisk" :key="index" class="text-caption">
            <p class="mb-0">{{ Number(index) + 1 }}. {{ riskRegister.risks_description }}</p>
          </div>
        </template>

        <template #item.status="{ item }">
          <template v-if="item.status">
            <v-chip :color="getStatusColor(item.status.is_approved)" size="small" label>
              {{ statusName(item.status.is_approved) }}
            </v-chip>
          </template>
          <template v-else>
            <v-chip color="secondary" size="small" label>Draft</v-chip>
            <v-btn size="x-small" color="primary" variant="flat" class="ms-2" @click="emit('submit', item)">
              Submit
            </v-btn>
          </template>
        </template>

        <template #item.activity="{ item }">
          <v-menu>
            <template #activator="{ props: menuProps }">
              <span v-bind="menuProps" class="text-primary font-weight-bold cursor-pointer">
                {{ item.activity }}
              </span>
            </template>
            <v-list border density="compact">
              <v-list-item @click="emit('view', item.riskId || item.id)">
                <v-list-item-title>View as PDF</v-list-item-title>
              </v-list-item>

              <template v-if="role === 2">
                <v-list-item @click="emit('edit', item)">
                  <v-list-item-title class="text-info">Edit Assessment</v-list-item-title>
                </v-list-item>
                <v-list-item @click="emit('removed', item)">
                  <v-list-item-title class="text-error">Remove</v-list-item-title>
                </v-list-item>
              </template>

              <template v-else-if="role === 5">
                <v-list-item @click="emit('validate', item)">
                  <v-list-item-title class="text-success">Validate Assessment</v-list-item-title>
                </v-list-item>
              </template>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>