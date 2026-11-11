<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const handleReturnToLogin = (): void => {
  router.push('/login');
};
</script>

<template>
  <div class="text-center py-2">
    <h3 class="text-h4 font-weight-bold mb-2">Check Your Email</h3>
    <p class="text-subtitle-1 text-secondary mb-6">
      We have sent instructions to reset your e-QMS account password to your institutional email address.
    </p>

    <v-btn
      color="primary"
      block
      size="large"
      variant="flat"
      rounded="md"
      @click="handleReturnToLogin"
    >
      Return to Sign In
    </v-btn>
  </div>
</template>