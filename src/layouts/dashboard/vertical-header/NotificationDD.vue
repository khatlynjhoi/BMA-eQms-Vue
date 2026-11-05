<script setup lang="ts">
import SvgSprite from '@/components/shared/SvgSprite.vue';
import { ref } from 'vue';

const notifications = ref([
  {
    id: '1',
    title: 'Document Amendment Pending Approval',
    subtitle: 'Academic Program Procedure v2.1 requires review',
    time: '10 min ago',
    icon: 'custom-document-text-outline',
    color: 'warning'
  },
  {
    id: '2',
    title: 'ISO 9001 Internal Audit Scheduled',
    subtitle: 'Maritime Simulator Center audit opens next week',
    time: '2 hours ago',
    icon: 'custom-clipboard-outline',
    color: 'primary'
  },
  {
    id: '3',
    title: '2026 Risk Assessment Submitted',
    subtitle: 'ICT Department logged a new operational risk entry',
    time: '1 day ago',
    icon: 'custom-warning-outline',
    color: 'info'
  }
]);
</script>

<template>
  <v-menu :close-on-content-click="false" offset="6, 0">
    <template v-slot:activator="{ props }">
      <v-btn icon class="text-secondary ml-sm-2 ml-1" color="secondary" rounded="sm" v-bind="props">
        <v-badge color="error" :content="notifications.length" offset-x="-2" offset-y="-2">
          <SvgSprite name="custom-notification" />
        </v-badge>
      </v-btn>
    </template>
    <v-sheet rounded="md" width="420" class="notification-dropdown py-6">
      <div class="d-flex align-center justify-space-between pb-4 px-6">
        <h5 class="text-h5 mb-0">e-QMS Notifications</h5>
        <a href="#" class="text-primary link-hover text-h6">Mark all read</a>
      </div>
      <perfect-scrollbar style="height: calc(100vh - 300px); max-height: 430px">
        <v-list class="py-0 px-6" lines="two" aria-label="notification list">
          <v-list-item
            v-for="item in notifications"
            :key="item.id"
            :value="item.id"
            color="secondary"
            class="no-spacer py-3 mb-2 px-3"
            rounded="md"
          >
            <template v-slot:prepend>
              <v-avatar size="36" variant="tonal" :color="item.color" class="mr-3">
                <SvgSprite :name="item.icon" style="width: 18px; height: 18px" />
              </v-avatar>
            </template>
            <div class="d-inline-flex justify-space-between w-100">
              <h6 class="text-h6 text-lightText mb-0">{{ item.title }}</h6>
            </div>
            <p class="text-caption text-lightText my-0">{{ item.subtitle }}</p>
            <span class="text-caption text-disabled">{{ item.time }}</span>
          </v-list-item>
        </v-list>
      </perfect-scrollbar>
    </v-sheet>
  </v-menu>
</template>