<script setup lang="ts">
import { ref } from 'vue';
import ComponentTitle from '@/components/shared/ComponentTitle.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

const page = ref({ title: 'Color Palette' });
const subContent = ref({
  content: 'Convey meaning through standardized e-QMS theme colors. Out of the box, you get access to all Vuetify design guidelines.'
});
const path = ref({ filepath: 'src/views/utilities/ColorPage.vue' });
const link = ref({ filelink: 'https://vuetifyjs.com/en/styles/colors/' });

const colors = ref<string[]>([
  'primary',
  'lightprimary',
  'secondary',
  'lightsecondary',
  'info',
  'lightinfo',
  'success',
  'lightsuccess',
  'warning',
  'lightwarning',
  'error',
  'lighterror',
  'darkText',
  'lightText',
  'borderLight',
  'inputBorder',
  'containerBg'
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
      <UiParentCard title="System Theme Colors">
        <v-row>
          <v-col
            v-for="(color, index) in colors"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-sheet
              rounded="md"
              class="align-center justify-center d-flex text-caption font-weight-bold"
              height="100"
              width="100%"
              :color="color"
            >
              class: {{ color }}
            </v-sheet>
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col>
  </v-row>
</template>