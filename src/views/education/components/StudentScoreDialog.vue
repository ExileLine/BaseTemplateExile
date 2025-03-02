<template>
  <t-dialog
    header="分数"
    width="1200px"
    :visible="visible"
    :footer="null"
    @close="handleClose"
    @confirm="handleClose"
  >
    <t-table bordered :data="data" :columns="columns" :max-height="500" />
  </t-dialog>
</template>

<script setup lang="jsx">
import { computed } from 'vue'
import { get, keys, range } from 'lodash-es'
const props = defineProps({
  visible: Boolean,
  data: Array,
})

const emit = defineEmits(['update:visible'])
const columns = computed(() =>
  range(keys(get(props.data, '0')).length).map(i => ({
    colKey: i + 1,
    title: `第${i + 1}题`,
    render(h, { type, row }) {
      if (type === 'title') return
      return <span>{row[i + 1]}分</span>
    },
  }))
)
const handleClose = () => {
  emit('update:visible', false)
}
</script>

<style lang="scss" scoped></style>
