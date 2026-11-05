<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AnnouncementPost from '@/views/widgets/AnnouncementPost.vue';
import { GeneralController } from '@/stores/GeneralController';
import alertService from '@/services/alertService';

const isLoading = ref(true);
const showModal = ref(false);
const formLoader = ref(false);

const form = ref({
  title: '',
  content: '',
  department: null as number | null,
  attachments: [] as File[]
});

const departments = ref<any[]>([]);
const announcementPost = ref<any[]>([]);

const fetchData = async () => {
  isLoading.value = true;
  try {
    const controller = new GeneralController();
    const response: any = await controller.retrieveData('announcement/retrieve-data', { search: '' }, 'data');
    if (response) {
      announcementPost.value = response.announcements || [];
      departments.value = [
        { id: null, name: 'All Departments' },
        ...(response.departments || [])
      ];
    }
  } catch (error) {
    console.error('Failed to load announcements:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchData();
});

const resetForm = () => {
  form.value = {
    title: '',
    content: '',
    department: null,
    attachments: []
  };
};

const submitForm = async () => {
  if (!form.value.title || !form.value.content) {
    alertService.error('Please enter a title and content for the announcement.');
    return;
  }

  formLoader.value = true;
  try {
    const formData = new FormData();
    formData.append('title', form.value.title);
    formData.append('content', form.value.content);
    if (form.value.department) {
      formData.append('department', String(form.value.department));
    }

    if (form.value.attachments.length > 0) {
      form.value.attachments.forEach((file) => {
        formData.append('file[]', file);
      });
    }

    await GeneralController.storeItem('announcement/create-announcement', formData);
    alertService.toast('Announcement published successfully.');
    showModal.value = false;
    resetForm();
    await fetchData();
  } catch (error) {
    console.error('Submission failed:', error);
    alertService.error('Failed to create announcement.');
  } finally {
    formLoader.value = false;
  }
};

const updateAnnouncement = async (payload: any) => {
  isLoading.value = true;
  try {
    const formData = new FormData();
    formData.append('announcement', payload.id);
    formData.append('title', payload.title);
    formData.append('content', payload.content);
    formData.append('department', payload.department_id || '');
    if (payload.files && payload.files.length) {
      payload.files.forEach((file: File) => formData.append('file[]', file));
    }
    await GeneralController.storeItem('announcement/update-announcement', formData);
    alertService.toast('Announcement updated.');
    await fetchData();
  } catch (error) {
    console.error('Failed to update announcement:', error);
  } finally {
    isLoading.value = false;
  }
};

const deleteAnnouncement = async (id: number) => {
  isLoading.value = true;
  try {
    const formData = new FormData();
    formData.append('announcement', String(id));
    const response = await GeneralController.removeItem('announcement/remove-announcement', formData);
    if (response.ok) {
      alertService.toast('Announcement removed.');
      await fetchData();
    }
  } catch (error) {
    console.error('Failed to delete announcement:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="announcements-section mt-5">
    <div class="d-flex justify-space-between align-center mb-4">
      <div>
        <h3 class="text-h5 font-weight-bold">Academy Directives & Announcements</h3>
        <p class="text-caption text-secondary">ISO 9001:2026 Clause 7.4 Institutional Communication Board</p>
      </div>
      <v-btn color="primary" @click="showModal = true">
        <v-icon class="mr-1">mdi-plus</v-icon> Create Announcement
      </v-btn>
    </div>

    <template v-if="isLoading">
      <div class="d-flex justify-center align-center pa-10">
        <v-progress-circular indeterminate color="primary" size="48" />
      </div>
    </template>

    <div v-else-if="announcementPost.length > 0" class="announcements-list">
      <AnnouncementPost
        v-for="post in announcementPost"
        :key="post.id"
        :post="post"
        :departments="departments"
        @edit="updateAnnouncement"
        @delete="deleteAnnouncement"
      />
    </div>

    <v-card v-else border class="pa-8 text-center text-secondary" elevation="0">
      <v-icon size="48" class="mb-2" color="secondary">mdi-bullhorn-outline</v-icon>
      <p class="text-body-1 mb-0">No active announcements broadcasted.</p>
    </v-card>

    <!-- Create Dialog -->
    <v-dialog v-model="showModal" max-width="650">
      <v-card rounded="lg">
        <v-card-title class="pa-4 bg-primary text-white d-flex align-center justify-space-between">
          <span class="text-h6 font-weight-bold">Create QMS Broadcast</span>
          <v-btn icon variant="text" color="white" size="small" @click="showModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-4" v-if="!formLoader">
          <v-text-field v-model="form.title" label="Directive Title" variant="outlined" density="compact" class="mb-3" />
          <v-textarea v-model="form.content" label="Announcement Details" variant="outlined" density="compact" rows="4" class="mb-3" />
          <v-select
            v-model="form.department"
            :items="departments"
            item-title="name"
            item-value="id"
            label="Target Department"
            variant="outlined"
            density="compact"
            class="mb-3"
          />
          <v-file-input
            v-model="form.attachments"
            label="Attach Documents (PDF, Images)"
            multiple
            show-size
            variant="outlined"
            density="compact"
            accept=".pdf,.doc,.docx,.jpg,.png"
          />
        </v-card-text>

        <div v-else class="d-flex justify-center align-center pa-10">
          <v-progress-circular indeterminate color="primary" />
        </div>

        <v-card-actions class="pa-4 pt-0">
          <v-spacer />
          <v-btn variant="text" @click="showModal = false">Cancel</v-btn>
          <v-btn color="primary" variant="flat" @click="submitForm">Publish</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>