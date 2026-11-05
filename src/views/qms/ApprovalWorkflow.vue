<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import DepartmentHeadView from './DepartmentHeadView.vue';
import QMRView from './QMRView.vue';
import SchoolDirector from './SchoolDirector.vue';

const authStore = useAuthStore();

// Role mapping: 1/Standard = Initiator, 6 = QMR, 9 = School Director Executive
const userRole = computed(() => Number(authStore.user?.roleID || 1));
</script>

<template>
  <div>
    <DepartmentHeadView v-if="userRole === 1 || userRole === 6" />
    <SchoolDirector v-else-if="userRole === 9" />
    <QMRView v-else :amendment-list="[]" />
  </div>
</template>