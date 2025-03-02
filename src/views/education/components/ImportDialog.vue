<template>
  <t-dialog
    header="导入"
    width="800px"
    :visible="visible"
    :footer="null"
    @close="handleClose"
    @confirm="handleClose"
  >
    <t-input
      v-model="data.exam_type"
      placeholder="请输入考试类型(如：期中考，期末考，测验...)"
      class="mb-10"
    />
    <t-upload
      v-model="files"
      action="http://0.0.0.0:7766/api/score/upload"
      placeholder="支持批量上传文件，文件格式(如：成绩明细.xlsx，试卷.pdf)，最多只能上传 2 份文件"
      theme="file-flow"
      multiple
      name="files"
      :max="2"
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

const emit = defineEmits(['update:visible', 'success'])

const message = inject('message')

const data = ref({ exam_type: '' })
const files = ref([])
// 多个文件一个请求上传-true
const uploadAllFilesInOneRequest = true

const formatResponse = res => {
  if (!res) {
    return { status: 'fail', error: '上传失败，原因：文件过大或网络不通' }
  }
  return res
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
  emit('success')
  message.success('上传成功')
}

const handleFail = () => {
  if (!data.value.exam_type) {
    return message.error('请输入考试类型')
  }
  message.error('上传失败，原因：文件过大或网络不通')
}
</script>

<style lang="scss" scoped></style>
