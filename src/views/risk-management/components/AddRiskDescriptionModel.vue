<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  modelValue: boolean;
  formData: Record<string, any>;
  consequence?: any[];
  likelihood?: any[];
  when_action?: any[];
  risk_decision?: any[];
  opportunity_rating?: any[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'addRisk', payload: Record<string, any>): void;
  (e: 'update:formData', value: Record<string, any>): void;
}>();

const addConfirmDialog = ref(false);

const formModalClose = () => {
  emit('update:modelValue', false);
  emit('update:formData', {});
};

const submitForm = () => {
  emit('addRisk', props.formData);
  addConfirmDialog.value = false;
};
</script>

<template>
  <v-dialog :model-value="modelValue" @update:model-value="formModalClose" max-width="1000" persistent>
    <v-card rounded="lg">
      <v-card-title class="pa-4 bg-primary text-white d-flex align-center justify-space-between">
        <span class="text-h6 font-weight-bold">
          {{ formData.action === 'update' ? 'UPDATE' : 'ADD' }} HAZARD & RISK DESCRIPTION (CLAUSE 6.1)
        </span>
        <v-btn icon variant="text" color="white" size="small" aria-label="Close Dialog" @click="formModalClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pa-6">
        <v-form @submit.prevent="addConfirmDialog = true">
          <v-text-field
            v-model="formData.risks_description"
            label="Hazards / Risks Description*"
            variant="outlined"
            density="compact"
            required
            class="mb-3"
          />

          <v-text-field
            v-model="formData.control_measures"
            label="Existing Control Measures*"
            variant="outlined"
            density="compact"
            required
            class="mb-3"
          />

          <v-row dense>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="formData.who_at_risk"
                label="Who / What is at Risk?*"
                variant="outlined"
                density="compact"
                required
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="formData.consequence"
                :items="consequence"
                item-title="term"
                item-value="id"
                label="Consequence Severity*"
                variant="outlined"
                density="compact"
                required
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="formData.likelihood"
                :items="likelihood"
                item-title="term"
                item-value="id"
                label="Likelihood Probability*"
                variant="outlined"
                density="compact"
                required
              />
            </v-col>
          </v-row>

          <v-text-field
            v-model="formData.action_to_minimize"
            label="Action to be Taken to Minimize Risk*"
            variant="outlined"
            density="compact"
            required
            class="my-3"
          />

          <v-row dense>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="formData.action_by_whom"
                label="Action Responsible Person*"
                variant="outlined"
                density="compact"
                required
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="formData.action_by_when"
                :items="when_action"
                item-title="name"
                item-value="id"
                label="Target Timeline*"
                variant="outlined"
                density="compact"
                required
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="formData.action_effectiveness"
                label="Action Effectiveness Rate (%)*"
                type="number"
                variant="outlined"
                density="compact"
                required
              />
            </v-col>
          </v-row>

          <v-row dense class="mt-2">
            <v-col cols="12" md="4">
              <v-select
                v-model="formData.risk_decision"
                :items="risk_decision"
                item-title="name"
                item-value="id"
                label="Risk Decision Category*"
                variant="outlined"
                density="compact"
                required
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="formData.opportunity_identified"
                label="Identified Opportunity*"
                variant="outlined"
                density="compact"
                required
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="formData.opportunity_rate"
                :items="opportunity_rating"
                item-title="name"
                item-value="id"
                label="Opportunity Rate*"
                variant="outlined"
                density="compact"
                required
              />
            </v-col>
          </v-row>

          <div class="text-right mt-4">
            <v-btn type="submit" color="primary" variant="flat">
              Save Hazard & Risk Item
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>

  <!-- Confirmation Dialog -->
  <v-dialog v-model="addConfirmDialog" max-width="400">
    <v-card rounded="lg" class="pa-4">
      <v-card-title class="px-0 pt-0 text-h6 font-weight-bold">Confirm Save</v-card-title>
      <v-card-text class="px-0">Are you sure you want to save this risk assessment entry?</v-card-text>
      <v-card-actions class="px-0 pb-0">
        <v-spacer />
        <v-btn variant="text" @click="addConfirmDialog = false">Cancel</v-btn>
        <v-btn color="primary" variant="flat" @click="submitForm">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>