<template>
  <page-container>
    <base-table
      ref="tableRef"
      :form-model="formModel"
      :field-list="fieldList"
      :columns="columns"
      :action-option-list="actionOptionList"
      url="/api/score/exam_qa_page"
    >
      <template #formActions>
        <!-- <t-button theme="success">导出</t-button> -->
      </template>
    </base-table>
  </page-container>

  <t-image-viewer v-model:visible="imgageVisible" :images="images" />
</template>

<script setup lang="jsx">
import { inject, ref } from 'vue'
import { find, get } from 'lodash-es'
import { DialogPlugin, Message } from 'tdesign-vue-next'
import useClipboard from 'vue-clipboard3'
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'
import { downloadSourceZip } from '@/api/education'
import { downloadFile } from '@/utils/download'
const { toClipboard } = useClipboard()

const message = inject('message')

const tableRef = ref()
const formModel = ref({})

const imgageVisible = ref(false)
const images = ref([])
const procesStatusList = [
  {
    value: 'WAIT',
    label: '等待',
    theme: 'default',
  },
  {
    value: 'PROCESSING',
    label: '处理中',
    theme: 'primary',
  },
  {
    value: 'SUCCESS',
    label: '完成',
    theme: 'success',
  },
  {
    value: 'FAIL',
    label: '失败',
    theme: 'danger',
  },
]
const fieldList = [
  {
    value: 'uuid',
    label: '批次',
  },
  {
    value: 'process_status',
    label: '状态',
    component: 't-select',
    list: procesStatusList,
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
    colKey: 'uuid',
    title: '批次',
  },
  // {
  //   colKey: 'file_list',
  //   title: '文件',
  //   minWidth: 100,
  //   render(h, { type, row }) {
  //     if (type === 'title') return
  //     return <t-icon name="browse" />
  //   },
  // },
  {
    colKey: 'process_status',
    title: '处理状态',
    minWidth: 160,
    render(h, { type, row }) {
      if (type === 'title') return
      const process_status = find(procesStatusList, { value: row.process_status })
      return (
        <t-button variant="text" theme={process_status.theme}>
          {get(process_status, 'label')}
        </t-button>
      )
    },
  },
  {
    colKey: 'analyze_result_content',
    title: '题目明细',
    minWidth: 160,
    render(h, { type, row }) {
      if (type === 'title') return
      return (
        <t-button
          theme="primary"
          variant="text"
          onClick={() => {
            const alertDia = DialogPlugin.alert({
              header: '内容',
              body: <MarkdownRenderer markdown={row.analyze_result_content} />,
              width: '1000px',
              placement: 'center',
              confirmBtn: {
                content: '复制',
              },
              onConfirm: () => {
                toClipboard(row.analyze_result_content)
              },
            })
          }}
        >
          <t-icon name="file-word" />
        </t-button>
      )
    },
  },
  {
    colKey: 'analyze_result_image',
    title: '相关图片',
    minWidth: 160,
    render(h, { type, row }) {
      if (type === 'title') return
      return (
        <t-icon
          name="browse"
          onClick={() => {
            if (!row.analyze_result_image?.length) return message.warning('暂无图片')
            images.value = row.analyze_result_image
            imgageVisible.value = true
          }}
        />
      )
    },
  },
  // {
  //   colKey: 'analyze_result_file',
  //   title: '分析报告',
  //   minWidth: 160,
  //   render(h, { type, row }) {
  //     if (type === 'title') return
  //     return <t-icon name="browse" />
  //   },
  // },
  {
    colKey: 'creator',
    title: '创建人',
    minWidth: 160,
  },
  {
    colKey: 'create_time',
    title: '创建时间',
    minWidth: 160,
  },
]

const actionOptionList = [
  // {
  //   content: '查看',
  //   value: 'browse',
  //   theme: 'primary',
  //   onClick() {
  //     scoreDialogVisible.value = true
  //   },
  // },
  {
    content: '下载源文件',
    value: 'file-zip',
    theme: 'success',
    async onClick({ row }) {
      // downloadSourceZip({ uuid: row.uuid })
      // window.open('/api/score/downloadSourceZip?uuid=' + row.uuid)
      const file = await downloadSourceZip({ uuid: row.uuid })
      downloadFile(file, '源文件.zip')
    },
  },
  {
    content: '下载分析报告',
    value: 'file-pdf',
    theme: 'danger',
    async onClick({ row }) {
      // https://www.metatuple.com/self_line/apd.pdf
      // const blob = await downloadSourceZip({ uuid: row.uuid })
      // downloadFile(blob, row.file + '-分析报告.pdf')
      // window.open('https://www.metatuple.com/self_line/apd.pdf', '_blank')
      window.open(row.analyze_result_file, '_blank')
    },
  },
]
</script>

<style lang="scss" scoped></style>
