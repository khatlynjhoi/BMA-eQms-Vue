<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  modal: {
    show: boolean;
    form: Record<string, any>;
  };
}>();

const emit = defineEmits(['store', 'removed']);

const formData = ref<Record<string, any>>({});

watch(
  () => props.modal.form,
  (val) => {
    formData.value = { ...val };
  },
  { immediate: true, deep: true }
);

const formInputs = [
  { label: 'QUALITY OBJECTIVE (CLAUSE 6.2.1)', model: 'quality_objective' },
  { label: 'TARGET METRIC', model: 'target' },
  { label: 'KEY PERFORMANCE INDICATOR (KPI)', model: 'key_performance_indicator' },
  { label: 'MEASUREMENT METHODOLOGY', model: 'measurement_method' },
  { label: 'ACTUAL PERFORMANCE', model: 'actual_performance' },
  { label: 'TARGET MET (YES / NO)', model: 'target_met' },
  { label: 'TIME FRAME / DEADLINE', model: 'time_frame' },
  { label: 'PROOF OF EVIDENCE (DOCUMENT REF)', model: 'proof_of_evidence' },
  { label: 'FREQUENCY OF REPORTING', model: 'frequency_of_report' }
];
</script>

<template>
  <v-card border elevation="0" rounded="lg">
    <v-card-title class="pa-4 bg-primary text-white d-flex align-center justify-space-between">
      <span class="text-h6 font-weight-bold">
        {{ modal.form?.qor_id ? 'Update Quality Objective' : 'Add Quality Objective Metric' }}
      </span>
      <div class="d-flex ga-2">
        <v-btn v-if="modal.form?.qor_id" color="error" size="small" variant="flat" @click="emit('removed', modal.form?.qor_id)">
          Remove Metric
        </v-btn>
        <v-btn icon variant="text" color="white" size="small" @click="modal.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </v-card-title>

    <v-card-text class="pa-6">
      <v-form @submit.prevent="emit('store', formData)">
        <v-row dense>
          <v-col v-for="(input, index) in formInputs" :key="index" cols="12" md="6">
            <v-textarea
              v-model="formData[input.model]"
              :label="input.label"
              variant="outlined"
              density="compact"
              rows="2"
              auto-grow
              class="mb-2"
            />
          </v-col>
        </v-row>

        <div class="text-right mt-4">
          <v-btn type="submit" color="primary" variant="flat">
            Save Quality Objective Metric
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>