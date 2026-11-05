<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  data: any[];
  headers?: any[];
  role?: number;
}>();

const emit = defineEmits(['submit', 'validate', 'view', 'removed', 'viewPDF']);

const search = ref('');
const selectedYear = ref<any>(null);
const validationAlert = ref({
  content: null as any,
  show: false
});

const defaultHeaders = [
  { title: 'Academic Year', key: 'academic', align: 'start' as const },
  { title: 'Procedure', key: 'procedure', align: 'start' as const },
  { title: 'Objectives', key: 'objectives', align: 'start' as const },
  { title: 'Completion', key: 'completionProgress', align: 'start' as const }
];

const headersList = computed(() => props.headers || defaultHeaders);

const filteredItems = computed(() => {
  if (!props.data) return [];
  return props.data.filter((i) => {
    const yearMatch = selectedYear.value
      ? new Date(i.createdAt || i.date_created).getFullYear() === Number(selectedYear.value)
      : true;
    const searchMatch = search.value
      ? i.procedure?.toLowerCase().includes(search.value.toLowerCase()) ||
        i.academic?.toLowerCase().includes(search.value.toLowerCase())
      : true;
    return yearMatch && searchMatch;
  });
});

const years = computed(() => {
  if (props.role !== 1) {
    return ['Draft', 'Pending', 'Approved', 'Rejected'];
  } else {
    const uniqueYears = [
      ...new Set(props.data.map((i) => new Date(i.date_created || i.createdAt).getFullYear()))
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

const showValidation = (item: any) => {
  validationAlert.value = {
    content: item,
    show: true
  };
};

const openRiskView = (item: any) => {
  if (item?.riskId) {
    window.location.href = `/risk/risk-management/view/${item.riskId}`;
  }
};
</script>

<template>
  <v-container fluid class="pa-0">
    <v-toolbar flat color="transparent" class="d-flex justify-space-between align-center mb-4">
      <v-toolbar-title class="text-h6 font-weight-bold px-0">
        LIST OF QUALITY OBJECTIVES (CLAUSE 6.2)
      </v-toolbar-title>

      <div class="d-flex align-center">
        <v-select
          v-model="selectedYear"
          :items="years"
          label="Filter Year / Status"
          variant="outlined"
          density="compact"
          hide-details
          clearable
          style="width: 180px"
          class="me-3"
        />
        <v-text-field
          v-model="search"
          placeholder="Search..."
          variant="outlined"
          density="compact"
          hide-details
          prepend-inner-icon="mdi-magnify"
          style="width: 220px"
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
        <template v-slot:item.date_created="{ item }">
          <span>{{ new Date(item.date_created || item.createdAt).getFullYear() }}</span>
        </template>

        <template v-slot:item.registeredRisk="{ item }">
          <div v-for="(riskRegister, index) in item.registeredRisk" :key="index" class="text-caption">
            <p class="mb-0">{{ Number(index) + 1 }}. {{ riskRegister.risks_description }}</p>
          </div>
        </template>

        <template v-slot:item.status="{ item }">
          <template v-if="item.status">
            <v-chip
              :color="getStatusColor(item.status.is_approved)"
              size="small"
              label
              class="cursor-pointer"
              @click="item.status.is_approved === 0 ? showValidation(item) : null"
            >
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

        <template v-slot:item.academic="{ item }">
          <v-menu>
            <template v-slot:activator="{ props: menuProps }">
              <span v-bind="menuProps" class="text-primary font-weight-bold cursor-pointer">
                {{ item.academic }}
              </span>
            </template>
            <v-list border density="compact">
              <v-list-item @click="emit('view', item)">
                <v-list-item-title>View Objectives Workspace</v-list-item-title>
              </v-list-item>
              <v-list-item @click="emit('viewPDF', item)">
                <v-list-item-title>Generate PDF Report</v-list-item-title>
              </v-list-item>
              <v-list-item v-if="role === 5" @click="emit('validate', item)">
                <v-list-item-title class="text-success">Validate Report</v-list-item-title>
              </v-list-item>
              <v-list-item v-else @click="emit('removed', item)">
                <v-list-item-title class="text-error">Remove</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="validationAlert.show" max-width="400">
      <v-card rounded="lg" class="pa-4">
        <v-card-title class="px-0 pt-0 text-h6 font-weight-bold">Validation Information</v-card-title>
        <v-card-text class="px-0">
          {{ validationAlert.content?.status?.remarks || 'Objective validation record.' }}
        </v-card-text>
        <v-card-actions class="px-0 pb-0">
          <v-btn v-if="role === 2" color="success" variant="flat" size="small" @click="emit('submit', validationAlert.content)">
            Resubmit
          </v-btn>
          <v-spacer />
          <v-btn variant="text" size="small" @click="validationAlert.show = false">Close</v-btn>
          <v-btn color="primary" size="small" variant="outlined" @click="openRiskView(validationAlert.content)">
            Open Risk
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>