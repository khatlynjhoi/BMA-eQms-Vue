<script setup lang="ts">
import SvgSprite from '@/components/shared/SvgSprite.vue';

export interface Breadcrumb {
  title: string;
  disabled: boolean;
  href: string;
}

const props = defineProps<{
  title?: string;
  breadcrumbs?: Breadcrumb[];
  icon?: string;
}>();
</script>

<template>
  <v-row class="page-breadcrumb mb-2 mt-n2">
    <v-col cols="12">
      <v-card elevation="0" variant="text">
        <v-row no-gutters class="align-center">
          <v-col cols="12">
            <v-breadcrumbs :items="props.breadcrumbs || []" class="text-body-2 pa-0 mb-1">
              <template #divider>
                <div class="d-flex align-center">
                  <SvgSprite name="custom-chevron-outline" style="width: 12px; height: 12px" />
                </div>
              </template>
              <template #prepend>
                <router-link to="/dashboard/default" class="text-darkText text-body-2 text-decoration-none font-weight-medium">
                  Home
                </router-link>
                <div class="d-flex align-center px-2">
                  <SvgSprite name="custom-chevron-outline" style="width: 12px; height: 12px" />
                </div>
              </template>
            </v-breadcrumbs>
            <h2 v-if="props.title" class="text-h4 font-weight-bold text-primary mb-0">{{ props.title }}</h2>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.page-breadcrumb {
  .v-toolbar {
    background: transparent;
  }
}
</style>