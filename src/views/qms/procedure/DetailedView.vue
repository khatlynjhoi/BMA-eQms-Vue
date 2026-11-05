<script setup lang="ts">
import { ref } from 'vue';
import ProcedureCard from '../components/ProcedureCard.vue';
import ProcedurePDFViewer from '../components/ProcedurePDFViewer.vue';
import UploadProcedure from '../components/UploadProcedure.vue';
import FormProcedure from '../components/FormProcedure.vue';

defineProps<{
  detailed: {
    prodId: string | number;
    prodName?: string;
    prodVersion?: string;
    fileID?: string | number;
    formLists?: any[];
  };
}>();

const tab = ref('one');
</script>

<template>
  <ProcedureCard :title="detailed.prodName" :version="detailed.prodVersion">
    <div v-if="detailed.fileID && detailed.fileID !== 0 && detailed.fileID !== '0'">
      <v-tabs v-model="tab" color="primary" class="px-4 border-b">
        <v-tab value="one" class="font-weight-medium">DOCUMENT VIEW</v-tab>
        <v-tab value="two" class="font-weight-medium">LINKED FORMS</v-tab>
        <v-tab value="three" class="font-weight-medium">REVISION CONTROL</v-tab>
      </v-tabs>

      <v-window v-model="tab" class="pa-2">
        <v-window-item value="one">
          <ProcedurePDFViewer :file-i-d="detailed.fileID" model="ProcedureDocuments" />
        </v-window-item>
        
        <v-window-item value="two">
          <FormProcedure v-model:form-list="detailed.formLists" :procedure="detailed.prodId" />
        </v-window-item>
        
        <v-window-item value="three">
          <UploadProcedure :procedure="detailed.prodId" />
        </v-window-item>
      </v-window>
    </div>

    <div v-else class="pa-8 text-center text-secondary">
      <v-icon size="48" color="secondary" class="mb-2">mdi-file-search-outline</v-icon>
      <p class="text-body-1 mb-0">Please select a procedure from the list to display its documented information.</p>
    </div>
  </ProcedureCard>
</template>