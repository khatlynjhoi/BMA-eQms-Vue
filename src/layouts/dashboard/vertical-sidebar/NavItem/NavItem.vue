<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';

export interface MenuItem {
  title: string;
  icon?: string;
  to?: string;
  type?: string;
  getURL?: boolean;
  disabled?: boolean;
  subCaption?: string;
  chip?: string;
  chipColor?: string;
  chipVariant?: 'flat' | 'text' | 'outlined' | 'tonal';
  chipIcon?: string;
}

const props = withDefaults(
  defineProps<{
    item: MenuItem;
    level?: number;
  }>(),
  {
    level: 0
  }
);

const relativeURL = ref('');

onMounted(() => {
  try {
    relativeURL.value = import.meta.env.BASE_URL || '';
  } catch (error) {
    console.error('Error fetching BASE_URL:', error);
  }
});
</script>

<template>
  <!-- Single Item with Base URL Prepend -->
  <v-list-item
    v-if="props.item.getURL === true"
    :to="item.type === 'external' ? undefined : item.to"
    :href="`${relativeURL}${item.to}`"
    rounded="lg"
    color="primary"
    :disabled="item.disabled"
    :target="item.type === 'external' ? '_blank' : undefined"
    class="mb-1"
  >
    <template #prepend>
      <SvgSprite :name="props.item.icon || ''" :level="props.level" />
    </template>

    <v-list-item-title class="text-body-2 font-weight-medium">{{ item.title }}</v-list-item-title>

    <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-0 hide-menu">
      {{ item.subCaption }}
    </v-list-item-subtitle>

    <template #append v-if="item.chip">
      <v-chip
        :color="item.chipColor || 'primary'"
        class="sidebarchip hide-menu font-weight-bold"
        size="x-small"
        :variant="item.chipVariant || 'tonal'"
        :prepend-icon="item.chipIcon"
      >
        {{ item.chip }}
      </v-chip>
    </template>
  </v-list-item>

  <!-- Standard Single Item -->
  <v-list-item
    v-else
    :to="item.type === 'external' ? undefined : item.to"
    :href="item.type === 'external' ? item.to : undefined"
    rounded="lg"
    color="primary"
    :disabled="item.disabled"
    :target="item.type === 'external' ? '_blank' : undefined"
    class="mb-1"
  >
    <template #prepend>
      <SvgSprite :name="props.item.icon || ''" :level="props.level" />
    </template>

    <v-list-item-title class="text-body-2 font-weight-medium">{{ item.title }}</v-list-item-title>

    <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-0 hide-menu">
      {{ item.subCaption }}
    </v-list-item-subtitle>

    <template #append v-if="item.chip">
      <v-chip
        :color="item.chipColor || 'primary'"
        class="sidebarchip hide-menu font-weight-bold"
        size="x-small"
        :variant="item.chipVariant || 'tonal'"
        :prepend-icon="item.chipIcon"
      >
        {{ item.chip }}
      </v-chip>
    </template>
  </v-list-item>
</template>