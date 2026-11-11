<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import alertService from '@/services/alertService';

const router = useRouter();
const logform = ref<any>(null);
const email = ref('');
const loading = ref(false);

const emailRules = [
  (v: string) => !!v || 'Institutional email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
];

const handlePasswordReset = async (): Promise<void> => {
  const { valid } = await logform.value.validate();
  if (!valid) return;

  loading.value = true;
  try {
    alertService.toast('Password reset instructions sent to your email.');
    await router.push('/login');
  } catch (error) {
    alertService.error('Failed to send reset instructions. Please check your email.');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-form ref="logform" @submit.prevent="handlePasswordReset" class="mt-4">
    <div class="mb-4">
      <v-label class="font-weight-medium mb-1">Institutional Email</v-label>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        placeholder="user@bma.edu.ph"
        density="comfortable"
        variant="outlined"
        color="primary"
        hide-details="auto"
        required
      />
    </div>

    <p class="text-caption text-secondary mb-4">
      Please check your SPAM folder if you do not receive the link within a few minutes.
    </p>

    <v-btn
      type="submit"
      color="primary"
      block
      size="large"
      variant="flat"
      rounded="md"
      :loading="loading"
    >
      Send Password Reset Email
    </v-btn>
  </v-form>
</template>