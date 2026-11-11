<script setup lang="ts">
defineProps<{
  title?: string;
  version?: string;
  details?: any[];
}>();
</script>

<template>
  <v-card variant="outlined" elevation="0" class="bg-surface" rounded="lg">
    <v-card-item>
      <div class="d-flex justify-space-between align-center">
        <div class="text-left">
          <v-card-title class="text-h4 font-weight-bold text-primary">
            {{ title || 'Procedure Specification' }}
          </v-card-title>
          <span class="text-subtitle-2 text-secondary font-weight-bold">{{ version }}</span>
        </div>
        <div>
          <v-btn v-if="details && details.length > 0" color="primary" variant="flat" rounded="md" size="small">
            View Specification
          </v-btn>
        </div>
      </div>
    </v-card-item>
    <v-divider />
    <v-card-text class="pa-0">
      <slot />
    </v-card-text>
  </v-card>
</template>