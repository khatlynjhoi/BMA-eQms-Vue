<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ListOfObjective from './components/ListOfObjective.vue';
import AddObjectiveForm from './components/AddObjectiveForm.vue';
import QualityObjectiveModal from './components/QualityObjectiveModal.vue';
import { GeneralController } from '@/stores/GeneralController';
import { QualityObjectiveService } from '@/services/qualityObjectiveService';
import alertService from '@/services/alertService';

const route = useRoute();
const qualityObjectiveService = new QualityObjectiveService();

const pageLoader = ref(true);
const objective = ref<any>({});
const addQualityModal = ref({
  show: false,
  form: {} as Record<string, any>
});

const objectiveModal = ref({
  show: false,
  link: null as string | null,
  data: null as any,
  isModalLoading: false
});

const retrieveData = async () => {
  pageLoader.value = true;
  try {
    const targetId = route.params.objective || route.params.id;
    const response: any = await qualityObjectiveService.viewQualityObjective(String(targetId));
    if (response) {
      objective.value = response.qualityObjective || {};
    }
  } catch (error) {
    console.error('Failed to load quality objective detail:', error);
  } finally {
    pageLoader.value = false;
  }
};

onMounted(() => {
  retrieveData();
});

const addObjective = () => {
  addQualityModal.value = {
    show: true,
    form: {}
  };
};

const storeObjective = async (formDataPayload: any) => {
  pageLoader.value = true;
  try {
    formDataPayload.objective = objective.value.id;
    const jsonStr = JSON.stringify(formDataPayload);
    const response: any = await GeneralController.storeJson('quality-objective/add-objectives', jsonStr);

    if (response && (response.status === 200 || response.ok)) {
      alertService.toast('Quality Objective saved successfully.');
      addQualityModal.value.show = false;
      await retrieveData();
    }
  } catch (error) {
    alertService.error('Failed to save Quality Objective item.');
  } finally {
    pageLoader.value = false;
  }
};

const removeObjective = async (qor_id: number | string) => {
  const confirmed = await alertService.confirm('Are you sure you want to remove this objective metric?');
  if (!confirmed.isConfirmed) return;

  pageLoader.value = true;
  try {
    const payload = JSON.stringify({ qualityQuality: qor_id });
    await GeneralController.storeJson('quality-objective/remove-objective', payload);
    alertService.toast('Metric removed.');
    addQualityModal.value.show = false;
    await retrieveData();
  } catch (error) {
    alertService.error('Failed to remove metric.');
  } finally {
    pageLoader.value = false;
  }
};

const submitObjective = async () => {
  const confirmed = await alertService.confirm('Submit this complete Quality Objective for formal validation?');
  if (!confirmed.isConfirmed) return;

  pageLoader.value = true;
  try {
    const payload = JSON.stringify({ qualityObjective: objective.value.id });
    await GeneralController.storeJson('quality-objective/submit-quality-objective', payload);
    alertService.toast('Quality Objective submitted successfully.');
    await retrieveData();
  } catch (error) {
    alertService.error('Submission failed.');
  } finally {
    pageLoader.value = false;
  }
};

const viewObjective = async (id: number | string) => {
  try {
    const response: any = await GeneralController.retrieveDataGet(
      `quality-objective/view-qualityObjective?qualityObjective=${id}`,
      'qualityObjective'
    );
    if (response) {
      addQualityModal.value = {
        show: true,
        form: response
      };
    }
  } catch (error) {
    console.error('Error fetching metric detail:', error);
  }
};

const onViewPDF = async (item: any) => {
  objectiveModal.value.show = true;
  objectiveModal.value.data = item;
  objectiveModal.value.isModalLoading = true;

  try {
    const controller = new GeneralController();
    const response = await controller.retrieveFile(`objective=${String(item.id)}`, 'quality-objective/pdf-qualityObjective');
    const blob = response instanceof Blob
      ? response
      : new Blob([new Uint8Array(response).buffer as ArrayBuffer], { type: 'application/pdf' });
    objectiveModal.value.link = URL.createObjectURL(blob);
  } catch (error) {
    alertService.error('Unable to render PDF document.');
  } finally {
    objectiveModal.value.isModalLoading = false;
  }
};
</script>

<template>
  <div>
    <v-card v-if="!pageLoader" variant="outlined" elevation="0" class="bg-surface mb-5 rounded-lg">
      <v-card-item class="pa-4">
        <div class="d-flex justify-space-between align-center">
          <div>
            <span class="text-caption text-secondary">{{ objective.procedure }}</span>
            <h2 class="text-h4 font-weight-bold text-success mb-1">{{ objective.academicYear }}</h2>
            <span class="text-caption text-secondary">{{ objective.department }}</span>
          </div>
          <div>
            <div class="text-right text-caption text-secondary mb-2">
              Created: <b>{{ objective.createdAt }}</b>
            </div>
            <div class="d-flex ga-2 align-center">
              <v-btn color="success" variant="flat" size="small" @click="onViewPDF(objective)">
                View as PDF
              </v-btn>
              <v-btn v-if="!objective.verification" color="primary" variant="flat" size="small" @click="submitObjective">
                Submit Quality Objective
              </v-btn>
            </div>
          </div>
        </div>
      </v-card-item>
    </v-card>

    <div v-if="pageLoader" class="d-flex justify-center align-center pa-10">
      <v-progress-circular indeterminate color="primary" size="48" />
    </div>

    <v-row v-else>
      <v-col cols="12" md="4">
        <ListOfObjective :objectives="objective.listOfObjective" @add="addObjective" @view="viewObjective" />
      </v-col>

      <v-col cols="12" md="8">
        <AddObjectiveForm
          v-if="addQualityModal.show"
          :modal="addQualityModal"
          @store="storeObjective"
          @removed="removeObjective"
        />
        <v-card v-else border elevation="0" rounded="lg" class="pa-8 text-center text-secondary">
          <v-icon size="40" color="primary" class="mb-2">mdi-target</v-icon>
          <h4 class="text-subtitle-1 font-weight-bold text-primary mb-1">Quality Objective Workspace</h4>
          <p class="text-body-2 mb-0">Select an objective from the left panel or click '+' to create a new target metric.</p>
        </v-card>
      </v-col>
    </v-row>

    <QualityObjectiveModal
      v-if="objectiveModal.show"
      v-model="objectiveModal.show"
      :form-details="objectiveModal"
    />
  </div>
</template>