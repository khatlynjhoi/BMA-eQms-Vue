<script setup lang="ts">
import { ref } from 'vue';
import ComponentTitle from '@/components/shared/ComponentTitle.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

const page = ref({ title: 'Typography' });
const subContent = ref({
  content: 'Standardized typography scale ensuring readable, accessible, and structured document presentation.'
});
const path = ref({ filepath: 'src/views/utilities/TypographyPage.vue' });
const link = ref({ filelink: 'https://vuetifyjs.com/en/styles/text-and-typography/' });
</script>

<template>
  <ComponentTitle
    :title="page.title"
    :subContent="subContent.content"
    :path="path.filepath"
    :link="link.filelink"
  />
  <v-row>
    <v-col cols="12" md="6">
      <v-row>
        <v-col cols="12">
          <UiParentCard title="Font Family">
            <h1 class="text-h1 mb-1">Inter</h1>
            <h5 class="text-h5 mb-2">Primary Typography Family</h5>
            <v-breadcrumbs
              :items="['Regular (400)', 'Medium (500)', 'Bold (700)']"
              class="text-caption text-lightText mb-0 pa-0 flex-wrap"
            />
          </UiParentCard>
        </v-col>

        <v-col cols="12">
          <UiParentCard title="Heading Hierarchy">
            <h1 class="text-h1 mb-2">H1 Heading</h1>
            <v-breadcrumbs
              :items="['Size: 38px', 'Weight: Bold', 'Line Height: 46px']"
              class="text-caption text-lightText pa-0 flex-wrap mb-3"
            />
            <v-divider />

            <h2 class="text-h2 mb-2 mt-3">H2 Heading</h2>
            <v-breadcrumbs
              :items="['Size: 30px', 'Weight: Bold', 'Line Height: 38px']"
              class="text-caption text-lightText pa-0 flex-wrap mb-3"
            />
            <v-divider />

            <h3 class="text-h3 mb-2 mt-3">H3 Heading</h3>
            <v-breadcrumbs
              :items="['Size: 24px', 'Weight: Regular & Bold', 'Line Height: 32px']"
              class="text-caption text-lightText pa-0 flex-wrap mb-3"
            />
            <v-divider />

            <h4 class="text-h4 mb-2 mt-3">H4 Heading</h4>
            <v-breadcrumbs
              :items="['Size: 20px', 'Weight: Bold', 'Line Height: 28px']"
              class="text-caption text-lightText pa-0 flex-wrap mb-3"
            />
            <v-divider />

            <h5 class="text-h5 mb-2 mt-3">H5 Heading</h5>
            <v-breadcrumbs
              :items="['Size: 16px', 'Weight: Regular & Medium & Bold', 'Line Height: 24px']"
              class="text-caption text-lightText pa-0 flex-wrap mb-3"
            />
            <v-divider />

            <h6 class="text-h6 mb-2 mt-3">H6 Heading / Subheading</h6>
            <v-breadcrumbs
              :items="['Size: 14px', 'Weight: Regular', 'Line Height: 22px']"
              class="text-caption text-lightText mb-0 pa-0 flex-wrap"
            />
          </UiParentCard>
        </v-col>

        <v-col cols="12">
          <UiParentCard title="Body 1">
            <p class="text-body-1">
              Standard body copy for documented procedures, quality objectives, and detailed clause descriptions.
            </p>
            <v-breadcrumbs
              :items="['Size: 14px', 'Weight: Regular', 'Line Height: 22px']"
              class="text-caption text-lightText mb-0 pa-0 flex-wrap mt-3"
            />
          </UiParentCard>
        </v-col>

        <v-col cols="12">
          <UiParentCard title="Body 2">
            <p class="text-body-2">
              Secondary body text used within data tables, card descriptions, and secondary instructional elements.
            </p>
            <v-breadcrumbs
              :items="['Size: 12px', 'Weight: Regular', 'Line Height: 20px']"
              class="text-caption text-lightText mb-0 pa-0 flex-wrap mt-3"
            />
          </UiParentCard>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" md="6">
      <v-row>
        <v-col cols="12">
          <UiParentCard title="Text Alignment">
            <p class="text-left text-caption">
              Left aligned text standard for all instructional copy and clause descriptions.
            </p>
            <p class="text-center text-caption mt-3">
              Center aligned text utilized for status chips, callout titles, and modal headers.
            </p>
            <p class="text-right text-caption mt-3 mb-0">
              Right aligned text utilized for action buttons, currency values, and table metadata.
            </p>
          </UiParentCard>
        </v-col>

        <v-col cols="12">
          <UiParentCard title="Overline & Captions">
            <div class="text-overline text-uppercase mb-3">
              ISO 9001:2026 Quality Management Standard Reference
            </div>
            <v-breadcrumbs
              :items="['Size: 12px', 'Weight: Regular', 'Uppercase']"
              class="text-caption text-lightText mb-0 pa-0 flex-wrap"
            />
          </UiParentCard>
        </v-col>

        <v-col cols="12">
          <UiParentCard title="Text Colors">
            <h6 class="text-h6 text-primary mb-1">Primary theme text color.</h6>
            <h6 class="text-h6 text-secondary mb-1">Secondary muted text color.</h6>
            <h6 class="text-h6 text-success mb-1">Success status text color.</h6>
            <h6 class="text-h6 text-warning mb-1">Warning alert text color.</h6>
            <h6 class="text-h6 text-error mb-0">Error alert text color.</h6>
          </UiParentCard>
        </v-col>

        <v-col cols="12">
          <UiParentCard title="Font Styles">
            <p class="font-italic">
              Italicized text used for contextual notes and clause definitions.
            </p>
            <p class="text-subtitle-1 font-italic mb-0">
              Subtitle italic style used for official quality policy quotes.
            </p>
          </UiParentCard>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>