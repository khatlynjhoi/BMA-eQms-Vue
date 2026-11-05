<script setup lang="ts">
defineProps<{
  objectives: any[];
}>();

defineEmits<{
  (e: 'add'): void;
  (e: 'view', id: number | string): void;
}>();
</script>

<template>
  <v-card border elevation="0" rounded="lg">
    <v-card-item class="py-3 px-4 border-b bg-grey-lighten-4">
      <div class="d-flex justify-space-between align-center">
        <span class="text-subtitle-1 font-weight-bold text-primary">OBJECTIVES LIST</span>
        <v-btn icon color="primary" variant="tonal" size="x-small" @click="$emit('add')">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-card-item>

    <v-list v-if="objectives && objectives.length > 0" border="0" density="compact" class="py-0">
      <v-list-item
        v-for="(item, i) in objectives"
        :key="i"
        class="py-3 px-4 border-b cursor-pointer"
        @click="$emit('view', item.id)"
      >
        <v-list-item-title class="text-body-2 font-weight-bold">
          {{ item.quality_objective }}
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <div v-else class="pa-6 text-center text-secondary">
      <p class="text-caption mb-0">No quality objective items created yet.</p>
    </div>
  </v-card>
</template>