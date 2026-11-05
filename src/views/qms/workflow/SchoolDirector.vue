<script setup lang="ts">
import { ref, onMounted } from 'vue';
import alertService from '@/services/alertService';

const pendingForms = ref<any[]>([]);

onMounted(() => {
  pendingForms.value = [
    { id: 3, title: 'Procedure C - Maritime Operations Manual', requestedBy: 'Capt. Smith', date: '2026-11-01' }
  ];
});

const review = (id: number | string) => {
  alertService.toast(`Opening executive review for proposal #${id}`);
};
</script>

<template>
  <v-card border elevation="0" rounded="lg" class="pa-4">
    <v-card-title class="px-0 pt-0 text-h6 font-weight-bold mb-3">
      Executive Sign-off: Pending Approvals (Clause 5.1 & 6.3)
    </v-card-title>

    <v-list v-if="pendingForms.length > 0" border rounded class="py-0">
      <v-list-item v-for="form in pendingForms" :key="form.id" class="py-3 px-4 border-b">
        <div class="d-flex justify-space-between align-center">
          <div>
            <h4 class="text-subtitle-1 font-weight-bold mb-0">{{ form.title }}</h4>
            <span class="text-caption text-secondary">Requested by: {{ form.requestedBy }} | {{ form.date }}</span>
          </div>
          <v-btn color="primary" variant="flat" size="small" @click="review(form.id)">
            Review Proposal
          </v-btn>
        </div>
      </v-list-item>
    </v-list>

    <div v-else class="text-center py-8 text-secondary">
      <v-icon size="40" class="mb-2">mdi-check-decagram-outline</v-icon>
      <p class="text-body-1 mb-0">No pending executive authorizations required.</p>
    </div>
  </v-card>
</template>