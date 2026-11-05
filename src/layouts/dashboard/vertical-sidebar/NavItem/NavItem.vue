<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';

const props = defineProps({ 
  item: { type: Object, required: true }, 
  level: { type: Number, default: 0 } 
});

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
  <!-- Single Item with Base URL prepend -->
  <v-list-item
    v-if="props.item.getURL === true"
    :to="item.type === 'external' ? '' : item.to"
    :href="`${relativeURL}${item.to}`"
    rounded
    color="primary"
    :disabled="item.disabled"
    :target="item.type === 'external' ? '_blank' : ''"
  >
    <template v-slot:prepend>
      <SvgSprite :name="props.item.icon || ''" :level="props.level" />
    </template>
    <v-list-item-title>{{ item.title }}</v-list-item-title>
    
    <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-0 hide-menu">
      {{ item.subCaption }}
    </v-list-item-subtitle>
    
    <template v-slot:append v-if="item.chip">
      <v-chip 
        :color="item.chipColor" 
        class="sidebarchip hide-menu" 
        size="x-small" 
        :variant="item.chipVariant" 
        :prepend-icon="item.chipIcon"
      >
        {{ item.chip }}
      </v-chip>
    </template>
  </v-list-item>

  <!-- Standard Single Item -->
  <v-list-item
    v-else
    :to="item.type === 'external' ? '' : item.to"
    :href="item.type === 'external' ? item.to : ''"
    rounded
    color="primary"
    :disabled="item.disabled"
    :target="item.type === 'external' ? '_blank' : ''"
  >
    <template v-slot:prepend>
      <SvgSprite :name="props.item.icon || ''" :level="props.level" />
    </template>
    <v-list-item-title>{{ item.title }}</v-list-item-title>
    
    <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-0 hide-menu">
      {{ item.subCaption }}
    </v-list-item-subtitle>
    
    <template v-slot:append v-if="item.chip">
      <v-chip 
        :color="item.chipColor" 
        class="sidebarchip hide-menu" 
        size="x-small" 
        :variant="item.chipVariant" 
        :prepend-icon="item.chipIcon"
      >
        {{ item.chip }}
      </v-chip>
    </template>
  </v-list-item>
</template>