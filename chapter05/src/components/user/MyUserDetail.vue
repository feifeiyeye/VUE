<template>
  <div class="detail-container">
    <h4>用户 {{ props.id }} 的详情页面</h4>
    
    <!-- 用户详细信息卡片组件 -->
    <div class="user-card">
      <!-- 用户ID信息项 -->
      <div class="info-item">
        <span class="label">用户ID：</span>
        <span class="value">{{ userInfo.id }}</span>
      </div>
      <!-- 用户名信息项 -->
      <div class="info-item">
        <span class="label">用户名：</span>
        <span class="value">{{ userInfo.name }}</span>
      </div>
      <!-- 用户等级信息项 -->
      <div class="info-item">
        <span class="label">用户等级：</span>
        <span class="value">{{ userInfo.level }}</span>
      </div>
      <!-- 注册时间信息项 -->
      <div class="info-item">
        <span class="label">注册时间：</span>
        <span class="value">{{ userInfo.registerTime }}</span>
      </div>
      <!-- 账户状态信息项 -->
      <div class="info-item">
        <span class="label">账户状态：</span>
        <span class="value" :class="{ 'status-active': userInfo.status === '正常' }">
          {{ userInfo.status }}
        </span>
      </div>
    </div>

    <!-- 后退按钮 -->
    <button class="back-btn" @click="goBack">后退</button>
  </div>
</template>

<script setup>
// 导入所需的Vue组件和路由
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// 定义组件属性
const props = defineProps({
  id: String  // 用户ID属性
})

// 初始化路由
const router = useRouter()

// 定义用户信息响应式数据
const userInfo = ref({
  id: props.id,
  name: '张三',
  level: 'VIP用户',
  registerTime: '2024-03-20',
  status: '正常'
})

// 返回上一页方法
const goBack = () => {
  router.back()
}

// 组件挂载时的生命周期钩子
onMounted(() => {
  // 这里可以添加实际的API调用来获取用户数据
  console.log('获取用户详情数据')
})
</script>

<style scoped>
/* 详情容器样式 */
.detail-container {
  padding: 20px;
}

/* 用户信息卡片样式 */
.user-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

/* 信息项样式 */
.info-item {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

/* 标签样式 */
.label {
  width: 100px;
  color: #606266;
  font-weight: bold;
}

/* 值样式 */
.value {
  color: #333;
}

/* 激活状态样式 */
.status-active {
  color: #67c23a;
  font-weight: bold;
}

/* 后退按钮样式 */
.back-btn {
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* 后退按钮悬停效果 */
.back-btn:hover {
  background-color: #66b1ff;
}
</style> 