<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

export interface BreadcrumbItem {
  title: string;
  disabled: boolean;
  href: string;
}

const page = ref({ title: 'QMS Workspace Starter' });
const breadcrumbs = shallowRef<BreadcrumbItem[]>([
  {
    title: 'e-QMS Workspace',
    disabled: false,
    href: '/dashboard/default'
  },
  {
    title: 'Standard Starter Page',
    disabled: true,
    href: '#'
  }
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />
  
  <v-row>
    <v-col cols="12">
      <UiParentCard title="ISO 9001:2026 Clause Workspace Template">
        <div class="pa-2">
          <h4 class="text-h6 font-weight-bold text-primary mb-2">
            Baliwag Maritime Academy — Quality Management System
          </h4>
          <p class="text-body-1 text-secondary mb-4">
            This starter view serves as the foundation for scaffolding custom process workspaces, departmental audit logs, and ISO 9001:2026 compliance reporting views.
          </p>

          <v-alert color="primary" variant="tonal" border="start" class="mb-4">
            <div class="d-flex align-center">
              <v-icon class="mr-2">mdi-information-outline</v-icon>
              <span class="text-subtitle-2 font-weight-medium">
                Clause Alignment: Ensure all new components register relevant document control headers and process owner authorities (Clause 5.3 & Clause 7.5).
              </span>
            </div>
          </v-alert>
        </div>
      </UiParentCard>
    </v-col>
  </v-row>
</template>