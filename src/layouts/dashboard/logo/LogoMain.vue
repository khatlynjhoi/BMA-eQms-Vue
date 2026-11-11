<template>
  <div class="logo d-flex align-center" style="height: 28px;">
    <RouterLink to="/dashboard" aria-label="BMA e-QMS Dashboard" class="d-flex align-center text-decoration-none">
      <img src="@/assets/images/eQms-logo.png" alt="BMA eQMS Logo" style="height: 3.5rem; object-fit: contain;" />
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>