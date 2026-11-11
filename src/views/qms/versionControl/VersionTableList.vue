<script setup lang="ts">
export interface RevisionItem {
  id?: number | string;
  formName?: string;
  updatedBy?: string;
  updatedAt?: string;
  updated_at?: string;
  description?: string;
  [key: string]: any;
}

withDefaults(
  defineProps<{
    headers?: Array<{ title: string; key: string; sortable?: boolean; align?: 'start' | 'center' | 'end' }>;
    revisions: RevisionItem[];
  }>(),
  {
    headers: () => [
      { title: 'Form / Procedure', key: 'formName', sortable: true },
      { title: 'Updated By', key: 'updatedBy', sortable: true },
      { title: 'Timestamp', key: 'updatedAt', sortable: true },
      { title: 'Description of Change (Clause 6.3)', key: 'description' }
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
      class="elevation-0 text-body-2"
    >
      <template #top>
        <v-toolbar flat color="transparent" class="px-4">
          <v-toolbar-title class="text-h6 font-weight-bold">
            Revision Audit History (Clause 7.5.3)
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template #item.updatedAt="{ item }">
        <span>{{ formatDate(item.updatedAt || item.updated_at || '') }}</span>
      </template>
    </v-data-table>
  </v-card>
</template>