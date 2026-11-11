<script setup lang="ts">
import { ref } from 'vue';
import CardHeader from '@/components/shared/CardHeader.vue';

const tab = ref('policy');

const policyPillars = [
  { title: 'Maritime Excellence', desc: 'Sustaining STCW-compliant maritime education and training standards.' },
  { title: 'Continuous Improvement', desc: 'Promoting systematic quality enhancements across all academic and administrative units.' },
  { title: 'Ethical Conduct & Integrity', desc: 'Upholding strict anti-corruption, transparency, and workplace ethics standards.' }
];

const cultureMetrics = [
  { metric: 'Quality Policy Awareness Rate', target: '100%', actual: '98.4%', status: 'Compliant' },
  { metric: 'Annual Ethics Refresher Completion', target: '95%', actual: '96.2%', status: 'Achieved' },
  { metric: 'Student & Stakeholder Satisfaction', target: '90%', actual: '92.1%', status: 'Achieved' }
];
</script>

<template>
  <CardHeader title="QUALITY POLICY & ETHICS CULTURE (CLAUSE 5.2)">
    <div class="pa-6">
      <div class="mb-4">
        <h3 class="text-h5 font-weight-bold text-primary mb-1">Baliwag Maritime Academy Quality Policy</h3>
        <p class="text-body-2 text-secondary">
          ISO 9001:2026 Clause 5.2 – Top Management Leadership, Quality Policy Dissemination, and Organizational Ethics Culture
        </p>
      </div>

      <v-tabs v-model="tab" color="primary" class="border-b mb-4">
        <v-tab value="policy">POLICY STATEMENT & PILLARS</v-tab>
        <v-tab value="metrics">CULTURE & AWARENESS METRICS</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="policy">
          <v-card border elevation="0" rounded="lg" class="pa-6 bg-grey-lighten-5 mb-4">
            <blockquote class="text-subtitle-1 font-italic text-primary mb-3">
              "Baliwag Maritime Academy is committed to delivering world-class maritime education, ensuring full compliance with STCW and statutory requirements, and continually improving the Quality Management System to exceed stakeholder expectations."
            </blockquote>
          </v-card>

          <v-row dense>
            <v-col v-for="(pillar, idx) in policyPillars" :key="idx" cols="12" md="4">
              <v-card border elevation="0" rounded="lg" class="pa-4 h-100">
                <div class="d-flex align-center mb-2">
                  <v-icon color="primary" class="me-2">mdi-shield-check</v-icon>
                  <h4 class="text-subtitle-1 font-weight-bold">{{ pillar.title }}</h4>
                </div>
                <p class="text-caption text-secondary mb-0">{{ pillar.desc }}</p>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item value="metrics">
          <v-card border elevation="0" rounded="lg">
            <v-table density="comfortable" class="text-body-2">
              <thead>
                <tr>
                  <th class="text-left font-weight-bold">Culture Indicator</th>
                  <th class="text-center font-weight-bold">Target Metric</th>
                  <th class="text-center font-weight-bold">Actual Performance</th>
                  <th class="text-center font-weight-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(m, i) in cultureMetrics" :key="i">
                  <td>{{ m.metric }}</td>
                  <td class="text-center">{{ m.target }}</td>
                  <td class="text-center font-weight-bold text-primary">{{ m.actual }}</td>
                  <td class="text-center">
                    <v-chip color="success" size="x-small" label>{{ m.status }}</v-chip>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-window-item>
      </v-window>
    </div>
  </CardHeader>
</template>