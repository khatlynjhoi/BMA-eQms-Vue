<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  modelValue: boolean;
  formDetails: {
    isModalLoading: boolean;
    content?: any;
    validation?: any;
    link?: string | null;
  };
}>();

const emit = defineEmits(['update:modelValue', 'approved', 'disapproved']);

const isDisapproved = ref(false);
const remarks = ref('');

const formModalClose = () => {
  emit('update:modelValue', false);
};

const onSubmit = () => {
  const formData = new FormData();
  formData.append('validateID', props.formDetails.validation?.verificationId || '');
  formData.append('status', '0');
  formData.append('remarks', remarks.value);
  emit('disapproved', formData);
  remarks.value = '';
};

const getStatusBadge = (statusVal: number) => {
  return statusVal === 1
    ? ['success', 'APPROVED']
    : statusVal === 0
    ? ['error', 'DISAPPROVED']
    : ['secondary', 'PENDING'];
};
</script>

<template>
  <v-dialog :model-value="modelValue" @update:model-value="formModalClose" max-width="1200" persistent>
    <v-card rounded="lg">
      <v-card-title class="pa-4 bg-primary text-white d-flex align-center justify-space-between">
        <span class="text-h6 font-weight-bold">Risk Assessment Validation Report (Clause 6.1)</span>
        <v-btn icon variant="text" color="white" size="small" @click="formModalClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <div v-if="formDetails.isModalLoading" class="d-flex justify-center align-center pa-10">
        <v-progress-circular indeterminate color="primary" size="48" />
      </div>

      <v-card-text v-else class="pa-4">
        <v-row>
          <v-col cols="12" md="8">
            <div class="mb-3">
              <span class="text-caption text-secondary">{{ formDetails.content?.department }}</span>
              <h3 class="text-h5 font-weight-bold text-success">{{ formDetails.content?.activity }}</h3>
            </div>
            <iframe
              v-if="formDetails.link"
              :src="`${formDetails.link}#toolbar=0&navpanes=0`"
              style="width: 100%; height: 70vh; border: none"
            />
          </v-col>

          <v-col cols="12" md="4" class="border-left">
            <h4 class="text-subtitle-1 font-weight-bold mb-3">Validation Decision</h4>

            <v-form v-if="isDisapproved" @submit.prevent="onSubmit" class="mb-4">
              <v-textarea
                v-model="remarks"
                label="Disapproval Remarks*"
                variant="outlined"
                density="compact"
                rows="4"
                required
                class="mb-3"
              />
              <v-btn type="submit" color="error" block class="mb-2">Submit Disapproval</v-btn>
              <v-btn block variant="text" @click="isDisapproved = false">Cancel</v-btn>
            </v-form>

            <div v-else class="d-flex flex-column ga-2 mb-6">
              <v-btn color="success" block variant="flat" @click="emit('approved', formDetails.validation)">
                Approve Risk Assessment
              </v-btn>
              <v-btn color="error" block variant="outlined" @click="isDisapproved = true">
                Disapprove / Request Revision
              </v-btn>
            </div>

            <v-divider class="my-4" />

            <h4 class="text-subtitle-2 font-weight-bold mb-3">Validation History Log</h4>
            <div style="max-height: 350px; overflow-y: auto">
              <template v-if="formDetails.content?.verificationHistory?.length > 0">
                <div
                  v-for="(history, idx) in formDetails.content.verificationHistory"
                  :key="idx"
                  class="pa-3 mb-2 border rounded bg-grey-lighten-5"
                >
                  <div class="d-flex justify-space-between align-center mb-1">
                    <v-chip :color="getStatusBadge(history.is_approved)[0]" size="x-small" label>
                      {{ getStatusBadge(history.is_approved)[1] }}
                    </v-chip>
                    <span class="text-caption text-secondary">{{ history.validateDate }}</span>
                  </div>
                  <p class="text-caption font-weight-bold mb-0">Verified By: {{ history.validated?.name }}</p>
                  <p v-if="history.remarks" class="text-caption text-secondary font-italic mt-1 mb-0">
                    "{{ history.remarks }}"
                  </p>
                </div>
              </template>
              <div v-else class="text-caption text-secondary text-center py-4">
                No previous validation history logged.
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>