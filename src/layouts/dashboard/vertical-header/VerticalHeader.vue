<script setup lang="ts">
import { ref, watch } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import { useCustomizerStore } from '@/stores/customizer';

import NotificationDD from './NotificationDD.vue';
import ProfileDD from './ProfileDD.vue';
import Searchbar from './SearchBarPanel.vue';

const customizer = useCustomizerStore();
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);

watch(priority, (newPriority) => {
  priority.value = newPriority;
});

let storedProfile: any = null;

try {
  const userData = localStorage.getItem('user');
  storedProfile = userData ? JSON.parse(userData) : null;
} catch (error) {
  console.error('Failed to parse user data from localStorage:', error);
  storedProfile = null;
}

const profile = {
  name: storedProfile?.name || 'QMS Process Owner',
  role: storedProfile?.role || 'Department Staff',
  image: storedProfile?.image || '@/assets/images/users/avatar-6.png'
};
</script>

<template>
  <v-app-bar elevation="0" :priority="priority" height="74" class="px-sm-10 px-5">
    <v-btn
      class="hidden-md-and-down mr-5 ml-0"
      color="secondary"
      icon
      aria-label="Toggle Sidebar"
      rounded="sm"
      variant="tonal"
      @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
    >
      <SvgSprite name="custom-menu-outline" style="width: 24px; height: 24px" />
    </v-btn>

    <v-btn
      class="hidden-lg-and-up text-secondary"
      color="darkText"
      icon
      rounded="sm"
      variant="text"
      size="small"
      aria-label="Open Sidebar"
      @click.stop="customizer.SET_SIDEBAR_DRAWER"
    >
      <SvgSprite name="custom-menu-outline" style="width: 24px; height: 24px" />
    </v-btn>

    <!-- Mobile Search Dialog -->
    <v-menu :close-on-content-click="false" class="hidden-lg-and-up" offset="10, 0">
      <template #activator="{ props: menuProps }">
        <v-btn
          class="hidden-lg-and-up ml-1"
          color="secondary"
          icon
          rounded="sm"
          variant="text"
          size="small"
          v-bind="menuProps"
        >
          <div class="text-lightText d-flex align-center">
            <SvgSprite name="custom-search" style="width: 16px; height: 16px" />
          </div>
        </v-btn>
      </template>
      <v-sheet class="search-sheet v-col-12 pa-0" elevation="24" width="320" rounded="md">
        <v-text-field
          persistent-placeholder
          placeholder="Search e-QMS..."
          rounded="md"
          color="primary"
          variant="solo"
          hide-details
        >
          <template #prepend-inner>
            <div class="text-lightText d-flex align-center">
              <SvgSprite name="custom-search" style="width: 16px; height: 16px" />
            </div>
          </template>
        </v-text-field>
      </v-sheet>
    </v-menu>

    <!-- Desktop Search -->
    <v-sheet color="transparent" class="d-none d-lg-block" width="280">
      <Searchbar />
    </v-sheet>

    <v-spacer />

    <!-- Right Header Actions -->
    <NotificationDD />

    <v-menu :close-on-content-click="false" offset="8, 0">
      <template #activator="{ props: profileProps }">
        <v-btn class="profileBtn mr-0 ml-2" aria-label="Profile" variant="text" rounded="circle" icon v-bind="profileProps">
          <v-avatar class="py-1" size="40" rounded="circle">
            <img :src="profile.image" class="rounded-circle" alt="User Profile" />
          </v-avatar>
        </v-btn>
      </template>
      <v-sheet rounded="md" width="300">
        <ProfileDD :profile="profile" />
      </v-sheet>
    </v-menu>
  </v-app-bar>
</template>