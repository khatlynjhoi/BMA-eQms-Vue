<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CardHeader from '@/components/shared/CardHeader.vue';
import AccountList from './components/AccountList.vue';
import CreateAccount from './components/CreateAccount.vue';
import { GeneralController } from '@/stores/GeneralController';

const tab = ref('one');
const contentLoading = ref(true);
const accountList = ref([]);
const departments = ref([]);
const roles = ref([]);

const fetchAccountData = async () => {
  contentLoading.value = true;
  try {
    const controller = new GeneralController();
    const response: any = await controller.retrieveData('account/retrieve-accounts', { search: null }, 'content');
    if (response) {
      accountList.value = response.accounts || [];
      departments.value = response.departments || [];
      roles.value = response.roles || [];
    }
  } catch (error) {
    console.error('Error fetching account management data:', error);
  } finally {
    contentLoading.value = false;
  }
};

onMounted(() => {
  fetchAccountData();
});
</script>

<template>
  <CardHeader title="ACCOUNT MANAGEMENT" class="overflow-hidden">
    <div class="pa-2">
      <template v-if="contentLoading">
        <div class="d-flex justify-center align-center pa-10">
          <v-progress-circular indeterminate color="primary" size="48" />
        </div>
      </template>
      <template v-else>
        <v-tabs v-model="tab" color="primary" class="px-6 mb-4">
          <v-tab value="one" class="font-weight-medium">EMPLOYEE LIST</v-tab>
          <v-tab value="two" class="font-weight-medium">CREATE ACCOUNT</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item value="one">
            <AccountList :account-list="accountList" @refresh="fetchAccountData" />
          </v-window-item>
          <v-window-item value="two">
            <CreateAccount :departments="departments" :roles="roles" @created="fetchAccountData" />
          </v-window-item>
        </v-window>
      </template>
    </div>
  </CardHeader>
</template>