<script lang="ts">
import { defineComponent, ref } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import { useAuthStore } from '@/stores/auth';

export default defineComponent({
  components: { SvgSprite },
  props: {
    profile: {
      type: Object as () => { name?: string; role?: string; image?: string },
      default: () => ({}),
    },
  },
  setup() {
    const tab = ref('111');
    const authStore = useAuthStore();

    const qmsProfileLinks = ref([
      { title: 'My Account & Department', icon: 'custom-user-1' },
      { title: 'My Pending Submissions', icon: 'custom-send-outline' },
      { title: 'Assigned Audit Roles', icon: 'custom-shield-outline' }
    ]);

    const qmsSettingsLinks = ref([
      { title: 'System Security (HTTPS/SSL)', icon: 'custom-lock' },
      { title: 'Notification Preferences', icon: 'custom-setting-fill' }
    ]);

    return { tab, authStore, qmsProfileLinks, qmsSettingsLinks };
  },
});
</script>

<template>
  <div>
    <div class="d-flex align-center pa-5">
      <v-avatar size="40" class="mr-2">
        <img :src="profile.image" width="40" alt="profile" />
      </v-avatar>
      <div>
        <h6 class="text-subtitle-1 mb-0">{{ profile.name }}</h6>
        <p class="text-caption text-lightText mb-0">{{ profile.role }}</p>
      </div>
      <div class="ml-auto">
        <v-btn variant="text" aria-label="logout" color="error" rounded="sm" icon size="large" @click="authStore.logout()">
          <SvgSprite name="custom-logout-1" />
        </v-btn>
      </div>
    </div>
    <v-tabs v-model="tab" color="primary" grow>
      <v-tab value="111">Profile</v-tab>
      <v-tab value="222">Settings</v-tab>
    </v-tabs>
    <v-divider></v-divider>
    <perfect-scrollbar style="height: calc(100vh - 300px); max-height: 240px">
      <v-window v-model="tab">
        <v-window-item value="111">
          <v-list class="px-2" aria-label="profile list">
            <v-list-item v-for="(item, index) in qmsProfileLinks" :key="index" color="primary" rounded="md" class="mb-1">
              <template v-slot:prepend>
                <div class="mr-4">
                  <SvgSprite :name="item.icon" style="width: 18px; height: 18px" />
                </div>
              </template>
              <v-list-item-title class="text-h6">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-window-item>
        <v-window-item value="222">
          <v-list class="px-2" aria-label="settings list">
            <v-list-item v-for="(item, index) in qmsSettingsLinks" :key="index" color="primary" rounded="md" class="mb-1">
              <template v-slot:prepend>
                <div class="mr-4">
                  <SvgSprite :name="item.icon" style="width: 18px; height: 18px" />
                </div>
              </template>
              <v-list-item-title class="text-h6">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-window-item>
      </v-window>
    </perfect-scrollbar>
  </div>
</template>