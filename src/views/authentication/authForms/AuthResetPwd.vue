<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import alertService from '@/services/alertService';

const router = useRouter();
const logform = ref<any>(null);
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const loading = ref(false);

const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 8 || 'Password must be at least 8 characters'
];

const confirmPasswordRules = [
  (v: string) => !!v || 'Password confirmation is required',
  (v: string) => v === password.value || 'Passwords do not match'
];

const handleResetPassword = async () => {
  const { valid } = await logform.value.validate();
  if (!valid) return;

  loading.value = true;
  try {
    // API request placeholder: await authStore.resetPassword(password.value)
    alertService.toast('Password has been successfully updated.');
    await router.push('/login');
  } catch (error) {
    alertService.error('Failed to reset password.');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-form ref="logform" @submit.prevent="handleResetPassword" class="mt-4">
    <div class="mb-4">
      <v-label class="font-weight-medium mb-1">New Password</v-label>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Enter new password"
        density="comfortable"
        variant="outlined"
        color="primary"
        hide-details="auto"
        required
      >
        <template v-slot:append-inner>
          <v-btn icon variant="text" size="small" color="secondary" @click="showPassword = !showPassword">
            <SvgSprite :name="showPassword ? 'custom-eye' : 'custom-eye-invisible'" style="width: 18px; height: 18px" />
          </v-btn>
        </template>
      </v-text-field>
    </div>

    <div class="mb-6">
      <v-label class="font-weight-medium mb-1">Confirm New Password</v-label>
      <v-text-field
        v-model="confirmPassword"
        :rules="confirmPasswordRules"
        :type="showConfirmPassword ? 'text' : 'password'"
        placeholder="Confirm new password"
        density="comfortable"
        variant="outlined"
        color="primary"
        hide-details="auto"
        required
      >
        <template v-slot:append-inner>
          <v-btn icon variant="text" size="small" color="secondary" @click="showConfirmPassword = !showConfirmPassword">
            <SvgSprite :name="showConfirmPassword ? 'custom-eye' : 'custom-eye-invisible'" style="width: 18px; height: 18px" />
          </v-btn>
        </template>
      </v-text-field>
    </div>

    <v-btn
      type="submit"
      color="primary"
      block
      size="large"
      variant="flat"
      rounded="md"
      :loading="loading"
    >
      Reset Password
    </v-btn>
  </v-form>
</template>