<script setup lang="ts">
import AuthLogin from './authForms/AuthLogin.vue';
</script>

<template>
  <v-row class="bg-containerBg position-relative fill-height" no-gutters>
    <v-col cols="12" class="d-flex align-center fullscreen-img">
      <v-container>
        <div class="d-flex align-center justify-center" style="min-height: calc(100vh - 148px)">
          <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="5">
              <v-card elevation="4" rounded="lg" class="loginBox bg-surface pa-2 pa-sm-4">
                <v-card-text class="pa-sm-8 pa-4">
                  <div class="text-center mb-6">
                    <h2 class="text-h4 font-weight-bold text-primary mb-1">BMA e-QMS</h2>
                    <p class="text-caption text-secondary font-weight-medium">
                      BALIWAG MARITIME ACADEMY — ISO 9001:2026
                    </p>
                  </div>
                  <AuthLogin />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.loginBox {
  max-width: 460px;
  margin: 0 auto;
}

.fullscreen-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('@/assets/images/building.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>