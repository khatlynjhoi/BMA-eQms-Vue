<script setup lang="ts">
interface Props {
  userName: string;
  userRole?: string;
}

withDefaults(defineProps<Props>(), {
  userRole: 'Process Owner'
});
</script>

<template>
  <v-card class="welcomeBanner text-surface overflow-hidden" elevation="0" rounded="lg">
    <v-card-text class="py-6 px-md-12 px-6">
      <v-row>
        <v-col cols="12" xl="7" md="8" sm="10">
          <div class="py-4">
            <h2 class="text-h3 font-weight-bold mb-2">Welcome back, {{ userName }}!</h2>
            <div class="d-flex align-center ga-2 mb-4">
              <v-chip color="white" size="small" variant="flat" label class="font-weight-bold text-primary">
                {{ userRole }}
              </v-chip>
              <span class="text-caption text-white opacity-80">ISO 9001:2026 e-QMS Workspace</span>
            </div>
            <p class="text-body-1 opacity-90 mb-0" style="max-width: 640px">
              Centralized quality management repository for streaming departmental processes, tracking nonconformities, and facilitating evidence-based decision making.
            </p>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.welcomeBanner {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, #1565C0 100%);
  position: relative;

  &::after {
    content: '';
    background-image: url(@/assets/images/analytics/img-dropbox-bg.svg);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    opacity: 0.25;
    background-position: bottom right;
    background-size: contain;
    background-repeat: no-repeat;
    pointer-events: none;
  }
}
</style>