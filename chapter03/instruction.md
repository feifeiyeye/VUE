一个基于vue3的ToDoList项目
### 开发文档：搭建基础 ToDoList 项目

#### 1. 搭建基本项目结构

1. **清空 App.vue 文件中的默认内容**  
   在 `App.vue` 文件中，删除默认内容，保留最基本的 Vue 组件框架。

2. **删除 HelloWorld.vue 文件**  
   删除该文件，因为它在本项目中不需要使用。

3. **重置 style.css 文件中的样式**  
   修改 `style.css` 文件，设置全局样式，具体代码如下：
   ```css
   :root {
       font-size: 16px;
   }
   body {
       margin: 0;
   }
   ```
   - 第1~3行代码设置了文档根元素的字体大小为16px。
   - 第4~6行代码设置了文档主体外边距为0px。

4. **新建并封装组件**  
   在 `D:\vuelchapter03\todolist\src\components` 目录下新建三个组件：  
   - `ToDoHeader.vue`：表示任务列表头部  
   - `ToDoMain.vue`：表示任务列表主体  
   - `ToDoFooter.vue`：表示任务列表底部  
   从配套资源中复制相关样式，并保存。

#### 2. 编写各个组件的页面结构

1. **在 App.vue 中引入并注册组件**
   ```vue
   <template>
     <ToDoHeader />
     <ToDoMain />
     <ToDoFooter />
   </template>

   <script setup>
   import ToDoHeader from './components/ToDoHeader.vue';
   import ToDoMain from './components/ToDoMain.vue';
   import ToDoFooter from './components/ToDoFooter.vue';
   </script>
   ```

2. **ToDoHeader 组件结构**
   任务输入区域：
   ```vue
   <template>
     <div>
       <div class="header">
         <p class="title">todos</p>
         <input class="new-todo" type="text" placeholder="请填写任务" />
       </div>
     </div>
   </template>
   ```

3. **ToDoMain 组件结构**
   任务列表区域：
   ```vue
   <template>
     <div class="main">
       <ul class="todo-list">
         <li>
           <div class="view">
             <input class="toggle" type="checkbox"/>
             <label>学习组件基础知识</label>
             <button class="destroy"></button>
           </div>
         </li>
       </ul>
     </div>
   </template>
   ```

4. **ToDoFooter 组件结构**
   任务状态显示和筛选区域：
   ```vue
   <template>
     <div class="footer">
       <span class="todo-count">共<strong>0</strong>条未完成任务</span>
       <ul class="filters">
         <li><a class="selected" href="#/">All</a></li>
         <li><a href="#/active">Active</a></li>
         <li><a href="#/completed">Completed</a></li>
       </ul>
     </div>
   </template>
   ```

#### 3. 实现初始任务列表的渲染

1. **在 ToDoMain 组件中接收父组件传递的任务数据**
   ```vue
   <script setup>
   const props = defineProps(['list']);
   </script>
   ```

2. **在 App 组件中定义初始任务数据**
   ```vue
   <script setup>
   import { ref } from 'vue';

   const list = ref([
     { id: 1, name: '晨练', done: false },
     { id: 2, name: '练书法', done: true }
   ]);
   </script>
   ```

3. **将数据通过自定义属性传递给 ToDoMain 组件**
   ```vue
   <ToDoMain :list="list"></ToDoMain>
   ```

4. **在 ToDoMain 组件中展示任务数据**
   ```vue
   <li v-for="item in list" :key="item.id" :class="{ completed: item.done }">
     <div class="view">
       <input class="toggle" type="checkbox" v-model="item.done"/>
       <label>{{ item.name }}</label>
       <button class="destroy"></button>
     </div>
   </li>
   ```

#### 4. 新增任务功能

1. **在 ToDoHeader 组件中定义任务名称数据**
   ```vue
   <script setup>
   import { ref } from 'vue';

   const name = ref('');
   </script>
   ```

2. **绑定输入框的值到 `name`**
   ```vue
   <input class="new-todo" type="text" placeholder="请填写任务" v-model.trim="name"/>
   ```

3. **添加回车事件，触发新增任务**
   ```vue
   <input class="new-todo" type="text" placeholder="请填写任务" v-model.trim="name" @keyup.enter="enterName"/>
   ```

4. **定义并触发自定义事件 `addTodo`**
   ```vue
   <script setup>
   const emit = defineEmits(['addTodo']);
   
   const enterName = () => {
     emit('addTodo', name.value);
     name.value = '';  // 清空输入框
   }
   </script>
   ```

5. **在 App 组件中监听 `addTodo` 事件并更新任务列表**
   ```vue
   <ToDoHeader @addTodo="addTodo"></ToDoHeader>
   
   <script setup>
   const addTodo = (name) => {
     list.value.push({ name, done: false, id: Math.random() * 1000 });
   }
   </script>
   ```

#### 5. 删除任务功能

1. **在 ToDoMain 组件中定义 `delTodo` 事件**
   ```vue
   <script setup>
   const emit = defineEmits(['delTodo']);
   
   const delTodo = (id) => {
     if (id) {
       emit('delToDo', id);
     }
   }
   </script>
   ```

2. **绑定删除按钮事件，传递任务 ID**
   ```vue
   <button class="destroy" @click="delTodo(item.id)"></button>
   ```

3. **在 App 组件中监听并删除对应任务**
   ```vue
   <ToDoMain :list="list" @delToDo="delToDo"></ToDoMain>

   <script setup>
   const delToDo = (id) => {
     list.value = list.value.filter(item => item.id !== id);
   }
   </script>
   ```

#### 6. 展示未完成任务数

1. **在 App 组件中定义计算属性 `lastLength`**
   ```vue
   <script setup>
   import { ref, computed } from 'vue';

   const lastLength = computed(() => {
     return list.value.filter(item => !item.done).length;
   });
   </script>
   ```

2. **传递 `lastLength` 给 ToDoFooter 组件**
   ```vue
   <ToDoFooter :lastLength="lastLength"></ToDoFooter>
   ```

3. **在 ToDoFooter 组件中展示未完成任务数**
   ```vue
   <span class="todo-count">共<strong>{{ lastLength }}</strong>条未完成任务</span>
   ```

#### 7. 切换任务状态 - 筛选数据

1. **在 App 组件中定义状态 `status`**
   ```vue
   const status = ref('all');
   ```

2. **根据状态过滤任务数据**
   ```vue
   const showList = computed(() => {
     if (status.value === 'all') {
       return list.value;
     }
     if (status.value === 'active') {
       return list.value.filter(item => !item.done);
     }
     if (status.value === 'completed') {
       return list.value.filter(item => item.done);
     }
   });
   ```

3. **传递 `showList` 给 ToDoMain 组件**
   ```vue
   <ToDoMain :list="showList" @delToDo="delToDo"></ToDoMain>
   ```

4. **在 ToDoFooter 组件中触发状态更新**
   ```vue
   <script setup>
   const emit = defineEmits(['updateStatus']);
   </script>
   
   <ul class="filters">
     <li><a @click.prevent="emit('updateStatus', 'all')" :class="{ selected: status === 'all' }">All</a></li>
     <li><a @click.prevent="emit('updateStatus', 'active')" :class="{ selected: status === 'active' }">Active</a></li>
     <li><a @click.prevent="emit('updateStatus', 'completed')" :class="{ selected: status === 'completed' }">Completed</a></li>
   </ul>
   ```

5. **在 App 组件中监听并更新状态**
   ```vue
   <ToDoFooter :lastLength

="lastLength" :status="status" @updateStatus="updateStatus"></ToDoFooter>
   
   <script setup>
   const updateStatus = (newStatus) => {
     status.value = newStatus;
   }
   </script>
   ```

---

至此，**ToDoList** 项目的开发已经完成，项目功能包括任务的显示、增加、删除、筛选状态及展示未完成任务数等基本功能。