<template>
  <div class="home-container">
    <!-- 顶部导航栏组件 -->
    <my-header></my-header>
    <div class="home-main-box">
      <!-- 侧边栏组件 -->
      <my-aside></my-aside>
      <!-- 主要内容区域 -->
      <div class="home-main-body">
        <!-- 路由出口 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// 导入子组件
import MyHeader from './subcomponents/MyHeader.vue';
import MyAside from './subcomponents/MyAside.vue';

export default {
  name: 'HomeView',
  // 注册子组件
  components: {
    MyHeader,
    MyAside
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  
  .home-main-box {
    flex: 1;
    display: flex;
    
    .home-main-body {
      flex: 1;
      padding: 15px;
      background-color: #f0f2f5;
    }
  }
}
</style> 