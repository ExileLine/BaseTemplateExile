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

<script setup lang="jsx">
import { ref, inject } from 'vue'
import ImportDialog from './components/ImportDialog.vue'
import StudentScoreDialog from './components/StudentScoreDialog.vue'
import { examTypeList, subjectList } from '@/variables'
import { confirmDialog } from '@/utils/business'
import { fetchScoreDelete, fetchScoreGenQa } from '@/api/education'

const tableRef = ref()
const formModel = ref({})
const params = ref({})
const scoreDialogVisible = ref(false)
const importDialogVisible = ref(false)
const message = inject('message')

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
    value: 'subject',
    label: '科目',
    component: 't-select',
    list: subjectList,
    on: {
      change() {
        tableRef.value.getData = true
      },
    },
  },
  {
    value: 'exam_type',
    label: '考试类型',
    component: 't-select',
    list: examTypeList,
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
    colKey: 'subject',
    title: '科目',
  },
  {
    colKey: 'exam_type',
    title: '考试类型',
  },
  {
    colKey: 'creator',
    title: '创建者',
    minWidth: 100,
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
  {
    content: '生题',
    value: 'mode-light',
    theme: 'warning',
    async onClick({ row }) {
      const dialog = await confirmDialog(
        <div>
          是否生成试卷：
          <span class="text-warning-6">{row.exam_file_name} </span>
          题目，减少一次生题次数。
        </div>
      )
      await fetchScoreGenQa(row)
      dialog.hide()
      message.success('操作成功')
    },
  },
  {
    content: '删除',
    value: 'delete',
    theme: 'danger',
    async onClick({ row }) {
      const dialog = await confirmDialog(
        <div>
          是否删除成绩：
          <span class="text-warning-6">{row.score_file_name} </span>
        </div>
      )
      await fetchScoreDelete(row)
      dialog.hide()
      tableRef.value.getData = true
      message.success('操作成功')
    },
  },
]
</script>

<style lang="scss" scoped></style>
