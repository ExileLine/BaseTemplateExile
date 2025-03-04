<template>
  <div v-html="compiledMarkdown"></div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
// 引入 github 代码主题
import 'highlight.js/styles/github.css'

const props = defineProps({
  markdown: {
    type: String,
    required: true,
  },
})
const compiledMarkdown = computed(() => {
  const renderer = new marked.Renderer()
  renderer.code = ({ text, lang }) => {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    const highlighted = hljs.highlight(text, { language }).value
    return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`
  }
  return marked(props.markdown, { renderer })
})
onMounted(() => {
  hljs.highlightAll()
})
</script>
