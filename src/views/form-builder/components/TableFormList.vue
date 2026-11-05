<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  data: any[];
  headers?: any[];
  role?: number;
}>();

const emit = defineEmits(['edit', 'preview', 'export']);

const search = ref('');

const defaultHeaders = [
  { title: 'Form Name', key: 'form_name', sortable: true },
  { title: 'Form Code', key: 'form_code', sortable: true },
  { title: 'Version', key: 'version', align: 'center' as const },
  { title: 'Actions', key: 'action', align: 'end' as const, sortable: false }
];

const headersList = computed(() => props.headers || defaultHeaders);

const filteredItems = computed(() => {
  if (!props.data) return [];
  if (!search.value) return props.data;
  const term = search.value.toLowerCase();
  return props.data.filter((item) => item.form_name?.toLowerCase().includes(term) || item.form_code?.toLowerCase().includes(term));
});
</script>

<template>
  <v-container fluid class="pa-0">
    <v-toolbar flat color="transparent" class="mb-4">
      <v-toolbar-title class="text-h6 font-weight-bold px-0">
        Fillable QMS Forms Library
      </v-toolbar-title>
      <v-spacer />
      <v-text-field
        v-model="search"
        placeholder="Search forms by code or title..."
        variant="outlined"
        density="compact"
        hide-details
        prepend-inner-icon="mdi-magnify"
        style="max-width: 300px"
      />
    </v-toolbar>

    <v-card border elevation="0">
      <v-data-table
        :items="filteredItems"
        :headers="headersList"
        :search="search"
        class="elevation-0"
      >
        <template v-slot:item.action="{ item }">
          <v-btn color="info" size="small" variant="tonal" class="mr-2" @click="emit('edit', item.id)">
            Edit
          </v-btn>
          <v-btn color="success" size="small" variant="tonal" class="mr-2" @click="emit('preview', item.id)">
            Preview
          </v-btn>
          <v-btn color="secondary" size="small" variant="outlined" @click="emit('export', item)">
            Export
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>