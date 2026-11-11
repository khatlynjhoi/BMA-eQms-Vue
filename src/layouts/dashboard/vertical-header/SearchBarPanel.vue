<script setup lang="ts">
import SvgSprite from '@/components/shared/SvgSprite.vue';
</script>

<template>
  <v-text-field
    persistent-placeholder
    placeholder="Search SOPs, Risks, MOC, CAPAs... (Ctrl + K)"
    color="primary"
    variant="outlined"
    density="compact"
    hide-details
  >
    <template #prepend-inner>
      <div class="text-lightText d-flex align-center">
        <SvgSprite name="custom-search" style="width: 16px; height: 16px" />
      </div>
    </template>
  </v-text-field>
</template>