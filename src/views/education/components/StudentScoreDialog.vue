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
      :height="500"
      url="/api/score/page"
    />
  </t-dialog>
</template>

<script setup lang="jsx">
import { nextTick, ref } from 'vue'

const props = defineProps({
  visible: Boolean,
  params: Object,
})
const emit = defineEmits(['update:visible'])

const tableRef = ref()
const formModel = ref({})

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
