<template>
  <div class="aside">
    <div class="menu">
      <div 
        class="menu-item" 
        :class="{ active: $route.path.includes('/home/users') }"
        @click="router.push('/home/users')"
      >
        <span>用户管理</span>
      </div>
      <div class="menu-item">
        <span>权限管理</span>
      </div>
      <div class="menu-item">
        <span>商品管理</span>
      </div>
      <div class="menu-item">
        <span>订单管理</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style lang="less" scoped>
.aside {
  width: 200px;
  height: 100%;
  background-color: #304156;
  
  .menu {
    padding: 10px 0;
    
    .menu-item {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      color: #bfcbd9;
      cursor: pointer;
      
      &:hover {
        color: #fff;
        background-color: #263445;
      }
      
      &.active {
        color: #409eff;
        background-color: #263445;
      }
    }
  }
}
</style> 