<script setup lang="ts">
import { ref } from 'vue';
import PreviewForm from './PreviewForm.vue';

defineProps<{
  formList: any[];
}>();

const emit = defineEmits<{
  (e: 'store', payload: any): void;
}>();

const formSelected = ref<any>(null);

const handleStore = (payload: any) => {
  emit('store', payload);
};
</script>

<template>
  <v-container fluid class="pa-4">
    <v-toolbar flat color="transparent" class="mb-4">
      <v-autocomplete
        v-model="formSelected"
        :items="formList"
        item-title="form_name"
        item-value="id"
        label="Search QMS Form Template"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        color="primary"
        density="compact"
        clearable
        return-object
        hint="Search by form title or format code"
        persistent-hint
        class="w-100"
      >
        <template v-slot:item="{ props: itemProps, item }">
          <v-list-item v-bind="itemProps" :subtitle="item.raw.form_code" />
        </template>
      </v-autocomplete>
    </v-toolbar>

    <v-card v-if="formSelected" border elevation="0" rounded="lg" class="pa-4">
      <PreviewForm :form-selected="formSelected" @store="handleStore" />
    </v-card>
  </v-container>
</template>