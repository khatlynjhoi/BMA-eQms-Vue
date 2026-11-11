<script setup lang="ts">
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import TextInput from './TextInput.vue';
import alertService from '@/services/alertService';

function onSubmit(values: Record<string, any>) {
  alertService.toast('Form submission successful');
  console.log('Submitted values:', values);
}

function onInvalidSubmit() {
  alertService.error('Please fix validation errors before submitting.');
}

const schema = Yup.object().shape({
  name: Yup.string().required('Full name is required'),
  email: Yup.string().email('Email address must be valid').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirm_password: Yup.string()
    .required('Password confirmation is required')
    .oneOf([Yup.ref('password')], 'Passwords do not match')
});
</script>

<template>
  <v-card border elevation="0" rounded="lg" class="pa-6">
    <h3 class="text-h6 font-weight-bold text-primary mb-4">User Registration Form Validation</h3>
    <Form @submit="onSubmit" :validation-schema="schema" @invalid-submit="onInvalidSubmit">
      <v-label class="mb-1 font-weight-medium">Full Name</v-label>
      <TextInput
        name="name"
        type="text"
        label="Enter your full name"
        placeholder="Juan Dela Cruz"
      />

      <v-label class="mb-1 font-weight-medium">Email Address</v-label>
      <TextInput
        name="email"
        type="email"
        label="Enter your institutional email"
        placeholder="user@bma.edu.ph"
      />

      <v-label class="mb-1 font-weight-medium">Password</v-label>
      <TextInput
        name="password"
        type="password"
        label="Enter secure password"
        placeholder="••••••••"
      />

      <v-label class="mb-1 font-weight-medium">Confirm Password</v-label>
      <TextInput
        name="confirm_password"
        type="password"
        label="Confirm password"
        placeholder="••••••••"
      />

      <div class="mt-4 text-right">
        <v-btn type="submit" color="primary" variant="flat" rounded="md">
          Submit Form
        </v-btn>
      </div>
    </Form>
  </v-card>
</template>