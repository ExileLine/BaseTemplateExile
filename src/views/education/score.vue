<template>
  <page-container>
    <base-table
      ref="tableRef"
      :form-model="formModel"
      :field-list="fieldList"
      :columns="columns"
      :action-option-list="actionOptionList"
      url="/api/score/list"
    >
      <template #formActions>
        <t-button theme="primary" @click="importDialogVisible = true">导入</t-button>
        <!-- <t-button theme="success">导出</t-button> -->
      </template>
    </base-table>
  </page-container>

  <student-score-dialog v-model:visible="scoreDialogVisible" :data="scoreData" :params="params" />
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
const params = ref({})
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
    colKey: 'score_file_name',
    title: '成绩单文件名称',
  },
  {
    colKey: 'exam_file_name',
    title: '试卷文件名称',
  },

  {
    colKey: 'exam_type',
    title: '考试类型',
  },
  {
    colKey: 'create_time',
    title: '创建时间',
    minWidth: 100,
  },
]

const actionOptionList = [
  {
    content: '查看',
    value: 'browse',
    theme: 'primary',
    onClick({ row }) {
      params.value.batch = row.batch
      scoreDialogVisible.value = true
    },
  },
]
</script>

<style lang="scss" scoped></style>
