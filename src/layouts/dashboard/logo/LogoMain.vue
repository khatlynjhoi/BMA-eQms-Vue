<template>
  <div class="logo" style="display: flex; align-items: center; height: 28px;">
    <RouterLink to="/dashboard" aria-label="logo" style="display: flex; align-items: center;">
      <img src="@/assets/images/eQms-logo.png" alt="BMA eQMS Logo" style="height:6em; object-fit: contain;" />
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>