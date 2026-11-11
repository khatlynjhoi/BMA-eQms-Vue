<script setup lang="ts">

interface Props {
  icon: string;
  title: string;
  to: string | Record<string, any>;
}

defineProps<Props>();
</script>

<template>
  <v-card variant="outlined" elevation="0" class="bg-surface tile-card" rounded="lg">
    <router-link :to="to" class="tile-link">
      <v-card-text class="d-flex align-center pa-4">
        <v-avatar variant="tonal" color="primary" rounded="md" class="me-4">
          <v-icon size="24">{{ icon }}</v-icon>
        </v-avatar>
        <h6 class="text-subtitle-1 font-weight-bold text-primary mb-0">{{ title }}</h6>
      </v-card-text>
    </router-link>
  </v-card>
</template>

<style scoped lang="scss">
.tile-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
  }
}

.tile-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
</style>