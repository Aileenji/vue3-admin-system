<template>
  <div v-for="item of list" :key="item.id" data-test="todo">
    {{ item.text }}
  </div>
  {{ count }}
  <el-button @click="addTodo" type="primary">Add Todo</el-button>
</template>
<script setup lang="ts">
import {  ref } from 'vue'
const list = ref([
  {
    id: 1,
    text: 'Learn Vue.js 3',
  },
])
const count = ref(5)
const emits = defineEmits(['increment'])
function addTodo() {
  count.value += 1
  emits('increment', count.value)
}
</script>
