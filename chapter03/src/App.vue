<template>
  <ToDoHeader @addTodo="addTodo"/>
  <ToDoMain 
    :list="showList"
    @delTodo="delTodo"
  />
  <ToDoFooter 
    :lastLength="lastLength"
    :status="status"
    @updateStatus="updateStatus"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import ToDoHeader from './components/ToDoHeader.vue'
import ToDoMain from './components/ToDoMain.vue'
import ToDoFooter from './components/ToDoFooter.vue'

const list = ref([
  { id: 1, name: '晨练', done: false },
  { id: 2, name: '练书法', done: true }
])

const status = ref('all')

// 计算未完成任务数量
const lastLength = computed(() => {
  return list.value.filter(item => !item.done).length
})

// 根据状态筛选任务
const showList = computed(() => {
  if (status.value === 'all') return list.value
  if (status.value === 'active') return list.value.filter(item => !item.done)
  if (status.value === 'completed') return list.value.filter(item => item.done)
  return list.value
})

// 添加任务
const addTodo = (name) => {
  list.value.push({
    id: Date.now(),
    name,
    done: false
  })
}

// 删除任务
const delTodo = (id) => {
  list.value = list.value.filter(item => item.id !== id)
}

// 更新状态
const updateStatus = (newStatus) => {
  status.value = newStatus
}
</script>

<style>
#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
