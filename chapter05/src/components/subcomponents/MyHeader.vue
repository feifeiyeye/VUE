<template>
  <div class="header">
    <div class="logo">后台管理系统</div>
    <div class="user-info">
      <span>欢迎您，admin</span>
      <button type="button" class="btn btn-light" @click="onLogout">退出</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const onLogout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  
  .logo {
    font-size: 20px;
    font-weight: bold;
  }
  
  .user-info {
    span {
      margin-right: 15px;
    }
    
    .btn {
      padding: 5px 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
      
      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
}
</style> 