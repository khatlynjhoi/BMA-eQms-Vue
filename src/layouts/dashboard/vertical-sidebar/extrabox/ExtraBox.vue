<script setup lang="ts">
import SvgSprite from '@/components/shared/SvgSprite.vue';
</script>

<template>
  <v-sheet rounded="md" color="lightprimary" class="pa-4 ExtraBox hide-menu text-center pb-5" border>
    <div class="d-flex align-center flex-column">
      <v-avatar color="primary" variant="tonal" size="48" class="mb-3">
        <SvgSprite name="custom-shield-outline" style="width: 24px; height: 24px" />
      </v-avatar>
      <div class="px-2">
        <h5 class="text-h6 mb-1 font-weight-bold text-primary">ISO 9001:2026 Standard</h5>
        <small class="text-caption text-lightText">Baliwag Maritime Academy Quality Management System</small>
      </div>
    </div>
    <div class="mt-4">
      <v-btn
        to="/context/policy-culture"
        variant="flat"
        color="primary"
        size="small"
        block
        class="rounded-md"
      >
        <template v-slot:prepend>
          <SvgSprite name="custom-document-text-outline" style="width: 16px; height: 16px" />
        </template>
        Quality Policy
      </v-btn>
    </div>
  </v-sheet>
</template>

<style lang="scss" scoped>
.ExtraBox {
  position: relative;
  overflow: hidden;
}
</style>