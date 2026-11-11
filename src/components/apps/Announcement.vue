<script setup lang="ts">
import UiParentCard from './shared/UiParentCard.vue';

interface Props {
  title: string;
  date: string;
  description: string;
  link?: string | Record<string, any> | null;
  linkText?: string;
}

withDefaults(defineProps<Props>(), {
  link: null,
  linkText: 'View Details'
});
</script>

<template>
  <v-col cols="12">
    <UiParentCard :title="title">
      <div class="text-right mb-2">
        <span class="text-caption text-secondary">{{ date }}</span>
      </div>

      <p class="text-body-1 mb-4">{{ description }}</p>

      <div v-if="link" class="text-right">
        <v-btn
          :to="link"
          color="primary"
          variant="text"
          size="small"
          class="font-weight-bold"
        >
          {{ linkText }} <v-icon class="ms-1">mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </UiParentCard>
  </v-col>
</template>