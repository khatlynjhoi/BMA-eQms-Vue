<script setup lang="ts">
import { ref } from 'vue';
import sidebarItems, { type Menu } from './sidebarItem';

const sidebarMenu = ref<Menu[]>(sidebarItems);
const openGroups = ref<string[]>(['CLAUSE 6: PLANNING, RISKS & CHANGES']);
</script>

<template>
  <v-navigation-drawer
    left
    elevation="0"
    app
    class="leftSidebar"
    width="280"
  >
    <!-- Brand Header -->
    <div class="pa-5 d-flex align-center ga-3 border-b">
      <v-avatar color="primary" variant="tonal" size="42" rounded="md">
        <v-icon icon="tabler-anchor" size="26" color="primary"></v-icon>
      </v-avatar>
      <div>
        <h3 class="text-subtitle-1 font-weight-bold text-primary lh-normal mb-0">BALIWAG MARITIME</h3>
        <span class="text-caption text-secondary font-weight-bold">e-QMS PORTAL (ISO 9001:2026)</span>
      </div>
    </div>

    <!-- Navigation List -->
    <v-list v-model:opened="openGroups" class="px-3 py-2" nav density="compact">
      <template v-for="(item, i) in sidebarMenu" :key="i">
        <!-- Sub Header Category -->
        <v-list-subheader
          v-if="item.header"
          class="text-caption font-weight-bold text-uppercase px-3 mt-4 mb-1 text-medium-emphasis"
        >
          {{ item.header }}
        </v-list-subheader>

        <!-- Collapsible Submenu Group -->
        <v-list-group v-else-if="item.children" :value="item.title">
          <template #activator="{ props: groupProps }">
            <v-list-item
              v-bind="groupProps"
              :prepend-icon="item.icon"
              :title="item.title"
              rounded="lg"
              class="mb-1"
            />
          </template>

          <v-list-item
            v-for="(child, cIndex) in item.children"
            :key="cIndex"
            :to="child.to"
            :title="child.title"
            :prepend-icon="child.icon"
            rounded="lg"
            class="mb-1 ml-3"
            color="primary"
          >
            <template #append v-if="child.chip">
              <v-chip
                :color="child.chipColor || 'primary'"
                :variant="child.chipVariant || 'tonal'"
                size="x-small"
                class="font-weight-bold"
              >
                {{ child.chip }}
              </v-chip>
            </template>
          </v-list-item>
        </v-list-group>

        <!-- Single Nav Item -->
        <v-list-item
          v-else
          :to="item.to"
          :title="item.title"
          :prepend-icon="item.icon"
          rounded="lg"
          class="mb-1"
          color="primary"
        >
          <template #append v-if="item.chip">
            <v-chip
              :color="item.chipColor || 'primary'"
              :variant="item.chipVariant || 'tonal'"
              size="x-small"
              class="font-weight-bold"
            >
              {{ item.chip }}
            </v-chip>
          </template>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>