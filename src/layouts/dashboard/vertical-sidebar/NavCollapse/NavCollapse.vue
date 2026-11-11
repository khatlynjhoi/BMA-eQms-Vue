<script setup lang="ts">
import SvgSprite from '@/components/shared/SvgSprite.vue';
import NavItem from '../NavItem/NavItem.vue';

export interface NavCollapseItem {
  title: string;
  icon?: string;
  subCaption?: string;
  children?: NavCollapseItem[];
  [key: string]: any;
}

const props = withDefaults(
  defineProps<{
    item: NavCollapseItem;
    level?: number;
  }>(),
  {
    level: 0
  }
);
</script>

<template>
  <v-list-group :value="item.title">
    <template #activator="{ props: activatorProps }">
      <v-list-item v-bind="activatorProps" rounded="lg" color="primary" class="mb-1">
        <template #prepend>
          <SvgSprite :name="item.icon || ''" :level="level" />
        </template>

        <v-list-item-title class="mr-auto text-body-2 font-weight-medium">
          {{ item.title }}
        </v-list-item-title>

        <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-0 hide-menu">
          {{ item.subCaption }}
        </v-list-item-subtitle>
      </v-list-item>
    </template>

    <template v-for="(subitem, i) in item.children" :key="i">
      <NavCollapse v-if="subitem.children" :item="subitem" :level="props.level + 1" />
      <NavItem v-else :item="subitem" :level="props.level + 1" />
    </template>
  </v-list-group>
</template>