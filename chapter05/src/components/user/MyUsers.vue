<template>
  <!-- 用户管理页面容器 -->
  <div class="users-container">
    <!-- 页面标题 -->
    <h3>用户管理</h3>
    
    <!-- 表格容器 -->
    <div class="table-container">
      <table>
        <!-- 表格头部 -->
        <thead>
          <tr>
            <th>编号</th>
            <th>姓名</th>
            <th>等级</th>
            <th>操作</th>
          </tr>
        </thead>
        <!-- 表格主体内容 -->
        <tbody>
          <!-- 使用v-for指令遍历用户列表数据 -->
          <tr v-for="item in userlist" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.level }}</td>
            <td>
              <!-- 使用router-link进行路由跳转到用户详情页 -->
              <router-link :to="'/home/users/' + item.id">详情</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// 导入Vue的ref响应式API
import { ref } from 'vue';

// 定义用户列表数据，使用ref使其成为响应式数据
const userlist = ref([
  { id: 1, name: '张三', level: '普通用户' },
  { id: 2, name: '李四', level: 'VIP用户' },
  { id: 3, name: '王五', level: '管理员' }
]);
</script>

<style lang="less" scoped>
// 用户管理页面的样式
.users-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  
  // 标题样式
  h3 {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  
  // 表格容器样式
  .table-container {
    table {
      width: 100%;
      border-collapse: collapse;
      
      // 表格单元格样式
      th, td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #eee;
      }
      
      // 表头样式
      th {
        background-color: #fafafa;
        font-weight: bold;
      }
      
      // 链接样式
      a {
        color: #409eff;
        text-decoration: none;
        
        // 鼠标悬停效果
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style> 