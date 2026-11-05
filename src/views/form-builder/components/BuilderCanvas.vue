<script setup lang="ts">
import { ref, computed } from 'vue';
import TextField from '../fields/TextField.vue';
import SelectField from '../fields/SelectField.vue';
import RadioField from '../fields/RadioField.vue';
import CheckboxField from '../fields/CheckboxField.vue';
import TableField from '../fields/TableField.vue';
import { GeneralController } from '@/stores/GeneralController';
import alertService from '@/services/alertService';

const props = withDefaults(
  defineProps<{
    formList: any[];
    form?: any;
  }>(),
  {
    form: () => ({
      form_id: null,
      form_name: '',
      form_code: '',
      form_schema: [],
      pageProperties: { pageSize: 'a4', orientation: 'portrait', pageModifiers: 'whole' }
    })
  }
);

const emit = defineEmits(['save']);

const activeIndex = ref<number | null>(null);
const activeField = ref<any>(null);
const selectedForm = ref<any>(null);

const basicTypes = [
  { inputType: 'text', type: 'text', label: 'Text Input', icon: 'mdi-form-textbox' },
  { inputType: 'text', type: 'textarea', label: 'Textarea', icon: 'mdi-text-box-outline' },
  { inputType: 'text', type: 'number', label: 'Number Input', icon: 'mdi-numeric' },
  { inputType: 'text', type: 'date', label: 'Date Picker', icon: 'mdi-calendar' }
];

const selectionTypes = [
  { inputType: 'checkbox', type: 'checkbox', label: 'Checkbox Group', icon: 'mdi-checkbox-marked-outline' },
  { inputType: 'radio', type: 'radio', label: 'Radio Group', icon: 'mdi-radiobox-marked' },
  { inputType: 'select', type: 'select', label: 'Select Dropdown', icon: 'mdi-menu-down-outline' }
];

const advanced = [
  { inputType: 'table', type: 'table', label: 'Data Grid / Table', icon: 'mdi-table-edit' }
];

const pageProperties = computed({
  get: () => props.form.pageProperties || { pageSize: 'a4', orientation: 'portrait', pageModifiers: 'whole' },
  set: (val) => { props.form.pageProperties = val; }
});

const openModel = ref(false);
const uploadModal = ref(false);
const formInfo = ref({ isModalLoading: true, content: [] as any[], link: null as string | null });
const fileName = ref('');

const resolveComponent = (type: string) => {
  switch (type) {
    case 'text': return TextField;
    case 'select': return SelectField;
    case 'radio': return RadioField;
    case 'checkbox': return CheckboxField;
    case 'table': return TableField;
    default: return TextField;
  }
};

const activeFieldFunction = (index: number | string) => {
  const fieldIndex = Number(index);
  activeIndex.value = fieldIndex;
  activeField.value = props.form.form_schema[fieldIndex];
};

const onFormChange = (item: any) => {
  if (!item) return;
  props.form.form_name = item.title || item.raw?.form_name;
  props.form.form_id = item.value || item.raw?.id;
  props.form.form_code = item.raw?.form_code;
};

const addField = (item: any) => {
  const hasOptions = ['checkbox', 'radio', 'select'].includes(item.type);
  const newField: any = {
    id: `field_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    inputType: item.inputType,
    type: item.type,
    label: `${item.label} ${props.form.form_schema.length + 1}`,
    model: `field_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    options: hasOptions ? ['Option 1', 'Option 2'] : null
  };

  if (item.type === 'table') {
    newField.columns = [
      { id: `col_${Math.random().toString(36).substr(2, 5)}`, label: 'New Column', type: 'text', model: `col_1` }
    ];
  }

  props.form.form_schema.push(newField);
  const index = props.form.form_schema.length - 1;
  activeFieldFunction(index);
};

const removeField = (id: string | number) => {
  const idx = props.form.form_schema.findIndex((f: any) => f.id === id);
  if (idx !== -1) {
    props.form.form_schema.splice(idx, 1);
    activeField.value = null;
    activeIndex.value = null;
  }
};

const saveForm = () => {
  props.form.pageProperties = pageProperties.value;
  emit('save', props.form);
  alertService.toast('Form schema saved successfully.');
};

const resetForm = () => {
  props.form.form_schema = [];
  activeField.value = null;
  activeIndex.value = null;
};

const handleFileUpload = (value: any) => {
  const file = Array.isArray(value) ? value[0] : value;
  if (!file) return;

  fileName.value = file.name;
  const reader = new FileReader();
  reader.onload = (e: any) => {
    try {
      const jsonData = JSON.parse(e.target.result);
      props.form.form_schema = typeof jsonData.form_schema === 'string' ? JSON.parse(jsonData.form_schema) : jsonData.form_schema;
      props.form.form_id = jsonData.form_id;
      props.form.form_code = jsonData.form_code;
      props.form.form_name = jsonData.form_name;
      uploadModal.value = false;
      alertService.toast('Schema imported.');
    } catch (err) {
      alertService.error('Invalid QMS form schema JSON.');
    }
  };
  reader.readAsText(file);
};
</script>

<template>
  <v-row no-gutters class="fill-height">
    <!-- Toolbox Panel -->
    <v-col cols="12" md="2" class="border-right bg-surface pa-4">
      <h3 class="text-subtitle-1 font-weight-bold mb-3">Form Components</h3>

      <span class="text-caption font-weight-bold text-secondary d-block mb-2">INPUTS</span>
      <v-btn
        v-for="item in basicTypes"
        :key="item.type"
        block
        variant="outlined"
        color="primary"
        size="small"
        class="mb-2 text-none justify-start"
        @click="addField(item)"
      >
        <v-icon size="small" class="mr-2">{{ item.icon }}</v-icon>
        {{ item.label }}
      </v-btn>

      <span class="text-caption font-weight-bold text-secondary d-block mt-4 mb-2">SELECTION</span>
      <v-btn
        v-for="item in selectionTypes"
        :key="item.type"
        block
        variant="outlined"
        color="secondary"
        size="small"
        class="mb-2 text-none justify-start"
        @click="addField(item)"
      >
        <v-icon size="small" class="mr-2">{{ item.icon }}</v-icon>
        {{ item.label }}
      </v-btn>

      <span class="text-caption font-weight-bold text-secondary d-block mt-4 mb-2">ADVANCED</span>
      <v-btn
        v-for="item in advanced"
        :key="item.type"
        block
        variant="outlined"
        color="info"
        size="small"
        class="mb-2 text-none justify-start"
        @click="addField(item)"
      >
        <v-icon size="small" class="mr-2">{{ item.icon }}</v-icon>
        {{ item.label }}
      </v-btn>
    </v-col>

    <!-- Canvas Builder Area -->
    <v-col cols="12" md="7" class="pa-4">
      <v-card border elevation="0" class="pa-4 mb-4">
        <v-row align="center">
          <v-col cols="12" md="8">
            <v-autocomplete
              v-model="selectedForm"
              :items="formList"
              item-title="form_name"
              item-value="id"
              label="Select Target QMS Form"
              variant="outlined"
              density="compact"
              hide-details
              return-object
              @update:modelValue="onFormChange"
            />
          </v-col>
          <v-col cols="12" md="4" class="text-right">
            <v-btn color="info" size="small" variant="tonal" @click="uploadModal = true">
              Import JSON
            </v-btn>
          </v-col>
        </v-row>
      </v-card>

      <v-card border elevation="0" class="pa-4">
        <h4 class="text-h6 font-weight-bold mb-3">{{ form?.form_name || 'Untitled Form Schema' }}</h4>
        
        <div class="d-flex gap-2 mb-4">
          <v-select v-model="pageProperties.pageSize" :items="['a4', 'letter', 'legal']" label="Page Size" variant="outlined" density="compact" hide-details />
          <v-select v-model="pageProperties.orientation" :items="['portrait', 'landscape']" label="Orientation" variant="outlined" density="compact" hide-details />
        </div>

        <div v-if="!form?.form_schema?.length" class="text-center py-10 border rounded border-dashed">
          <v-icon size="48" color="secondary">mdi-form-select</v-icon>
          <p class="text-caption text-secondary mt-2">Click components on the left toolbox to build form inputs.</p>
        </div>

        <template v-else>
          <div
            v-for="(field, index) in form.form_schema"
            :key="field.id"
            class="pa-2 border rounded mb-2 cursor-pointer"
            :class="{ 'bg-blue-lighten-5 border-primary': activeIndex === index }"
            @click="activeFieldFunction(index)"
          >
            <component :is="resolveComponent(field.inputType)" v-model="field.model" :field="field" />
          </div>

          <div class="d-flex gap-2 mt-4">
            <v-btn color="primary" variant="flat" @click="saveForm">Save Form Schema</v-btn>
            <v-btn color="error" variant="outlined" @click="resetForm">Clear Canvas</v-btn>
          </div>
        </template>
      </v-card>
    </v-col>

    <!-- Properties Editor Sidebar -->
    <v-col cols="12" md="3" class="border-left bg-surface pa-4">
      <h3 class="text-subtitle-1 font-weight-bold mb-3">Field Properties</h3>

      <div v-if="activeField">
        <v-text-field v-model="activeField.label" label="Field Label" variant="outlined" density="compact" class="mb-3" />
        <v-text-field v-model="activeField.model" label="Field Key / Model" variant="outlined" density="compact" class="mb-3" />
        <v-switch v-model="activeField.required" label="Required Field" color="primary" density="compact" hide-details class="mb-4" />

        <v-btn color="error" block variant="outlined" size="small" @click="removeField(activeField.id)">
          Delete Field
        </v-btn>
      </div>

      <div v-else class="text-center py-10 text-secondary">
        <v-icon size="36" class="mb-2">mdi-cursor-default-click-outline</v-icon>
        <p class="text-caption">Select a field on the canvas to configure its properties.</p>
      </div>
    </v-col>
  </v-row>

  <!-- Import Modal -->
  <v-dialog v-model="uploadModal" max-width="400">
    <v-card rounded="lg" class="pa-4">
      <v-card-title class="px-0 pt-0 text-h6 font-weight-bold">Import Form Schema</v-card-title>
      <v-file-input label="Upload JSON File" accept=".json" variant="outlined" density="compact" @update:modelValue="handleFileUpload" />
    </v-card>
  </v-dialog>
</template>