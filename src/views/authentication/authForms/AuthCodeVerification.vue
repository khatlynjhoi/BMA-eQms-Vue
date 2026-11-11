<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import alertService from '@/services/alertService';

const router = useRouter();
const otp = ref('');
const loading = ref(false);

const handleVerify = async (): Promise<void> => {
  if (otp.value.length < 4) return;

  loading.value = true;
  try {
    alertService.toast('Verification successful.');
    await router.push('/login');
  } catch (error) {
    alertService.error('Invalid verification code.');
  } finally {
    loading.value = false;
  }
};

const handleResendCode = (): void => {
  alertService.toast('A new verification code has been sent to your email.');
};
</script>

<template>
  <v-form @submit.prevent="handleVerify" class="mt-4">
    <p class="text-subtitle-2 text-secondary mb-4">
      Enter the 4-digit verification code sent to your registered institutional account.
    </p>

    <div class="d-flex justify-center mb-4">
      <v-otp-input
        v-model="otp"
        length="4"
        type="number"
        variant="outlined"
        rounded="md"
        height="48"
      />
    </div>

    <v-btn
      type="submit"
      color="primary"
      block
      size="large"
      variant="flat"
      rounded="md"
      :loading="loading"
      :disabled="otp.length < 4"
      class="mb-4"
    >
      Verify & Continue
    </v-btn>

    <div class="d-flex align-center justify-space-between mt-4">
      <span class="text-caption text-secondary">Didn't receive the code?</span>
      <v-btn
        variant="text"
        color="primary"
        size="small"
        class="text-none font-weight-bold"
        @click="handleResendCode"
      >
        Resend Code
      </v-btn>
    </div>
  </v-form>
</template>