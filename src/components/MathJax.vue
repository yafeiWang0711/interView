<template>
  <span ref="el"></span>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { mathjax } from 'mathjax/es5/tex-mml-chtml.js'
const props = defineProps({ content: String })
const el = ref(null)

function ensureMathJax() {
  if (!window.MathJax) {
    window.MathJax = mathjax({
      loader: { load: ['input/tex', 'output/chtml'] },
      tex: { inlineMath: [['\\(', '\\)']] },
      chtml: {}
    })
  }
}

function renderMath() {
  ensureMathJax()
  if (window.MathJax && el.value) {
    el.value.innerHTML = `\\(${props.content}\\)`
    window.MathJax.typesetPromise([el.value])
  }
}

onMounted(() => {
  renderMath()
})

watch(() => props.content, renderMath)
</script> 