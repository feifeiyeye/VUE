<template>
  <div class="footer">
    <span class="todo-count">共<strong>{{ lastLength }}</strong>条未完成任务</span>
    <ul class="filters">
      <li><a href="#/" 
            :class="{ selected: status === 'all' }"
            @click.prevent="emit('updateStatus', 'all')">All</a></li>
      <li><a href="#/active" 
            :class="{ selected: status === 'active' }"
            @click.prevent="emit('updateStatus', 'active')">Active</a></li>
      <li><a href="#/completed" 
            :class="{ selected: status === 'completed' }"
            @click.prevent="emit('updateStatus', 'completed')">Completed</a></li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps(['lastLength', 'status'])
const emit = defineEmits(['updateStatus'])
</script> 