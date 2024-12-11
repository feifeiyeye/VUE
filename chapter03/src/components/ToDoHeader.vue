<template>
  <div>
    <div class="header">
      <p class="title">todos</p>
      <input 
        class="new-todo" 
        type="text" 
        placeholder="请填写任务" 
        v-model.trim="name"
        @keyup.enter="enterName"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['addTodo'])
const name = ref('')

const enterName = () => {
  if (!name.value) return
  emit('addTodo', name.value)
  name.value = ''
}
</script> 