<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  data: any[];
  headers?: any[];
}>();

const emit = defineEmits<{
  (e: 'add'): void;
  (e: 'edit', item: any): void;
  (e: 'removed', item: any): void;
}>();

const search = ref('');

const defaultHeaders = [
  { title: 'Action', key: 'actionBtn', align: 'start' as const, sortable: false },
  { title: 'Hazards / Risks Description', key: 'risks_description', align: 'start' as const },
  { title: 'Existing Control Measures', key: 'control_measures', align: 'start' as const },
  { title: 'Consequence', key: 'consequence', align: 'start' as const },
  { title: 'Likelihood', key: 'likelihood', align: 'start' as const },
  { title: 'Target Group at Risk', key: 'who_at_risk', align: 'start' as const }
];

const headersList = computed(() => props.headers || defaultHeaders);

const filteredData = computed(() => {
  if (!props.data) return [];
  if (!search.value) return props.data;
  const term = search.value.toLowerCase();
  return props.data.filter(
    (item) =>
      item.risks_description?.toLowerCase().includes(term) ||
      item.control_measures?.toLowerCase().includes(term)
  );
});
</script>

<template>
  <v-container fluid class="pa-0">
    <v-toolbar flat color="transparent" class="d-flex justify-space-between align-center mb-4">
      <v-toolbar-title class="text-h6 font-weight-bold px-0">
        REGISTERED HAZARD & RISK LINES
      </v-toolbar-title>

      <div class="d-flex align-center">
        <v-text-field
          v-model="search"
          placeholder="Search risks..."
          variant="outlined"
          density="compact"
          hide-details
          prepend-inner-icon="mdi-magnify"
          style="width: 250px"
          class="mr-3"
        />

        <v-btn color="primary" variant="flat" size="small" @click="emit('add')">
          <v-icon class="mr-1">mdi-plus</v-icon> Add Hazard Line
        </v-btn>
      </div>
    </v-toolbar>

    <v-card border elevation="0" rounded="lg">
      <v-data-table
        :items="filteredData"
        :headers="headersList"
        :search="search"
        class="elevation-0 text-body-2"
      >
        <template #item.actionBtn="{ item }">
          <v-menu>
            <template #activator="{ props: menuProps }">
              <v-btn variant="tonal" color="primary" size="small" v-bind="menuProps">
                Action
              </v-btn>
            </template>
            <v-list border density="compact">
              <v-list-item @click="emit('edit', item)">
                <v-list-item-title class="text-info">Edit Line</v-list-item-title>
              </v-list-item>
              <v-list-item @click="emit('removed', item)">
                <v-list-item-title class="text-error">Remove</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>