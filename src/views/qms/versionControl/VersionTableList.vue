<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    headers?: any[];
    revisions: any[];
  }>(),
  {
    headers: () => [
      { title: 'Form / Procedure', key: 'formName', sortable: true },
      { title: 'Updated By', key: 'updatedBy', sortable: true },
      { title: 'Timestamp', key: 'updatedAt', sortable: true },
      { title: 'Description of Change', key: 'description' }
    ]
  }
);

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleString();
  } catch {
    return dateString;
  }
};
</script>

<template>
  <v-card border elevation="0" rounded="lg">
    <v-data-table
      :headers="headers"
      :items="revisions"
      class="elevation-0"
    >
      <template v-slot:top>
        <v-toolbar flat color="transparent" class="px-4">
          <v-toolbar-title class="text-h6 font-weight-bold">Revision Audit History</v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:item.updatedAt="{ item }">
        {{ formatDate(item.updatedAt || item.updated_at) }}
      </template>
    </v-data-table>
  </v-card>
</template>