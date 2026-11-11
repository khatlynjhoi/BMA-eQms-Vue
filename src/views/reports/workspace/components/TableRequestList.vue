<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  data: any[];
  headers?: any[];
  role?: number;
}>();

const emit = defineEmits<{
  (e: 'edit', item: any): void;
  (e: 'view', item: any): void;
  (e: 'removed', item: any): void;
  (e: 'submit', item: any): void;
}>();

const search = ref('');

const defaultHeaders = [
  { title: 'Control Number', key: 'control_number', align: 'start' as const, sortable: true },
  { title: 'Form Name', key: 'form_name', align: 'start' as const, sortable: true },
  { title: 'Status', key: 'status', align: 'start' as const },
  { title: 'Date Created', key: 'created_at', align: 'start' as const, sortable: true }
];

const headersList = computed(() => props.headers || defaultHeaders);

const filteredItems = computed(() => {
  if (!props.data) return [];
  if (!search.value) return props.data;
  const term = search.value.toLowerCase();
  return props.data.filter(
    (item) =>
      item.form_name?.toLowerCase().includes(term) ||
      item.control_number?.toLowerCase().includes(term)
  );
});

const convertDate = (current: string) => {
  if (!current) return 'N/A';
  try {
    return new Date(current).toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric'
    });
  } catch {
    return current;
  }
};
</script>

<template>
  <v-container fluid class="pa-0">
    <v-toolbar flat color="transparent" class="d-flex justify-space-between align-center mb-4">
      <v-toolbar-title class="text-h6 font-weight-bold px-0">
        LIST OF REQUESTS (CLAUSE 7.5)
      </v-toolbar-title>

      <v-text-field
        v-model="search"
        placeholder="Search requests..."
        variant="outlined"
        density="compact"
        hide-details
        prepend-inner-icon="mdi-magnify"
        style="max-width: 250px"
      />
    </v-toolbar>

    <v-card border elevation="0" rounded="lg">
      <v-data-table
        :items="filteredItems"
        :headers="headersList"
        class="elevation-0 text-body-2"
      >
        <template #item.created_at="{ item }">
          <span>{{ convertDate(item.raw.created_at) }}</span>
        </template>

        <template #item.status="{ item }">
          <template v-if="item.raw.status !== null && item.raw.status !== undefined">
            <v-chip color="success" size="small" label @click="emit('view', item.raw)">
              View Report
            </v-chip>
          </template>
          <template v-else>
            <v-chip color="secondary" size="small" label>Draft</v-chip>
            <v-btn size="x-small" color="primary" variant="flat" class="ms-2" @click="emit('submit', item.raw)">
              Submit
            </v-btn>
          </template>
        </template>

        <template #item.form_name="{ item }">
          <v-menu>
            <template #activator="{ props: menuProps }">
              <span v-bind="menuProps" class="text-primary font-weight-bold cursor-pointer">
                {{ item.raw.form_name }}
              </span>
            </template>
            <v-list border density="compact">
              <v-list-item @click="emit('view', item.raw)">
                <v-list-item-title>View Document</v-list-item-title>
              </v-list-item>
              <v-list-item @click="emit('edit', item.raw)">
                <v-list-item-title class="text-info">Edit Response</v-list-item-title>
              </v-list-item>
              <v-list-item @click="emit('removed', item.raw)">
                <v-list-item-title class="text-error">Remove Request</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>