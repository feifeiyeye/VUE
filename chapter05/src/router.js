import { createRouter, createWebHashHistory } from "vue-router";

// 创建路由实例
const router = createRouter({
  // 使用 hash 模式的路由
  history: createWebHashHistory(),
  routes: [
    // 根路径重定向到登录页
    { path: '/', redirect: '/login' },
    // 登录页路由
    { path: '/login', component: () => import('./components/Login.vue') },
    { 
      // 主页路由
      path: '/home', 
      component: () => import('./components/Home.vue'),
      // 子路由配置
      children: [
        { 
          // 用户列表页
          path: 'users', 
          component: () => import('./components/user/MyUsers.vue')
        },
        { 
          // 用户详情页，使用动态路由参数
          path: 'users/:id', 
          component: () => import('./components/user/MyUserDetail.vue'), 
          // 将路由参数作为组件的 props
          props: true 
        }
      ]
    }
  ]
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 如果是访问登录页，直接放行
  if (to.path === '/login') {
    return next();
  }

  // 获取 token
  const token = localStorage.getItem('token');
  // 如果没有 token，重定向到登录页
  if (!token) {
    return next('/login');
  }

  // 有 token，放行
  next();
});

export default router; 