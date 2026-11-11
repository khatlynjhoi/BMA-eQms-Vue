<script setup lang="ts">
import { ref, computed } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import { useTheme } from 'vuetify';

const theme = useTheme();
const warningColor = theme.current.value.colors.warning;
const successColor = theme.current.value.colors.success;
const errorColor = theme.current.value.colors.error;

const menulist = ref(['Today', 'Weekly', 'Monthly']);

const chartOptions1 = computed(() => ({
  chart: {
    type: 'bar',
    height: 50,
    fontFamily: `inherit`,
    sparkline: { enabled: true }
  },
  dataLabels: { enabled: false },
  plotOptions: {
    bar: { borderRadius: 2, columnWidth: '80%' }
  },
  colors: ['rgba(var(--v-theme-primary), var(--v-medium-opacity))'],
  stroke: { curve: 'smooth', width: 0 },
  tooltip: { fixed: { enabled: false }, x: { show: false } }
}));

const chartOptions2 = computed(() => ({
  chart: {
    type: 'bar',
    height: 50,
    fontFamily: `inherit`,
    sparkline: { enabled: true }
  },
  dataLabels: { enabled: false },
  plotOptions: {
    bar: { borderRadius: 2, columnWidth: '80%' }
  },
  colors: [warningColor],
  stroke: { curve: 'smooth', width: 0 },
  tooltip: { fixed: { enabled: false }, x: { show: false } }
}));

const chartOptions3 = computed(() => ({
  chart: {
    type: 'bar',
    height: 50,
    fontFamily: `inherit`,
    sparkline: { enabled: true }
  },
  dataLabels: { enabled: false },
  plotOptions: {
    bar: { borderRadius: 2, columnWidth: '80%' }
  },
  colors: [successColor],
  stroke: { curve: 'smooth', width: 0 },
  tooltip: { fixed: { enabled: false }, x: { show: false } }
}));

const chartOptions4 = computed(() => ({
  chart: {
    type: 'bar',
    height: 50,
    fontFamily: `inherit`,
    sparkline: { enabled: true }
  },
  dataLabels: { enabled: false },
  plotOptions: {
    bar: { borderRadius: 2, columnWidth: '80%' }
  },
  colors: [errorColor],
  stroke: { curve: 'smooth', width: 0 },
  tooltip: { fixed: { enabled: false }, x: { show: false } }
}));

const barChart1 = { series: [{ name: 'CARs Logged', data: [10, 30, 40, 20, 60, 50, 20, 15, 20, 25, 30, 25] }] };
const barChart2 = { series: [{ name: 'Doc Reviews', data: [15, 20, 35, 45, 30, 55, 40, 25, 30, 35, 40, 50] }] };
const barChart3 = { series: [{ name: 'Objectives Met', data: [20, 40, 50, 60, 70, 80, 85, 90, 92, 94, 96, 98] }] };
const barChart4 = { series: [{ name: 'Open NCs', data: [12, 10, 8, 6, 9, 5, 4, 3, 2, 4, 2, 1] }] };
</script>

<template>
  <v-row class="mb-0">
    <!-- Card 1: Active CARs -->
    <v-col cols="12" md="6" lg="3">
      <v-card variant="outlined" elevation="0" class="bg-surface" rounded="lg">
        <v-card-text>
          <v-list class="pt-0" aria-label="Active CARs metric">
            <v-list-item class="pa-0">
              <template #prepend>
                <v-avatar variant="tonal" color="primary" rounded="md">
                  <SvgSprite name="custom-wallet-outline" style="width: 20px; height: 20px" />
                </v-avatar>
              </template>
              <h6 class="text-subtitle-1 mb-0">Active CARs</h6>
              <template #append>
                <v-menu width="150" location="start">
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
              </template>
            </v-list-item>
          </v-list>
          <v-sheet class="pa-4 pb-2 mt-1" color="containerBg" rounded="lg">
            <v-row class="widget-grid align-center">
              <v-col cols="7">
                <apexchart type="bar" height="50" :options="chartOptions1" :series="barChart1.series" />
              </v-col>
              <v-col cols="5" class="text-right">
                <h5 class="text-h5">142</h5>
                <p class="text-caption text-primary mb-0 d-flex align-center justify-end">
                  <SvgSprite name="custom-rise-outline" style="width: 14px; height: 14px; transform: rotate(45deg)" class="me-1" />
                  +12.4%
                </p>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Card 2: Document Reviews -->
    <v-col cols="12" md="6" lg="3">
      <v-card variant="outlined" elevation="0" class="bg-surface overflow-hidden" rounded="lg">
        <v-card-text>
          <v-list class="pt-0" aria-label="Document reviews metric">
            <v-list-item class="pa-0">
              <template #prepend>
                <v-avatar variant="tonal" color="warning" rounded="md">
                  <SvgSprite name="custom-page-outline" style="width: 20px; height: 20px" />
                </v-avatar>
              </template>
              <h6 class="text-subtitle-1 mb-0">Doc Reviews</h6>
              <template #append>
                <v-menu width="150" location="start">
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
              </template>
            </v-list-item>
          </v-list>
          <v-sheet class="pa-4 pb-2 mt-1" color="containerBg" rounded="lg">
            <v-row class="widget-grid align-center">
              <v-col cols="7">
                <apexchart type="bar" height="50" :options="chartOptions2" :series="barChart2.series" />
              </v-col>
              <v-col cols="5" class="text-right">
                <h5 class="text-h5">290+</h5>
                <p class="text-caption text-warning mb-0 d-flex align-center justify-end">
                  <SvgSprite name="custom-fall-outline" style="width: 14px; height: 14px; transform: rotate(45deg)" class="me-1" />
                  -5.2%
                </p>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Card 3: Quality Objectives -->
    <v-col cols="12" md="6" lg="3">
      <v-card variant="outlined" elevation="0" class="bg-surface" rounded="lg">
        <v-card-text>
          <v-list class="pt-0" aria-label="Quality objectives metric">
            <v-list-item class="pa-0">
              <template #prepend>
                <v-avatar variant="tonal" color="success" rounded="md">
                  <SvgSprite name="custom-calendar-outline" style="width: 20px; height: 20px" />
                </v-avatar>
              </template>
              <h6 class="text-subtitle-1 mb-0">Objectives Met</h6>
              <template #append>
                <v-menu width="150" location="start">
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
              </template>
            </v-list-item>
          </v-list>
          <v-sheet class="pa-4 pb-2 mt-1" color="containerBg" rounded="lg">
            <v-row class="widget-grid align-center">
              <v-col cols="7">
                <apexchart type="bar" height="50" :options="chartOptions3" :series="barChart3.series" />
              </v-col>
              <v-col cols="5" class="text-right">
                <h5 class="text-h5">98.4%</h5>
                <p class="text-caption text-success mb-0 d-flex align-center justify-end">
                  <SvgSprite name="custom-rise-outline" style="width: 14px; height: 14px; transform: rotate(45deg)" class="me-1" />
                  +3.1%
                </p>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Card 4: Open Non-Conformities -->
    <v-col cols="12" md="6" lg="3">
      <v-card variant="outlined" elevation="0" class="bg-surface" rounded="lg">
        <v-card-text>
          <v-list class="pt-0" aria-label="Open non-conformities metric">
            <v-list-item class="pa-0">
              <template #prepend>
                <v-avatar variant="tonal" color="error" rounded="md">
                  <SvgSprite name="custom-cloud-outline-1" style="width: 20px; height: 20px" />
                </v-avatar>
              </template>
              <h6 class="text-subtitle-1 mb-0">Open NCs</h6>
              <template #append>
                <v-menu width="150" location="start">
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
              </template>
            </v-list-item>
          </v-list>
          <v-sheet class="pa-4 pb-2 mt-1" color="containerBg" rounded="lg">
            <v-row class="widget-grid align-center">
              <v-col cols="7">
                <apexchart type="bar" height="50" :options="chartOptions4" :series="barChart4.series" />
              </v-col>
              <v-col cols="5" class="text-right">
                <h5 class="text-h5">3</h5>
                <p class="text-caption text-error mb-0 d-flex align-center justify-end">
                  <SvgSprite name="custom-fall-outline" style="width: 14px; height: 14px; transform: rotate(130deg)" class="me-1" />
                  -40%
                </p>
              </v-col>
            </v-row>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.widget-grid {
  > div {
    @media (max-width: 1540px) and (min-width: 1280px) {
      flex: 0 0 100%;
      max-width: 100%;
      text-align: center;
    }
  }
}
</style>