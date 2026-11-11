<script setup lang="ts">
import { ref, computed } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import { useTheme } from 'vuetify';

const theme = useTheme();
const primaryColor = theme.current.value.colors.primary;
const errorColor = theme.current.value.colors.error;

const menulist = ref(['Today', 'Weekly', 'Monthly']);

const chartOptions = computed(() => ({
  chart: {
    type: 'area',
    height: 60,
    fontFamily: `inherit`,
    foreColor: 'rgba(var(--v-theme-lightText), var(--v-high-opacity))',
    toolbar: false,
    stacked: true,
    sparkline: { enabled: true },
    offsetX: -20
  },
  colors: [primaryColor],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dataLabels: { enabled: false },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      type: 'vertical',
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0
    }
  },
  stroke: { curve: 'smooth', width: 2 },
  grid: { show: false },
  xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
  yaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
  legend: { show: true },
  tooltip: { x: { show: false } }
}));

const areaChart = {
  series: [{ name: 'Completed Tasks', data: [15, 25, 30, 40, 50, 60, 75] }]
};

const chartOptions1 = computed(() => ({
  chart: {
    type: 'area',
    height: 60,
    fontFamily: `inherit`,
    foreColor: 'rgba(var(--v-theme-lightText), var(--v-high-opacity))',
    toolbar: false,
    stacked: true,
    sparkline: { enabled: true },
    offsetX: -20
  },
  colors: [errorColor],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dataLabels: { enabled: false },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      type: 'vertical',
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0
    }
  },
  stroke: { curve: 'smooth', width: 2 },
  grid: { show: false },
  xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
  yaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
  legend: { show: true },
  tooltip: { x: { show: false } }
}));

const areaChart1 = {
  series: [{ name: 'Pending Tasks', data: [10, 8, 6, 5, 4, 3, 2] }]
};
</script>

<template>
  <v-card variant="outlined" class="bg-surface" rounded="lg">
    <v-card-text>
      <div class="d-flex justify-space-between align-center">
        <h5 class="text-h5 mb-0">Quality Action Plan & Audit Overview (Clause 9.2)</h5>
        <v-menu width="150" location="start">
          <template #activator="{ props }">
            <v-btn icon color="secondary" aria-label="Menu" variant="text" rounded="md" size="small" v-bind="props">
              <SvgSprite name="custom-more-outline" style="width: 20px; height: 20px" />
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
    <v-card-item class="pt-0">
      <v-row align="center">
        <v-col cols="12" md="4" sm="6">
          <v-row class="align-end">
            <v-col cols="6">
              <p class="text-body-1 mb-0">Total QMS Tasks</p>
              <h5 class="text-h5 mb-0">1,248</h5>
            </v-col>
            <v-col cols="6">
              <apexchart type="area" height="60" :options="chartOptions" :series="areaChart.series" />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-row class="align-end">
            <v-col cols="6">
              <p class="text-body-1 mb-0">Pending Actions</p>
              <h5 class="text-h5 mb-0">34</h5>
            </v-col>
            <v-col cols="6">
              <apexchart type="area" height="60" :options="chartOptions1" :series="areaChart1.series" />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="4">
          <v-btn color="primary" variant="flat" block rounded="md" size="large">
            <template #prepend>
              <SvgSprite name="custom-plus" style="width: 20px; height: 20px" />
            </template>
            Add Quality Task
          </v-btn>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
</template>