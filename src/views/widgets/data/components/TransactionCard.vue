<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';

const menulist = ref(['Today', 'Weekly', 'Monthly']);
const tab = ref('one');

const transactionData = shallowRef([
  {
    title: 'Engine Dept Internal Audit',
    avatarVariant: 'outlined',
    avatarColor: 'borderLight',
    avatarName: 'EA',
    icon: 'custom-fall-down-outline',
    subcontent: '#BMA-CAR-2026-001',
    price: 'Clause 9.2',
    percentage: 'Closed',
    color: 'success'
  },
  {
    title: 'STCW Curriculum Review',
    avatarVariant: 'outlined',
    avatarColor: 'borderLight',
    avatarName: 'CR',
    icon: 'custom-rise-outline',
    subcontent: '#BMA-DOC-2026-042',
    price: 'Clause 7.5',
    percentage: 'Approved',
    color: 'success'
  },
  {
    title: 'Registrar Form Clearance',
    avatarVariant: 'tonal',
    avatarColor: 'primary',
    avatarName: 'RF',
    icon: 'custom-bidirectional',
    subcontent: '06:30 pm',
    price: 'Clause 8.1',
    percentage: 'Pending',
    color: 'warning'
  },
  {
    title: 'MARINA Inspection Readiness',
    avatarVariant: 'outlined',
    avatarColor: 'borderLight',
    avatarName: 'MI',
    icon: 'custom-rise-outline',
    subcontent: '08:40 pm',
    price: 'Clause 4.2',
    percentage: 'Verified',
    color: 'success'
  }
]);

const transactionData1 = shallowRef([
  {
    title: 'Engine Dept Internal Audit',
    avatarVariant: 'outlined',
    avatarColor: 'borderLight',
    avatarName: 'EA',
    icon: 'custom-fall-down-outline',
    subcontent: '#BMA-CAR-2026-001',
    price: 'Clause 9.2',
    percentage: 'Closed',
    color: 'success'
  },
  {
    title: 'STCW Curriculum Review',
    avatarVariant: 'outlined',
    avatarColor: 'borderLight',
    avatarName: 'CR',
    icon: 'custom-rise-outline',
    subcontent: '#BMA-DOC-2026-042',
    price: 'Clause 7.5',
    percentage: 'Approved',
    color: 'success'
  }
]);

const transactionData2 = shallowRef([
  {
    title: 'Registrar Form Clearance',
    avatarVariant: 'tonal',
    avatarColor: 'primary',
    avatarName: 'RF',
    icon: 'custom-bidirectional',
    subcontent: '06:30 pm',
    price: 'Clause 8.1',
    percentage: 'Pending',
    color: 'warning'
  }
]);
</script>

<template>
  <v-card variant="outlined" class="bg-surface" rounded="lg">
    <v-card-text class="pb-2">
      <div class="d-flex justify-space-between align-center">
        <h5 class="text-h5 mb-0">Quality Transaction & Audit Logs</h5>
        <v-menu width="150">
          <template #activator="{ props }">
            <v-btn icon color="secondary" aria-label="Menu" variant="text" rounded="md" size="small" v-bind="props">
              <SvgSprite name="custom-more-outline" style="width: 20px; height: 20px; transform: rotate(90deg)" />
            </v-btn>
          </template>
          <v-list elevation="24" class="pa-3" rounded="md">
            <v-list-item
              v-for="(item, index) in menulist"
              :key="index"
              density="compact"
              rounded="md"
              color="secondary"
              :value="index"
            >
              <v-list-item-title class="text-h6 text-lightText">{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-card-text>

    <v-tabs v-model="tab" color="primary" class="px-6 border-b">
      <v-tab value="one" class="font-weight-medium">All Logs</v-tab>
      <v-tab value="two" class="font-weight-medium">Approved / Closed</v-tab>
      <v-tab value="three" class="font-weight-medium">Pending Review</v-tab>
    </v-tabs>

    <v-card-item class="pa-0">
      <v-window v-model="tab">
        <v-window-item value="one">
          <v-list border rounded="lg" class="py-0" aria-label="All quality logs">
            <v-list-item v-for="(item, i) in transactionData" :key="i" class="py-4 px-6">
              <template #prepend>
                <v-avatar v-if="item.avatarVariant === 'tonal'" size="40" :color="item.avatarColor" variant="tonal" rounded="md">
                  <span class="text-h5">{{ item.avatarName }}</span>
                </v-avatar>
                <v-avatar v-else size="40" :color="item.avatarColor" variant="outlined" rounded="md">
                  <span class="text-darkText text-h5">{{ item.avatarName }}</span>
                </v-avatar>
              </template>

              <h6 class="text-subtitle-1 mb-0">{{ item.title }}</h6>
              <span class="text-caption text-lightText">{{ item.subcontent }}</span>

              <template #append>
                <div class="text-right">
                  <h6 class="text-subtitle-1 mb-0">{{ item.price }}</h6>
                  <p :class="'text-body-1 mb-0 text-' + item.color">
                    {{ item.percentage }}
                  </p>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-window-item>

        <v-window-item value="two">
          <v-list border rounded="lg" class="py-0" aria-label="Closed quality logs">
            <v-list-item v-for="(item, i) in transactionData1" :key="i" class="py-4 px-6">
              <template #prepend>
                <v-avatar v-if="item.avatarVariant === 'tonal'" size="40" :color="item.avatarColor" variant="tonal" rounded="md">
                  <span class="text-h5">{{ item.avatarName }}</span>
                </v-avatar>
                <v-avatar v-else size="40" :color="item.avatarColor" variant="outlined" rounded="md">
                  <span class="text-darkText text-h5">{{ item.avatarName }}</span>
                </v-avatar>
              </template>
              <h6 class="text-subtitle-1 mb-0">{{ item.title }}</h6>
              <span class="text-caption text-lightText">{{ item.subcontent }}</span>
              <template #append>
                <div class="text-right">
                  <h6 class="text-subtitle-1 mb-0">{{ item.price }}</h6>
                  <p :class="'text-body-1 mb-0 text-' + item.color">{{ item.percentage }}</p>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-window-item>

        <v-window-item value="three">
          <v-list border rounded="lg" class="py-0" aria-label="Pending quality logs">
            <v-list-item v-for="(item, i) in transactionData2" :key="i" class="py-4 px-6">
              <template #prepend>
                <v-avatar v-if="item.avatarVariant === 'tonal'" size="40" :color="item.avatarColor" variant="tonal" rounded="md">
                  <span class="text-h5">{{ item.avatarName }}</span>
                </v-avatar>
                <v-avatar v-else size="40" :color="item.avatarColor" variant="outlined" rounded="md">
                  <span class="text-darkText text-h5">{{ item.avatarName }}</span>
                </v-avatar>
              </template>
              <h6 class="text-subtitle-1 mb-0">{{ item.title }}</h6>
              <span class="text-caption text-lightText">{{ item.subcontent }}</span>
              <template #append>
                <div class="text-right">
                  <h6 class="text-subtitle-1 mb-0">{{ item.price }}</h6>
                  <p :class="'text-body-1 mb-0 text-' + item.color">{{ item.percentage }}</p>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-window-item>
      </v-window>

      <v-divider />
      <div class="pa-6">
        <v-row>
          <v-col cols="12" sm="6" class="pb-sm-3 pb-0">
            <v-btn color="secondary" variant="outlined" rounded="md" block>Full Audit History</v-btn>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn color="primary" variant="flat" rounded="md" block>Log New Action</v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card-item>
  </v-card>
</template>