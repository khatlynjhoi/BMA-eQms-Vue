<script setup lang="ts">
import { ref } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import { useAuthStore } from '@/stores/auth';

defineProps<{
  profile?: {
    name?: string;
    role?: string;
    image?: string;
  };
}>();

const tab = ref('profile');
const authStore = useAuthStore();

const qmsProfileLinks = ref([
  { title: 'My Department & QMS Profile', icon: 'custom-user-1', to: '/profile' },
  { title: 'Pending Clause Verification Tasks', icon: 'custom-send-outline', to: '/tasks' },
  { title: 'Assigned Internal Auditor Roles', icon: 'custom-shield-outline', to: '/audits' }
]);

const qmsSettingsLinks = ref([
  { title: 'Ethics & Misconduct Reporting Channel', icon: 'custom-lock', to: '/context/quality-policy' },
  { title: 'Notification Preferences', icon: 'custom-setting-fill', to: '/settings' }
]);
</script>

<template>
  <div>
    <div class="d-flex align-center pa-5">
      <v-avatar size="40" class="mr-3">
        <img :src="profile?.image || '@/assets/images/users/avatar-6.png'" width="40" alt="User Profile" />
      </v-avatar>
      <div>
        <h6 class="text-subtitle-1 font-weight-bold mb-0">{{ profile?.name || 'QMS User' }}</h6>
        <p class="text-caption text-secondary mb-0">{{ profile?.role || 'Process Owner' }}</p>
      </div>
      <div class="ml-auto">
        <v-btn
          variant="text"
          aria-label="Logout"
          color="error"
          rounded="sm"
          icon
          size="large"
          @click="authStore.logout()"
        >
          <SvgSprite name="custom-logout-1" />
        </v-btn>
      </div>
    </div>

    <v-tabs v-model="tab" color="primary" grow>
      <v-tab value="profile">Profile</v-tab>
      <v-tab value="settings">Settings</v-tab>
    </v-tabs>
    <v-divider />

    <perfect-scrollbar style="height: calc(100vh - 300px); max-height: 240px">
      <v-window v-model="tab">
        <v-window-item value="profile">
          <v-list class="px-2" aria-label="QMS Profile List">
            <v-list-item
              v-for="(item, index) in qmsProfileLinks"
              :key="index"
              :to="item.to"
              color="primary"
              rounded="md"
              class="mb-1"
            >
              <template #prepend>
                <div class="mr-4">
                  <SvgSprite :name="item.icon" style="width: 18px; height: 18px" />
                </div>
              </template>
              <v-list-item-title class="text-body-2 font-weight-medium">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-window-item>

        <v-window-item value="settings">
          <v-list class="px-2" aria-label="QMS Settings List">
            <v-list-item
              v-for="(item, index) in qmsSettingsLinks"
              :key="index"
              :to="item.to"
              color="primary"
              rounded="md"
              class="mb-1"
            >
              <template #prepend>
                <div class="mr-4">
                  <SvgSprite :name="item.icon" style="width: 18px; height: 18px" />
                </div>
              </template>
              <v-list-item-title class="text-body-2 font-weight-medium">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-window-item>
      </v-window>
    </perfect-scrollbar>
  </div>
</template>