<script setup lang="ts">
defineProps<{
  title?: string;
  subContent?: string;
  path?: string;
  link?: string;
}>();
</script>

<template>
  <v-row class="mb-2 mt-n3">
    <v-col cols="12">
      <v-card elevation="0" variant="text">
        <v-row no-gutters class="align-center">
          <v-col cols="12">
            <h2 class="text-h4 mb-2 font-weight-bold text-primary">{{ title }}</h2>
            <h6 class="text-subtitle-1 text-secondary mb-3">{{ subContent }}</h6>
            <div v-if="path" class="d-flex align-center mb-3 text-caption text-secondary">
              <v-icon size="16" class="mr-2">mdi-code-tags</v-icon>
              <span>{{ path }}</span>
            </div>
            <v-btn
              v-if="link"
              :href="link"
              class="d-inline-flex align-center font-weight-medium"
              variant="tonal"
              color="secondary"
              rounded="md"
              size="small"
              target="_blank"
            >
              <v-icon size="16" class="mr-1">mdi-open-in-new</v-icon>
              Reference
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>