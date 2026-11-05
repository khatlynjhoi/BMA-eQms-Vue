<script setup lang="ts">
import { ref } from 'vue';
import { GeneralController } from '@/stores/GeneralController';
import alertService from '@/services/alertService';

defineProps<{
  roles: any[];
  departments: any[];
}>();

const emit = defineEmits<{
  (e: 'created'): void;
}>();

const accountForm = ref<any>(null);
const isSubmit = ref(false);
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const role = ref<string | number>('');
const department = ref<string | number>('');

const rules = {
  required: (v: any) => !!v || 'This field is required',
  optionalEmail: (v: string) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Email must be valid'
};

const submitForm = async () => {
  const { valid } = await accountForm.value.validate();
  if (!valid) return;

  isSubmit.value = true;
  const formData = new FormData();
  formData.append('first_name', firstName.value);
  formData.append('last_name', lastName.value);
  formData.append('email', email.value || '');
  formData.append('role', String(role.value));
  formData.append('department', String(department.value));

  try {
    const response: any = await GeneralController.storeItem('account/create-account', formData);
    if (response?.ok || response?.status === 200) {
      alertService.toast('Account created successfully (Clause 5.3)');
      firstName.value = '';
      lastName.value = '';
      email.value = '';
      role.value = '';
      department.value = '';
      accountForm.value.resetValidation();
      emit('created');
    } else {
      alertService.error('Failed to create user account.');
    }
  } catch (error) {
    console.error('Failed to create account:', error);
    alertService.error('Could not create account due to a server error.');
  } finally {
    isSubmit.value = false;
  }
};
</script>

<template>
  <v-container fluid class="pa-4">
    <div v-if="isSubmit" class="d-flex flex-column justify-center align-center pa-10">
      <v-progress-circular indeterminate color="primary" size="48" />
      <p class="text-subtitle-1 text-primary font-weight-bold mt-3">Creating User Account...</p>
    </div>

    <v-card v-else border elevation="0" rounded="lg" class="pa-6">
      <h3 class="text-h6 font-weight-bold text-primary mb-4">Register New QMS User (Clause 5.3)</h3>
      <v-form ref="accountForm" @submit.prevent="submitForm">
        <v-row density="comfortable">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="firstName"
              :rules="[rules.required]"
              label="First Name*"
              variant="outlined"
              density="compact"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="lastName"
              :rules="[rules.required]"
              label="Last Name*"
              variant="outlined"
              density="compact"
              required
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="email"
              :rules="[rules.optionalEmail]"
              label="Institutional Email Address"
              variant="outlined"
              density="compact"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="role"
              :items="roles"
              item-title="name"
              item-value="id"
              :rules="[rules.required]"
              label="Assigned QMS Role*"
              variant="outlined"
              density="compact"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="department"
              :items="departments"
              item-title="name"
              item-value="id"
              :rules="[rules.required]"
              label="Department Assignment*"
              variant="outlined"
              density="compact"
              required
            />
          </v-col>
        </v-row>

        <div class="text-right mt-4">
          <v-btn type="submit" color="primary" variant="flat">
            Create User Account
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>