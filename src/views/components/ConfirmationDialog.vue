<script setup lang="ts">
import { computed } from 'vue';

export interface ConfirmData {
  show: boolean;
  title?: string;
  message?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  data?: any;
}

const props = defineProps<{
  confirmData: ConfirmData;
}>();

const emit = defineEmits<{
  (e: 'confirm', payload?: any): void;
  (e: 'cancel'): void;
}>();

const formattedTitle = computed(() => (props.confirmData.title || 'CONFIRMATION').toUpperCase());

const iconPath = computed(() => {
  switch (props.confirmData.type) {
    case 'success': return 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z';
    case 'error': return 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z';
    case 'warning': return 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z';
    default: return 'M11 17h2v-6h-2v6zm0-8h2V7h-2v2zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z';
  }
});

const iconColor = computed(() => {
  switch (props.confirmData.type) {
    case 'success': return '#4CAF50';
    case 'error': return '#F44336';
    case 'warning': return '#FF9800';
    default: return '#2196F3';
  }
});

const circleColor = computed(() => {
  switch (props.confirmData.type) {
    case 'success': return 'rgba(76, 175, 80, 0.12)';
    case 'error': return 'rgba(244, 67, 54, 0.12)';
    case 'warning': return 'rgba(255, 152, 0, 0.12)';
    default: return 'rgba(33, 150, 243, 0.12)';
  }
});

const handleConfirm = () => {
  emit('confirm', props.confirmData.data);
  props.confirmData.show = false;
};

const handleCancel = () => {
  emit('cancel');
  props.confirmData.show = false;
};
</script>

<template>
  <v-dialog :model-value="confirmData.show" max-width="400" persistent>
    <v-card class="text-center rounded-lg pa-4" elevation="8">
      <v-card-text class="pt-4">
        <div
          class="mx-auto"
          :style="{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: circleColor
          }"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" :fill="iconColor">
            <path :d="iconPath" />
          </svg>
        </div>
      </v-card-text>

      <v-card-title class="justify-center text-h6 font-weight-bold pt-0">
        {{ formattedTitle }}
      </v-card-title>
      
      <v-card-text class="text-body-2 text-secondary pa-2">
        {{ confirmData.message }}
      </v-card-text>

      <v-card-actions class="justify-center ga-2 pt-4">
        <v-btn variant="outlined" color="secondary" class="px-5" @click="handleCancel">
          Cancel
        </v-btn>
        <v-btn variant="flat" color="primary" class="px-5" @click="handleConfirm">
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>