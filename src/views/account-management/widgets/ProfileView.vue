<script setup lang="ts">
import { ref } from 'vue';
import CardHeader from '@/components/shared/CardHeader.vue';
import { GeneralController } from '@/stores/GeneralController';
import alertService from '@/services/alertService';

const props = defineProps<{
  modelValue: boolean;
  content: {
    profile: any;
    isModalLoading: boolean;
  };
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const modalTab = ref('one');
const fileError = ref('');
const fileInputRef = ref<HTMLInputElement | null>(null);

const formModalClose = () => {
  emit('update:modelValue', false);
  props.content.isModalLoading = true;
};

const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const handleFile = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  fileError.value = '';

  if (file && file.type.startsWith('image/')) {
    props.content.isModalLoading = true;
    try {
      const formData = new FormData();
      formData.append('account', String(props.content.profile.id));
      formData.append('file', file);
      formData.append('type', 'profile');

      const response: any = await GeneralController.storeItem('account/upload-image', formData);
      if (response?.ok || response?.status === 200) {
        alertService.toast('Profile picture updated successfully.');
      } else {
        fileError.value = 'Failed to upload profile picture.';
      }
    } catch (error) {
      console.error('Image upload error:', error);
      fileError.value = 'An error occurred during image upload.';
    } finally {
      props.content.isModalLoading = false;
    }
  } else {
    fileError.value = 'Please select a valid image file (PNG/JPG).';
  }
};
</script>

<template>
  <v-dialog :model-value="modelValue" @update:model-value="formModalClose" max-width="800">
    <v-card rounded="lg" class="pa-5">
      <v-card-title class="text-h5 d-flex align-center justify-space-between text-primary pa-0 mb-4">
        <span class="font-weight-bold">ACCOUNT INFORMATION (CLAUSE 7.2 COMPETENCE)</span>
        <v-btn color="primary" variant="flat" size="small" @click="formModalClose">Close</v-btn>
      </v-card-title>

      <v-tabs v-model="modalTab" color="primary" class="mb-4 border-b">
        <v-tab value="one" class="font-weight-medium">PROFILE</v-tab>
        <v-tab value="two" class="font-weight-medium">ACCOUNT DETAILS</v-tab>
      </v-tabs>

      <div v-if="content.isModalLoading" class="d-flex flex-column justify-center align-center pa-10">
        <v-progress-circular indeterminate color="primary" size="48" />
        <p class="text-subtitle-1 text-primary font-weight-bold mt-3">Loading Account Details...</p>
      </div>

      <v-window v-else v-model="modalTab">
        <v-window-item value="one">
          <v-row>
            <v-col cols="12" md="4">
              <CardHeader title="Profile Picture">
                <div class="d-flex flex-column justify-center align-center pa-4">
                  <v-avatar size="110" rounded="md" class="mb-4">
                    <v-img :src="content.profile?.image || '/src/assets/images/users/avatar-1.png'" cover />
                  </v-avatar>

                  <input
                    ref="fileInputRef"
                    type="file"
                    accept="image/*"
                    style="display: none"
                    @change="handleFile"
                  />

                  <v-btn color="primary" variant="outlined" size="small" @click="triggerFileInput">
                    Upload New Picture
                  </v-btn>
                  <span v-if="fileError" class="text-caption text-error mt-2">{{ fileError }}</span>
                </div>
              </CardHeader>
            </v-col>

            <v-col cols="12" md="8">
              <CardHeader title="Employee Details">
                <div class="pa-4">
                  <h4 class="text-h6 font-weight-bold mb-1">{{ content.profile?.fullname }}</h4>
                  <p class="text-body-2 text-secondary mb-3">{{ content.profile?.email }}</p>

                  <v-divider class="my-3" />

                  <div class="d-flex flex-column ga-2 text-body-2">
                    <div><strong>Department:</strong> {{ content.profile?.department || 'Unassigned' }}</div>
                    <div><strong>Assigned QMS Role:</strong> {{ content.profile?.role || 'User' }}</div>
                    <div>
                      <strong>Account Status:</strong>
                      <v-chip
                        size="x-small"
                        :color="content.profile?.status === 1 ? 'success' : 'error'"
                        class="ms-2"
                        label
                      >
                        {{ content.profile?.status === 1 ? 'Active' : 'Deactivated' }}
                      </v-chip>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item value="two">
          <div class="pa-4 border rounded bg-grey-lighten-5 text-body-2">
            <p><strong>Account ID:</strong> {{ content.profile?.id }}</p>
            <p><strong>Date Onboarded:</strong> {{ content.profile?.created_at || 'N/A' }}</p>
            <p class="mb-0"><strong>Last Login:</strong> {{ content.profile?.last_login || 'N/A' }}</p>
          </div>
        </v-window-item>
      </v-window>
    </v-card>
  </v-dialog>
</template>