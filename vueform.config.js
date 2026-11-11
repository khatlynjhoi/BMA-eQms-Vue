import en from '@vueform/vueform/locales/en';
import vueform from '@vueform/vueform/dist/vueform';
import { defineConfig } from '@vueform/vueform';
import builder from '@vueform/builder/plugin';

import '@vueform/vueform/dist/vueform.css';

export default defineConfig({
  theme: vueform,
  locales: { en },
  locale: 'en',
  apiKey: 'ttwk-gak3-qah9-v8tu-soll',
  plugins: [builder]
});