<template>
  <div class="container">
    <!-- 添加表单区域 -->
    <div class="card mb-4">
      <div class="card-header">学习计划表</div>
      <div class="card-body">
        <form @submit.prevent="add">
          <div class="row g-4">
            <div class="col-auto">
              <div class="input-group mb-3">
                <span class="input-group-text">学习科目</span>
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="请输入学习科目" 
                  v-model.trim="subject"
                />
              </div>
            </div>
            <div class="col-auto">
              <div class="input-group mb-3">
                <span class="input-group-text">学习内容</span>
                <textarea 
                  class="form-control" 
                  v-model.trim="content" 
                  placeholder="请输入学习内容" 
                  style="height: 32px;"
                ></textarea>
              </div>
            </div>
            <div class="col-auto">
              <div class="input-group mb-3">
                <span class="input-group-text">学习地点</span>
                <select class="form-select form-select-sm" v-model="selectedOption">
                  <option 
                    v-for="option in options" 
                    :value="option.place" 
                    :key="option.placeCode"
                  >
                    {{ option.place }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-auto">
              <button type="submit" class="btn btn-primary">添加</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- 表格区域 -->
    <table class="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col">序号</th>
          <th scope="col">学习科目</th>
          <th scope="col">学习内容</th>
          <th scope="col">学习地点</th>
          <th scope="col">完成状态</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.subject }}</td>
          <td>{{ item.content }}</td>
          <td>{{ item.place }}</td>
          <td>
            <div class="form-check form-switch">
              <input 
                class="form-check-input" 
                type="checkbox" 
                role="switch" 
                :id="'cb' + item.id" 
                v-model="item.status"
              />
              <label 
                class="form-check-label" 
                :for="'cb' + item.id"
              >
                {{ item.status ? '已完成' : '未完成' }}
              </label>
            </div>
          </td>
          <td>
            <a 
              href="javascript:;" 
              @click="remove(item.id, item.status)"
              class="text-danger text-decoration-none"
            >
              删除
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 表格数据
const list = ref([
  {
    id: '1',
    subject: 'Vue.js前端实战开发',
    content: '学习指令，例如v-if、v-for、v-model等',
    place: '自习室',
    status: false
  }
])

// 表单数据
const subject = ref('')
const content = ref('')
const selectedOption = ref('自习室')
const options = ref([
  { placeCode: 0, place: '自习室' },
  { placeCode: 1, place: '图书馆' },
  { placeCode: 2, place: '宿舍' }
])

// 删除方法
const remove = (id, status) => {
  if (!status) {
    alert('请完成该学习计划后再进行删除操作！')
    return
  }
  list.value = list.value.filter(item => item.id !== id)
}

// 添加方法
const add = () => {
  if (subject.value === '') {
    alert('学习科目为必填项！')
    return
  }

  // 计算新的ID
  const nextId = Math.max(...list.value.map(item => parseInt(item.id))) + 1

  // 创建新的学习计划对象
  const newPlan = {
    id: nextId.toString(),
    subject: subject.value,
    content: content.value,
    place: selectedOption.value,
    status: false
  }

  // 添加到列表
  list.value.push(newPlan)

  // 重置表单
  subject.value = ''
  content.value = ''
  selectedOption.value = '自习室'
}
</script>

<style scoped>
.form-check-input {
  cursor: pointer;
}

.form-check-label {
  cursor: pointer;
  user-select: none;
}
</style> 