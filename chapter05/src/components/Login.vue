<template>
  <!-- 登录页面容器 -->
  <div class="login-container">
    <!-- 登录表单盒子 -->
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="avatar-box">
        <img class="avatar" src="../assets/logo.png" alt="logo" />
      </div>
      
      <!-- 用户名输入框组 -->
      <div class="form-group">
        <label for="username">登录名称：</label>
        <input 
          type="text" 
          class="form-control" 
          id="username" 
          v-model.trim="username" 
          placeholder="请输入登录名称" 
        />
      </div>
      
      <!-- 密码输入框组 -->
      <div class="form-group">
        <label for="password">登录密码：</label>
        <input 
          type="password" 
          class="form-control" 
          id="password" 
          v-model="password" 
          placeholder="请输入登录密码" 
        />
      </div>

      <!-- 登录按钮 -->
      <button type="button" class="btn" @click="onLogin">登录</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginView',
  setup() {
    // 初始化路由实例
    const router = useRouter();
    // 定义响应式的用户名和密码
    const username = ref('');
    const password = ref('');

    // 登录方法
    const onLogin = () => {
      // 简单的用户名密码验证
      if (username.value === 'admin' && password.value === '123456') {
        // 登录成功，跳转到首页
        router.push('/home');
        // 存储token到本地存储
        localStorage.setItem('token', 'Bearer xxx');
      } else {
        // 登录失败，提示错误信息
        alert('用户名或密码输入错误');
        // 清除token
        localStorage.removeItem('token');
      }
    };

    // 返回模板需要使用的数据和方法
    return {
      username,
      password,
      onLogin
    }
  }
}
</script>

<style lang="less" scoped>
/* 登录页面容器样式 */
.login-container {
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;
  
  /* 登录框样式 */
  .login-box {
    width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;
    
    /* 头像容器样式 */
    .avatar-box {
      text-align: center;
      margin-bottom: 20px;
      
      /* 头像图片样式 */
      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }
    
    /* 表单组样式 */
    .form-group {
      margin-bottom: 15px;
      
      /* 标签样式 */
      label {
        display: block;
        margin-bottom: 5px;
      }
      
      /* 输入框样式 */
      input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
    }
    
    /* 按钮样式 */
    .btn {
      width: 100%;
      padding: 10px;
      background-color: #409eff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      
      /* 按钮悬停效果 */
      &:hover {
        background-color: #66b1ff;
      }
    }
  }
}
</style> 