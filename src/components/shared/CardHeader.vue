<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<template>
  <v-card variant="outlined" elevation="0" class="bg-surface" rounded="lg">
    <v-card-item class="pa-4 border-b">
      <div class="d-flex justify-space-between align-center">
        <v-card-title class="text-h5 font-weight-bold text-primary">{{ title }}</v-card-title>
        <slot name="header" />
      </div>
    </v-card-item>
    <v-card-text class="pa-0">
      <slot />
    </v-card-text>
  </v-card>
</template>