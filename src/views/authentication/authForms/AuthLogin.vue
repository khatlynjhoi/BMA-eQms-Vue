<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import alertService from '@/services/alertService';
import SvgSprite from '@/components/shared/SvgSprite.vue';

const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const showPassword = ref(false);
const keepSignedIn = ref(false);
const loading = ref(false);
const errorMessage = ref('');

const emailRules = [
  (v: string) => !!v.trim() || 'Institutional E-mail is required',
  (v: string) => /.+@.+\..+/.test(v.trim()) || 'E-mail must be valid'
];

const passwordRules = [
  (v: string) => !!v || 'Password is required'
];

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('success')) {
    const credential = urlParams.get('success');
    if (credential) {
      try {
        await authStore.googleLogin(credential);
      } catch (err: any) {
        alertService.error('Google OAuth Authentication failed');
      }
    }
  }
});

const handleLogin = async () => {
  if (!username.value || !password.value) return;
  loading.value = true;
  errorMessage.value = '';
  
  try {
    await authStore.login(username.value.trim(), password.value);
  } catch (err: any) {
    errorMessage.value = err?.error?.message || err?.message || 'Invalid email or password';
  } finally {
    loading.value = false;
  }
};

const loginWithGoogle = () => {
  authStore.loginWithGoogle();
};
</script>

<template>
  <v-form @submit.prevent="handleLogin" class="mt-4">
    <div class="mb-4">
      <v-label class="font-weight-medium mb-1">Email Address</v-label>
      <v-text-field
        v-model="username"
        :rules="emailRules"
        placeholder="user@bma.edu.ph"
        density="comfortable"
        variant="outlined"
        color="primary"
        hide-details="auto"
      />
    </div>

    <div class="mb-4">
      <v-label class="font-weight-medium mb-1">Password</v-label>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        :type="showPassword ? 'text' : 'password'"
        placeholder="••••••••"
        density="comfortable"
        variant="outlined"
        color="primary"
        hide-details="auto"
      >
        <template v-slot:append-inner>
          <v-btn icon variant="text" size="small" color="secondary" @click="showPassword = !showPassword">
            <SvgSprite :name="showPassword ? 'custom-eye' : 'custom-eye-invisible'" style="width: 18px; height: 18px" />
          </v-btn>
        </template>
      </v-text-field>
    </div>

    <div class="d-flex align-center justify-space-between mb-4">
      <v-checkbox
        v-model="keepSignedIn"
        label="Keep me signed in"
        color="primary"
        density="compact"
        hide-details
      />
      <router-link to="/forgot-pwd1" class="text-caption text-primary font-weight-medium text-decoration-none">
        Forgot Password?
      </router-link>
    </div>

    <v-alert v-if="errorMessage" type="error" variant="tonal" density="compact" class="mb-4">
      {{ errorMessage }}
    </v-alert>

    <v-btn
      type="submit"
      color="primary"
      block
      size="large"
      variant="flat"
      rounded="md"
      :loading="loading"
      class="mb-3"
    >
      Sign In
    </v-btn>

    <v-btn
      type="button"
      color="secondary"
      variant="outlined"
      block
      size="large"
      rounded="md"
      @click="loginWithGoogle"
    >
      <template v-slot:prepend>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.0461 12.2099C21.0461 11.5553 20.9874 10.9259 20.8783 10.3217H12.1846V13.8966H17.1524C16.9342 15.0462 16.2797 16.0197 15.2979 16.6742V18.9987H18.2937C20.0391 17.3875 21.0461 15.0211 21.0461 12.2099Z" fill="#4285F4"/>
          <path d="M12.1844 21.2307C14.6767 21.2307 16.7662 20.4084 18.2935 18.9986L15.2977 16.6741C14.4753 17.2279 13.4264 17.5636 12.1844 17.5636C9.78441 17.5636 7.74525 15.944 7.01518 13.7622H3.94385V16.1454C5.46273 19.158 8.57602 21.2307 12.1844 21.2307Z" fill="#34A853"/>
          <path d="M7.01516 13.7539C6.83054 13.2 6.72145 12.6126 6.72145 12C6.72145 11.3874 6.83054 10.8 7.01516 10.2462V7.86295H3.94382C3.31445 9.10491 2.95361 10.5063 2.95361 12C2.95361 13.4937 3.31445 14.8951 3.94382 16.1371L6.33544 14.2741L7.01516 13.7539Z" fill="#FBBC05"/>
          <path d="M12.1844 6.44475C13.5439 6.44475 14.7522 6.91469 15.7173 7.82098L18.3606 5.17762C16.7578 3.68391 14.6767 2.76923 12.1844 2.76923C8.57602 2.76923 5.46273 4.84196 3.94385 7.86294L7.01518 10.2462C7.74525 8.06434 9.78441 6.44475 12.1844 6.44475Z" fill="#EA4335"/>
        </svg>
      </template>
      Sign in with Google
    </v-btn>
  </v-form>
</template>