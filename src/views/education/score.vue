<template>
  <page-container>
    <base-table
      ref="tableRef"
      :form-model="formModel"
      :field-list="fieldList"
      :columns="columns"
      :action-option-list="actionOptionList"
      url="http://0.0.0.0:7766/api/score/page"
    >
      <template #formActions>
        <t-button theme="primary" @click="importDialogVisible = true">导入</t-button>
        <!-- <t-button theme="success">导出</t-button> -->
      </template>
    </base-table>
  </page-container>

  <student-score-dialog v-model:visible="scoreDialogVisible" :data="scoreData" />
  <import-dialog
    v-model:visible="importDialogVisible"
    :data="scoreData"
    @success="tableRef.getData = true"
  />
</template>

<script setup>
import { ref } from 'vue'
import ImportDialog from './components/ImportDialog.vue'
import StudentScoreDialog from './components/StudentScoreDialog.vue'

const tableRef = ref()
const formModel = ref({})
const scoreDialogVisible = ref(false)
const importDialogVisible = ref(false)

const scoreData = [
  {
    1: 3,
    2: 3,
    3: 3,
    4: 3,
    5: 3,
    6: 3,
    7: 3,
    8: 3,
    9: 3,
    10: 3,
    11: 3,
    12: 3,
    13: 3,
    14: 3,
    15: 3,
    16: 3,
    17: 3,
    18: 3,
    19: 3,
    20: 3,
  },
]

const fieldList = [
  {
    value: 'batch',
    label: '批次',
  },
  {
    value: 'student_name',
    label: '学生姓名',
  },
  {
    value: 'student_code',
    label: '准考证号',
  },
  {
    value: 'student_class',
    label: '班级',
  },
  {
    value: 'exam_type',
    label: '考试类型',
    component: 't-select',
    list: [
      { value: 'midterm', label: '期中考' },
      { value: 'final', label: '期末考' },
    ],
    on: {
      change() {
        tableRef.value.getData = true
      },
    },
  },
]

const columns = [
  {
    colKey: 'serial-number',
    title: '序号',
    width: 80,
  },
  {
    colKey: 'batch',
    title: '批次',
    width: 140,
  },
  {
    colKey: 'exam_type',
    title: '考试类型',
  },
  {
    colKey: 'student_name',
    title: '学生姓名',
    minWidth: 100,
  },
  {
    colKey: 'student_code',
    title: '准考证号',
    minWidth: 160,
  },
  {
    colKey: 'custom_code',
    title: '自定义考号',
    minWidth: 160,
  },
  {
    colKey: 'student_class',
    title: '班级',
    minWidth: 100,
  },
  {
    colKey: 'total_score',
    title: '总分',
    minWidth: 100,
  },
  {
    colKey: 'school_ranking',
    title: '校次',
    minWidth: 100,
  },
  {
    colKey: 'school_active_ranking',
    title: '校次进退步',
    minWidth: 160,
  },
  {
    colKey: 'class_ranking',
    title: '班次',
    minWidth: 100,
  },
  {
    colKey: 'class_active_ranking',
    title: '班次进退步',
    minWidth: 160,
  },
  {
    colKey: 'subjective_score',
    title: '主观分',
    minWidth: 100,
  },
  {
    colKey: 'objective_score',
    title: '客观分',
    minWidth: 100,
  },
  {
    colKey: 'essay',
    title: '解答题',
    minWidth: 100,
  },
  {
    colKey: 'cloze',
    title: '填空题',
    minWidth: 100,
  },
  {
    colKey: 'multiple_choice',
    title: '单选题',
    minWidth: 100,
  },
]

const actionOptionList = [
  {
    content: '查看',
    value: 'browse',
    theme: 'primary',
    onClick() {
      scoreDialogVisible.value = true
    },
  },
]
</script>

<style lang="scss" scoped></style>
