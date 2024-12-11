一个基于vue3的后台管理系统项目
## Vue 3 项目开发文档

### 2. 安装 VueRouter 4

1. **安装 VueRouter**  
   在 `manage-system` 目录下，安装 VueRouter 4，使用以下命令：
   ```bash
   yarn add vue-router@4 --save
   ```

2. **配置 VueRouter**  
   在 `src` 目录下，创建 `router.js` 文件，配置路由。代码如下：
   ```javascript
   import { createRouter, createWebHashHistory } from "vue-router";

   const router = createRouter({
     history: createWebHashHistory(),
     routes: []
   });

   export default router;
   ```

3. **在 `main.js` 中导入并挂载路由**  
   修改 `src/main.js` 文件，导入并使用路由：
   ```javascript
   import { createApp } from 'vue';
   import './style.css';
   import App from './App.vue';
   import router from './router';

   const app = createApp(App);
   app.use(router);
   app.mount('#app');
   ```

### 3. 安装 Less 依赖包

在 `manage-system` 目录下，安装 Less 依赖包，使用以下命令：
```bash
yarn add --save-dev less-loader less
```

### 5. 渲染登录组件

1. **创建 `Login.vue` 组件**  
   在 `src/components` 目录下，创建 `Login.vue` 组件，并在 `router.js` 中导入该组件，声明路由规则。代码如下：
   ```javascript
   routes: [
     { path: '/', redirect: '/login' },
     { path: '/login', component: () => import('./components/Login.vue') }
   ]
   ```

2. **在 `App.vue` 中声明路由视图**  
   修改 `App.vue`，在模板中添加 `<router-view>` 来显示路由内容：
   ```html
   <template>
     <div id="app">
       <router-view></router-view>
     </div>
   </template>
   ```

### 5.1.3 实现登录功能

1. **显示用户头像**  
   引入 `logo.png` 图片并在 `Login.vue` 中显示：
   ```html
   <div class="avatar-box">
     <img class="avatar" src="../assets/logo.png" />
   </div>
   ```

2. **表单区域：绑定 `username` 和 `password`**  
   使用 `v-model` 指令进行双向数据绑定：
   ```html
   <div class="form-group">
     <label for="username">登录名称：</label>
     <input type="text" class="form-control" id="username" v-model.trim="username" placeholder="请输入登录名称" />
   </div>
   <div class="form-group">
     <label for="password">登录密码：</label>
     <input type="password" class="form-control" id="password" v-model="password" placeholder="请输入登录密码" />
   </div>
   ```

3. **声明 `username` 和 `password` 数据**  
   使用 `ref` 声明 `username` 和 `password`：
   ```javascript
   <script setup>
   import { ref } from 'vue';

   const username = ref('');
   const password = ref('');
   </script>
   ```

4. **为登录按钮绑定单击事件**  
   绑定 `onLogin` 方法：
   ```html
   <button type="button" class="btn" @click="onLogin">登录</button>
   ```

5. **实现 `onLogin` 方法**  
   实现登录验证，并保存 token：
   ```javascript
   const onLogin = () => {
     if (username.value === 'admin' && password.value === '123456') {
       router.push('/home');
       localStorage.setItem('token', 'Bearer xxx');
     } else {
       alert('用户名或密码输入错误');
       localStorage.removeItem('token');
     }
   };
   ```

### 5.1.4 渲染后台主页组件

1. **在 `router.js` 中配置后台主页组件**  
   添加 `/home` 路由，指向 `Home.vue` 组件：
   ```javascript
   routes: [
     { path: '/', redirect: '/login' },
     { path: '/login', component: () => import('./components/Login.vue') },
     { path: '/home', component: () => import('./components/Home.vue') }
   ]
   ```

2. **在 `Home.vue` 中渲染头部、侧边栏和主体区域**  
   渲染布局和子组件：
   ```html
   <template>
     <div class="home-container">
       <my-header></my-header>
       <div class="home-main-box">
         <my-aside></my-aside>
         <div class="home-main-body">
           <router-view></router-view>
         </div>
       </div>
     </div>
   </template>

   <script setup>
   import MyHeader from './subcomponents/MyHeader.vue';
   import MyAside from './subcomponents/MyAside.vue';
   </script>
   ```

3. **创建 `MyHeader.vue` 和 `MyAside.vue`**  
   在 `subcomponents` 目录下，创建 `MyHeader.vue` 和 `MyAside.vue` 组件。

### 5.1.5 实现退出登录功能

1. **在 `MyHeader.vue` 中添加退出按钮**  
   在头部区域添加退出按钮，并绑定 `onLogout` 事件：
   ```html
   <button type="button" class="btn btn-light" @click="onLogout">退出</button>
   ```

2. **实现 `onLogout` 方法**  
   退出登录并跳转到登录页面：
   ```javascript
   const onLogout = () => {
     localStorage.removeItem('token');
     router.push('/login');
   };
   ```

### 5.1.6 全局控制路由的访问权限

使用路由导航守卫，控制用户访问权限。代码如下：
```javascript
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next();
  }

  const token = localStorage.getItem('token');
  if (!token) {
    return next('/login');
  }

  next();
});
```

### 5.1.7 渲染用户管理页面的数据

1. **创建 `MyUsers.vue` 组件**  
   在 `src/components/subcomponents` 目录下，创建 `MyUsers.vue`，循环渲染用户列表数据：
   ```html
   <table>
     <thead>
       <tr>
         <th>编号</th>
         <th>姓名</th>
         <th>等级</th>
         <th>操作</th>
       </tr>
     </thead>
     <tbody>
       <tr v-for="(item, i) in userlist" :key="item.id">
         <td>{{ item.id }}</td>
         <td>{{ item.name }}</td>
         <td>{{ item.level }}</td>
         <td><router-link :to="'/home/users/' + item.id">详情</router-link></td>
       </tr>
     </tbody>
   </table>
   ```

### 5.1.8 实现跳转到用户详情页的功能

1. **配置动态路由传递参数**  
   在 `router.js` 中配置动态路由：
   ```javascript
   routes: [
     { path: '/home/users/:id', component: () => import('./components/user/MyUserDetail.vue'), props: true }
   ]
   ```

2. **在 `MyUserDetail.vue` 中使用 `props` 获取参数**  
   使用 `defineProps` 接收路由参数：
   ```javascript
   <script setup>
   const props = defineProps({
     id: String
   });
   </script>
   ```

### 5.1.9 使用 props 获取用户编号值

通过路由的 `props` 属性接收用户编号值，在 `MyUserDetail.vue` 中直接使用：
```html
<h4>用户 {{ id }} 的详情页面</h4>
```

### 5.1.10 解决详情页左侧菜单激活问题

通过修改路由配置和组件嵌套，确保进入用户详情页时左侧菜单保持激活。

### 5.1.11 实现后退功能

1. **在 `MyUserDetail.vue` 中添加后退按钮**  
   为“后退”按钮绑定 `goBack` 事件：
   ```html
   <button @click="goBack">后退</button>
   ```

2. **在 `goBack` 方法中使用 `router.back()` 实现后退**  
   ```javascript
   const goBack = () => {
     router.back();
   };
   ```

---

以上是开发文档的整理，按照步骤详细描述了 Vue 3 项目中如何安装和配置 VueRouter，创建组件，处理登录、退出功能以及路由权限控制等核心功能。