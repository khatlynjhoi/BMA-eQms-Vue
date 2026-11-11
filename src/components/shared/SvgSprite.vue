<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
  name?: string;
}>();

const spritePath = ref<string>('/assets/svg/sprite.svg');

onMounted(() => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  spritePath.value = `${cleanBase}assets/svg/sprite.svg`;
});
</script>

<template>
  <svg class="pc-icon">
    <use :xlink:href="`${spritePath}#${props.name}`"></use>
  </svg>
</template>