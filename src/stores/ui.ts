import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', () => {
  const isLoading = ref<boolean>(false);

  const setLoading = (state: boolean): void => {
    isLoading.value = state;
  };

  return {
    isLoading,
    setLoading
  };
});