<script setup lang="ts">
import { shallowRef } from 'vue';

const qmsFooterLinks = shallowRef([
  { title: 'BMA Portal', link: 'https://bma.edu.ph' },
  { title: 'Quality Policy', link: '/context/policy-culture' },
  { title: 'IT Support', link: 'mailto:ict@bma.edu.ph' }
]);
</script>

<template>
  <v-footer class="px-0 footer">
    <v-row justify="space-between" align="center" no-gutters>
      <v-col cols="12" sm="6" class="text-center text-sm-left">
        <p class="text-caption text-lightText mb-0">
          © {{ new Date().getFullYear() }} Baliwag Maritime Academy. All Rights Reserved.
        </p>
      </v-col>
      <v-col cols="12" sm="6" class="text-center text-sm-right mt-2 mt-sm-0">
        <a 
          v-for="(item, i) in qmsFooterLinks" 
          :key="i" 
          class="mx-2 text-caption text-secondary link-hover" 
          :href="item.link"
        >
          {{ item.title }}
        </a>  
      </v-col>
    </v-row>
  </v-footer>
</template>