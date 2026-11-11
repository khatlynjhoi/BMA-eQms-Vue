<script setup lang="ts">
export interface NavGroupItem {
  header?: string;
  [key: string]: any;
}

const props = defineProps<{
  item: NavGroupItem;
}>();
</script>

<template>
  <v-list-subheader
    color="secondary"
    class="text-caption font-weight-bold text-uppercase px-3 mt-4 mb-1 text-medium-emphasis"
  >
    {{ props.item.header }}
  </v-list-subheader>
</template>