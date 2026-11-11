<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/dashboard');
};
</script>

<template>
  <v-row no-gutters class="overflow-hidden bg-containerBg" style="min-height: 100vh">
    <v-col class="d-flex align-center justify-center pa-4">
      <div class="text-center">
        <div class="CardMediaWrapper mb-6">
          <img
            src="@/assets/images/maintenance/img-error-404.svg"
            alt="404 Page Not Found"
          />
        </div>

        <h1 class="text-h1 font-weight-bold text-primary mb-2">Page Not Found</h1>
        <p class="text-h6 text-secondary mb-6">
          The e-QMS module, report, or system route you are looking for <br class="d-none d-sm-inline" />
          has been moved, renamed, or is currently unavailable.
        </p>

        <v-btn
          color="primary"
          variant="flat"
          size="large"
          rounded="md"
          class="px-6"
          @click="goHome"
        >
          <v-icon class="mr-2">mdi-home-outline</v-icon> Back To Workspace Home
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.CardMediaWrapper {
  max-width: 720px;
  margin: 0 auto;
  position: relative;

  > img {
    width: 100%;
    max-width: 590px;
    height: auto;
    max-height: 300px;
    object-fit: contain;
  }
}
</style>