<script setup lang="ts">
import { ref } from 'vue';
import ProfileView from './ProfileView.vue';
import { GeneralController } from '@/stores/GeneralController';
import alertService from '@/services/alertService';

defineProps<{
  accountList: any[];
}>();

const emit = defineEmits<{
  (e: 'refresh'): void;
}>();

const showModal = ref(false);
const content = ref({
  profile: null as any,
  isModalLoading: true
});

const viewProfile = async (accountId: number | string) => {
  showModal.value = true;
  content.value.isModalLoading = true;
  try {
    const response = await GeneralController.retrieveData(
      'account/retrieve-account',
      { account: accountId },
      'profile'
    );
    content.value = {
      profile: response,
      isModalLoading: false
    };
  } catch (error) {
    console.error('Failed to load profile details:', error);
    content.value.isModalLoading = false;
    alertService.error('Failed to load user profile information.');
  }
};

const deactivateUser = async (item: any) => {
  const confirmed = await alertService.confirm(
    `Are you sure you want to deactivate account for ${item.fullname}?`
  );
  if (!confirmed.isConfirmed) return;

  try {
    const formData = new FormData();
    formData.append('account', String(item.id));
    await GeneralController.storeItem('account/deactivate', formData);
    alertService.toast(`Account for ${item.fullname} has been deactivated.`);
    emit('refresh');
  } catch (error) {
    console.error('Failed to deactivate user:', error);
    alertService.error('Deactivation action failed.');
  }
};

const resetPassword = async (item: any) => {
  const confirmed = await alertService.confirm(
    `Send password reset instruction to ${item.email}?`
  );
  if (!confirmed.isConfirmed) return;

  try {
    const formData = new FormData();
    formData.append('account', String(item.id));
    await GeneralController.storeItem('account/reset-password', formData);
    alertService.toast(`Password reset link dispatched to ${item.email}.`);
  } catch (error) {
    console.error('Failed to reset password:', error);
    alertService.error('Failed to send password reset email.');
  }
};
</script>

<template>
  <div>
    <v-list border rounded="lg" class="py-0" aria-label="employee account list">
      <v-list-item v-for="(item, i) in accountList" :key="i" class="py-4 px-6 border-b">
        <template v-slot:prepend>
          <v-avatar size="56" class="mr-4" rounded="md">
            <v-img :src="item.image || '/src/assets/images/users/avatar-1.png'" cover />
          </v-avatar>
        </template>

        <div class="d-flex flex-column">
          <h6 class="text-subtitle-1 font-weight-bold mb-1">{{ item.fullname }}</h6>
          <span class="text-caption text-secondary mb-2">{{ item.email }}</span>

          <div class="d-flex align-center ga-2">
            <v-chip size="x-small" color="primary" variant="flat" label>{{ item.role }}</v-chip>
            <v-chip
              size="x-small"
              :color="item.status === 1 ? 'success' : 'error'"
              variant="tonal"
              label
            >
              {{ item.status === 1 ? 'Active' : 'Deactivated' }}
            </v-chip>
          </div>
        </div>

        <template v-slot:append>
          <v-menu>
            <template v-slot:activator="{ props: menuProps }">
              <v-btn variant="tonal" color="secondary" size="small" v-bind="menuProps">
                Action
              </v-btn>
            </template>
            <v-list border rounded="lg" density="compact" class="py-0">
              <v-list-item @click="viewProfile(item.id)">
                <v-list-item-title>View Profile</v-list-item-title>
              </v-list-item>
              <v-list-item @click="deactivateUser(item)">
                <v-list-item-title class="text-error">Deactivate Account</v-list-item-title>
              </v-list-item>
              <v-list-item @click="resetPassword(item)">
                <v-list-item-title>Reset Password</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-list-item>
    </v-list>

    <ProfileView v-if="content.profile" v-model="showModal" :content="content" />
  </div>
</template>