<script setup lang="ts">
import { ref } from 'vue';
import ComponentTitle from '@/components/shared/ComponentTitle.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

const page = ref({ title: 'Shadows & Elevation' });
const subContent = ref({
  content: 'Add depth and layer hierarchy to e-QMS cards and modals using box-shadow elevation utilities.'
});
const path = ref({ filepath: 'src/views/utilities/ShadowPage.vue' });
const link = ref({ filelink: 'https://vuetifyjs.com/en/styles/elevation/' });

const colorShadow = ref<string[]>([
  'primary',
  'secondary',
  'info',
  'success',
  'warning',
  'error'
]);
</script>

<template>
  <ComponentTitle
    :title="page.title"
    :subContent="subContent.content"
    :path="path.filepath"
    :link="link.filelink"
  />
  <v-row>
    <v-col cols="12">
      <UiParentCard title="Basic Elevation (0-24)">
        <v-row justify="center" class="ga-2">
          <v-col v-for="n in 25" :key="n" cols="auto">
            <v-card
              height="90"
              width="90"
              class="d-flex justify-center align-center flex-column"
              :class="`elevation-${n - 1}`"
              rounded="md"
            >
              <h6 class="text-caption font-weight-bold mb-0">elevation</h6>
              <div class="text-subtitle-2 font-weight-bold text-primary">{{ n - 1 }}</div>
            </v-card>
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col>

    <v-col cols="12">
      <UiParentCard title="Color Shadows">
        <v-row>
          <v-col v-for="color in colorShadow" :key="color" cols="6" sm="4" md="3" lg="2">
            <v-card :class="`${color}-shadow bg-${color} px-4 py-6 text-center text-subtitle-1 rounded-md`">
              {{ color }}
            </v-card>
          </v-col>
        </v-row>
        <v-row class="mt-3">
          <v-col v-for="color in colorShadow" :key="color" cols="6" sm="4" md="3" lg="2">
            <v-card :class="`${color}-outline-shadow text-${color} px-4 py-6 text-center text-subtitle-1 rounded-md`">
              {{ color }}
            </v-card>
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col>
  </v-row>
</template>