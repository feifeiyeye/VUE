<template>
  <div class="main">
    <ul class="todo-list">
      <li v-for="item in list" 
          :key="item.id" 
          :class="{ completed: item.done }">
        <div class="view">
          <input 
            class="toggle" 
            type="checkbox" 
            v-model="item.done"
          />
          <label>{{ item.name }}</label>
          <button 
            class="destroy"
            @click="delTodo(item.id)"
          ></button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps(['list'])
const emit = defineEmits(['delTodo'])

const delTodo = (id) => {
  emit('delTodo', id)
}
</script> 