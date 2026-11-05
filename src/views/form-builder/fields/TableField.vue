<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

interface ColumnDef {
  model: string;
  label: string;
  type: 'text' | 'textarea' | 'number';
}

const props = defineProps<{
  field: {
    label: string;
    columns: ColumnDef[];
  };
  modelValue?: Record<string, any>[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, any>[]): void;
}>();

const source = ref<Record<string, any>[]>([]);

const createEmptyRow = () => {
  const row: Record<string, any> = { id: `row_${Date.now()}_${Math.random().toString(36).substr(2, 4)}` };
  props.field.columns.forEach((col) => {
    row[col.model] = '';
  });
  return row;
};

onMounted(() => {
  if (props.modelValue && props.modelValue.length > 0) {
    source.value = props.modelValue;
  } else {
    source.value = [createEmptyRow()];
  }
});

watch(
  source,
  (val) => {
    emit('update:modelValue', val);
  },
  { deep: true }
);

const addRow = () => {
  source.value.push(createEmptyRow());
};

const removeRow = (index: number) => {
  if (source.value.length > 1) {
    source.value.splice(index, 1);
  }
};
</script>

<template>
  <div class="pa-3 border rounded bg-surface">
    <h4 class="text-subtitle-2 font-weight-bold mb-2">{{ field.label }}</h4>

    <v-table density="compact" class="border rounded">
      <thead>
        <tr>
          <th v-for="col in field.columns" :key="col.model" class="text-left font-weight-bold">
            {{ col.label }}
          </th>
          <th style="width: 50px"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in source" :key="row.id || idx">
          <td v-for="col in field.columns" :key="col.model" class="py-1">
            <v-text-field
              v-if="col.type === 'text'"
              v-model="row[col.model]"
              density="compact"
              hide-details="auto"
              variant="outlined"
              color="primary"
            />
            <v-textarea
              v-else-if="col.type === 'textarea'"
              v-model="row[col.model]"
              density="compact"
              hide-details="auto"
              variant="outlined"
              color="primary"
              rows="1"
              auto-grow
            />
            <v-text-field
              v-else-if="col.type === 'number'"
              v-model="row[col.model]"
              type="number"
              density="compact"
              hide-details="auto"
              variant="outlined"
              color="primary"
            />
          </td>
          <td class="text-center py-1">
            <v-btn icon variant="text" size="x-small" color="error" :disabled="source.length <= 1" @click="removeRow(idx)">
              <v-icon size="16">mdi-close</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-btn size="small" variant="tonal" color="primary" class="mt-2 text-none" @click="addRow">
      + Add Row
    </v-btn>
  </div>
</template>