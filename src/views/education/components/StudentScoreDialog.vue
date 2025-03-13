<template>
  <t-dialog
    header="分数"
    width="1480px"
    :visible="visible"
    :footer="null"
    placement="center"
    @close="handleClose"
    @confirm="handleClose"
    @before-open="handleBeforeOpen"
  >
    <base-table
      ref="tableRef"
      :form-model="formModel"
      :field-list="fieldList"
      :columns="columns"
      :action-option-list="actionOptionList"
      :height="500"
      url="/api/score/page"
    />
  </t-dialog>
</template>

<script setup lang="jsx">
import { examTypeList } from '@/variables'
import { confirmDialog } from '@/utils/business'
import { nextTick, ref, inject } from 'vue'
import { fetchScoreGenStudentQa } from '@/api/education'

const props = defineProps({
  visible: Boolean,
  params: Object,
})
const emit = defineEmits(['update:visible'])

const tableRef = ref()
const formModel = ref({})
const message = inject('message')

const fieldList = [
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
    content: '成绩分析',
    value: 'chart-analytics',
    theme: 'success',
    async onClick({ row }) {
      const dialog = await confirmDialog(
        <div>
          <span class="text-warning-6">学生成绩分析功能请开通 Plus 版本</span>
        </div>
      )
      await fetchScoreGenStudentQa(row)
      dialog.hide()
      message.success('操作成功')
    },
  },
  {
    content: '生题',
    value: 'mode-light',
    theme: 'warning',
    async onClick({ row }) {
      const dialog = await confirmDialog(
        <div>
          <span class="text-warning-6">学生生题功能请开通 Pro 版本</span>
        </div>
      )
      await fetchScoreGenStudentQa(row)
      dialog.hide()
      message.success('操作成功')
    },
  },
]

const handleBeforeOpen = () => {
  formModel.value.batch = props.params.batch
  nextTick(() => {
    tableRef.value.getData = true
  })
}
const handleClose = () => {
  emit('update:visible', false)
  formModel.value = {}
}
</script>

<style lang="scss" scoped></style>
