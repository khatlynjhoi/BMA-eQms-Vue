<script setup lang="ts">
import AmendmentTableList from './components/AmendmentTableList.vue';

defineProps<{
  amendmentList: any[];
}>();

const verificationHeaders = [
  { title: 'Status', key: 'status', align: 'start' as const },
  { title: 'Amendment Control', key: 'amendmentControl', align: 'start' as const },
  { title: 'Procedure / Form Name', key: 'name', align: 'start' as const },
  { title: 'Creator', key: 'createBy', align: 'start' as const },
  { title: 'Description', key: 'descriptionOfChanges', align: 'start' as const },
  { title: 'Submission Date', key: 'submittedData', align: 'start' as const }
];
</script>

<template>
  <AmendmentTableList :data="amendmentList" :headers="verificationHeaders" />
</template>