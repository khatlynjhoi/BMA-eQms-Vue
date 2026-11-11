<script setup lang="ts">
import { ref } from 'vue';
import alertService from '@/services/alertService';

export interface PostAttachment {
  filename: string;
  link: string;
  [key: string]: any;
}

export interface AnnouncementItem {
  id: number;
  title: string;
  content: string;
  created_at: string;
  department_id?: number | null;
  owner?: boolean;
  creator?: {
    name?: string;
    profile?: string;
  };
  files?: PostAttachment[];
}

const props = withDefaults(
  defineProps<{
    post: AnnouncementItem;
    departments?: Array<{ id: number | null; name: string }>;
  }>(),
  {
    departments: () => []
  }
);

const emit = defineEmits<{
  (e: 'edit', payload: { id: number; title: string; content: string; department_id: number | null; files: File[] }): void;
  (e: 'delete', id: number): void;
}>();

const showViewer = ref(false);
const selectedFile = ref<PostAttachment | null>(null);
const editDialog = ref(false);
const updatedTitle = ref('');
const updatedContent = ref('');
const updatedFiles = ref<File[]>([]);
const updatedDepartment = ref<number | null>(null);

const isImage = (file: PostAttachment) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file.link);
const isPDF = (file: PostAttachment) => /\.pdf$/i.test(file.link);

const openViewer = (file: PostAttachment) => {
  selectedFile.value = file;
  showViewer.value = true;
};

const openEdit = () => {
  updatedTitle.value = props.post.title;
  updatedContent.value = props.post.content;
  updatedDepartment.value = props.post.department_id || null;
  updatedFiles.value = [];
  editDialog.value = true;
};

const saveEdit = () => {
  emit('edit', {
    id: props.post.id,
    title: updatedTitle.value,
    content: updatedContent.value,
    department_id: updatedDepartment.value,
    files: updatedFiles.value
  });
  editDialog.value = false;
};

const confirmDelete = async () => {
  const confirmed = await alertService.confirm('Are you sure you want to remove this announcement?');
  if (confirmed.isConfirmed) {
    emit('delete', props.post.id);
  }
};
</script>

<template>
  <v-card border elevation="0" class="bg-surface rounded-lg mb-4">
    <v-card-text class="pa-4">
      <div class="d-flex ga-4 justify-space-between align-center">
        <div class="d-flex ga-3 align-center">
          <v-avatar size="48" rounded="md" color="grey-lighten-3">
            <v-img :src="post.creator?.profile || '/src/assets/images/users/avatar-1.png'" cover alt="User Avatar" />
          </v-avatar>
          <div>
            <h5 class="text-subtitle-1 font-weight-bold mb-0">{{ post.creator?.name || 'QMS Administrator' }}</h5>
            <span class="text-caption text-secondary">{{ post.created_at }}</span>
          </div>
        </div>
        <div v-if="post.owner" class="d-flex gap-1">
          <v-btn icon variant="text" size="small" color="primary" aria-label="Edit Post" @click="openEdit">
            <v-icon size="18">mdi-pencil-outline</v-icon>
          </v-btn>
          <v-btn icon variant="text" size="small" color="error" aria-label="Delete Post" @click="confirmDelete">
            <v-icon size="18">mdi-trash-can-outline</v-icon>
          </v-btn>
        </div>
      </div>
    </v-card-text>

    <v-card-text class="pt-0">
      <h4 class="text-h6 font-weight-bold text-primary mb-2">{{ post.title }}</h4>
      <p class="text-body-2 text-high-emphasis mb-0" style="white-space: pre-line">{{ post.content }}</p>
    </v-card-text>

    <!-- Attachments Grid -->
    <v-card-text v-if="post.files && post.files.length" class="pt-2">
      <span class="text-caption font-weight-bold text-secondary mb-2 d-block">ATTACHED DOCUMENTED INFORMATION</span>
      <div class="d-flex flex-wrap ga-3">
        <div
          v-for="(file, index) in post.files"
          :key="index"
          @click="openViewer(file)"
          class="d-flex align-center border rounded pa-2 cursor-pointer bg-grey-lighten-5"
          style="max-width: 260px"
        >
          <v-icon color="error" class="mr-2" v-if="isPDF(file)">mdi-file-pdf-box</v-icon>
          <v-icon color="primary" class="mr-2" v-else-if="isImage(file)">mdi-file-image-outline</v-icon>
          <v-icon color="secondary" class="mr-2" v-else>mdi-file-document-outline</v-icon>
          <span class="text-caption text-truncate">{{ file.filename }}</span>
        </div>
      </div>
    </v-card-text>

    <!-- File Viewer Modal -->
    <v-dialog v-model="showViewer" max-width="900">
      <v-card rounded="lg">
        <v-toolbar flat density="compact" color="surface">
          <v-toolbar-title class="text-subtitle-1 font-weight-bold">Attachment Preview</v-toolbar-title>
          <v-spacer />
          <v-btn icon variant="text" size="small" aria-label="Close Preview" @click="showViewer = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-0">
          <iframe
            v-if="selectedFile"
            :src="`${selectedFile.link}#toolbar=0`"
            style="width: 100%; height: 75vh; border: none"
          />
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Edit Dialog -->
    <v-dialog v-model="editDialog" max-width="600">
      <v-card rounded="lg">
        <v-card-title class="pa-4 bg-primary text-white">Edit Announcement Directive</v-card-title>
        <v-card-text class="pa-4">
          <v-text-field v-model="updatedTitle" label="Title*" variant="outlined" density="compact" class="mb-3" />
          <v-textarea v-model="updatedContent" label="Content*" variant="outlined" density="compact" rows="4" class="mb-3" />
          <v-select
            v-model="updatedDepartment"
            :items="departments"
            item-title="name"
            item-value="id"
            label="Target Department"
            variant="outlined"
            density="compact"
            class="mb-3"
          />
          <v-file-input v-model="updatedFiles" label="Add New Attachments" multiple show-size variant="outlined" density="compact" />
        </v-card-text>
        <v-card-actions class="pa-4 pt-0">
          <v-spacer />
          <v-btn variant="text" @click="editDialog = false">Cancel</v-btn>
          <v-btn color="primary" variant="flat" @click="saveEdit">Save Changes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>