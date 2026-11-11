<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<template>
  <v-card variant="outlined" elevation="0" class="bg-surface mb-4" rounded="lg">
    <v-card-item class="pa-4 border-b">
      <div class="d-sm-flex align-center justify-space-between">
        <v-card-title class="text-subtitle-1 font-weight-bold text-primary mb-0">
          {{ title }}
        </v-card-title>
        <slot name="action" />
      </div>
    </v-card-item>
    <v-card-text class="pa-4">
      <slot />
    </v-card-text>
  </v-card>
</template>