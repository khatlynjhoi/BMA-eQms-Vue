import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from '@/router';
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css';

import '@/scss/style.scss';
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';

import SvgSprite from '@/components/shared/SvgSprite.vue';

// Google Fonts Typography Scale
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import '@fontsource/public-sans/400.css';
import '@fontsource/public-sans/500.css';
import '@fontsource/public-sans/600.css';
import '@fontsource/public-sans/700.css';

const app = createApp(App);

// Initialize Pinia state store BEFORE router & component mounting
app.use(createPinia());

// Mount plugins, router, and Vuetify design system
app.use(router);
app.use(vuetify);
app.use(PerfectScrollbarPlugin);
app.use(VueApexCharts);
app.component('SvgSprite', SvgSprite);

app.mount('#app');