<template>
  <t-dialog
    header="导入"
    width="800px"
    :visible="visible"
    :footer="null"
    @close="handleClose"
    @confirm="handleClose"
  >
    <t-select
      v-model="data.subject"
      clearable
      filterable
      placeholder="请选择考试科目"
      class="mb-10 wp-50"
    >
      <t-option v-for="item in subjectList" v-bind="item" :key="item.value" />
    </t-select>
    <t-select
      v-model="data.exam_type"
      clearable
      filterable
      placeholder="请选择考试类型"
      class="mb-10 wp-50"
    >
      <t-option v-for="item in examTypeList" v-bind="item" :key="item.value" />
    </t-select>
    <t-upload
      v-model="files"
      :action="action"
      placeholder="支持批量上传文件，文件格式(如：成绩明细.xlsx，试卷.pdf)，最多只能上传 2 份文件"
      theme="file-flow"
      multiple
      name="files"
      :max="2"
      :headers="headers"
      :data="data"
      :auto-upload="false"
      :upload-all-files-in-one-request="uploadAllFilesInOneRequest"
      :format-request="formatRequest"
      :format-response="formatResponse"
      @fail="handleFail"
      @success="handleSuccess"
    />
  </t-dialog>
</template>

<script setup lang="jsx">
import { inject, ref } from 'vue'
import { getToken } from '@/utils/store'
import { examTypeList, subjectList } from '@/variables'
const emit = defineEmits(['update:visible', 'success'])

const message = inject('message')
const action = import.meta.env.VITE_BASE_URL + 'api/score/upload'

const data = ref({ exam_type: '', subject: '' })
const files = ref([])

// 多个文件一个请求上传-true
const uploadAllFilesInOneRequest = true

const formatResponse = res => {
  if (!res) {
    return { status: 'fail', error: '上传失败，原因：文件过大或网络不通' }
  }
  return res
}

const headers = {
  token: getToken(),
}

const formatRequest = data => {
  return {
    ...data,
    file1: data.files[0],
    file2: data.files[1],
  }
}

const handleClose = () => {
  emit('update:visible', false)
}
const handleSuccess = () => {
  handleClose()
  files.value = []
  data.value.exam_type = ''
  data.value.subject = ''
  emit('success')
  message.success('上传成功')
}

const handleFail = resp => {
  if (!data.value.subject) {
    return message.error('请选择考试科目')
  }
  if (!data.value.exam_type) {
    return message.error('请选择考试类型')
  }
  message.error(JSON.parse(resp.XMLHttpRequest.response).message)
}
</script>

<style lang="scss" scoped></style>
