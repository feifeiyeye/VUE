一个基于vue的学习计划表项目


### 2.1.2 渲染表格区域数据
**目标**：在页面上渲染学习计划表格数据。

#### 步骤 1：定义表格数据
1. 在`<script setup>`标签中定义渲染表格所需的数据：
   - 使用`ref`定义一个响应式变量`list`，存储学习计划数据（包括：id、subject、content、place、status）。

   ```vue
   <script setup>
   import { ref } from 'vue';

   const list = ref([
       {
           id: '1',
           subject: 'Vue.js前端实战开发',
           content: '学习指令，例如v-if、v-for、v-model等',
           place: '自习室',
           status: false
       }
   ]);
   </script>
   ```

#### 步骤 2：设计表格结构
2. 在`<template>`标签中定义表格结构，使用Bootstrap样式来美化表格：
   - 表头包含列标题：序号、学习科目、学习内容、学习地点、完成状态、操作。

   ```vue
   <template>
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
           <!-- 表格数据渲染区域 -->
       </tbody>
   </table>
   </template>
   ```

#### 步骤 3：使用 `v-for` 渲染表格数据
3. 使用`v-for`指令动态渲染表格内容：
   - 遍历`list`数组，渲染每一项数据。
   - 使用`v-model`实现状态的切换功能，使“已完成”或“未完成”状态可以通过开关按钮切换。

   ```vue
   <tbody>
       <tr v-for="item in list" :key="item.id">
           <td>{{ item.id }}</td>
           <td>{{ item.subject }}</td>
           <td>{{ item.content }}</td>
           <td>{{ item.place }}</td>
           <td>
               <div class="form-check form-switch">
                   <input class="form-check-input" type="checkbox" role="switch" :id="'cb' + item.id" v-model="item.status"/>
                   <label class="form-check-label" :for="'cb' + item.id" v-if="item.status">已完成</label>
                   <label class="form-check-label" :for="'cb' + item.id" v-else>未完成</label>
               </div>
           </td>
           <td>
               <a href="javascript:;" @click="remove(item.id)">删除</a>
           </td>
       </tr>
   </tbody>
   ```

   - 通过`v-for`动态渲染每行数据。
   - 使用`v-if`和`v-else`来根据`item.status`的值显示“已完成”或“未完成”。

---

### 2.1.3 实现学习计划的删除功能
**目标**：点击“删除”按钮时删除对应的学习计划。

#### 步骤 1：绑定删除事件
1. 在删除链接上添加`@click`事件，传递当前项的`id`给`remove`方法。

   ```vue
   <a href="javascript:;" @click="remove(item.id)">删除</a>
   ```

#### 步骤 2：定义删除方法
2. 在`<script setup>`标签中定义`remove`方法，使用`filter`方法根据`id`删除对应的项：

   ```vue
   <script setup>
   const remove = (id) => {
       list.value = list.value.filter(item => item.id !== id);
   };
   </script>
   ```

#### 步骤 3：添加删除状态判断
3. 修改删除按钮的逻辑，确保“未完成”的学习计划不能删除：
   - 如果`status`为`true`（已完成），可以删除；如果为`false`（未完成），禁止删除，并弹出提示。

   ```vue
   <a href="javascript:;" @click="remove(item.id, item.status)">删除</a>
   
   <script setup>
   const remove = (id, status) => {
       if (status) {
           list.value = list.value.filter(item => item.id !== id);
       } else {
           alert('请完成该学习计划后再进行删除操作！');
       }
   };
   </script>
   ```

---

### 2.1.4 实现学习计划的添加功能
**目标**：通过表单输入新学习计划，并将其添加到表格中。

#### 步骤 1：定义表单数据
1. 在`<script setup>`标签中定义表单数据：
   - `subject`：学习科目。
   - `content`：学习内容。
   - `nextId`：下一个学习计划的ID。
   - `selectedOption`：默认选中的学习地点。
   - `options`：学习地点的选择项。

   ```vue
   <script setup>
   const subject = ref('');
   const content = ref('');
   const nextId = ref(1);
   const selectedOption = ref('自习室');
   const options = ref([
       { placeCode: 0, place: '自习室' },
       { placeCode: 1, place: '图书馆' },
       { placeCode: 2, place: '宿舍' }
   ]);
   </script>
   ```

#### 步骤 2：创建表单结构
2. 在`<template>`中定义表单区域，用户可以输入学习科目、学习内容，并选择学习地点。

   ```vue
   <template>
   <div class="card">
       <div class="card-header">学习计划表</div>
       <div class="card-body">
           <form @submit.prevent="add">
               <div class="row g-4">
                   <!-- 学习科目 -->
                   <div class="col-auto">
                       <div class="input-group mb-3">
                           <span class="input-group-text" id="basic-addon1">学习科目</span>
                           <input type="text" class="form-control" placeholder="请输入学习科目" v-model.trim="subject"/>
                       </div>
                   </div>
                   <!-- 学习内容 -->
                   <div class="col-auto">
                       <div class="input-group mb-3">
                           <span class="input-group-text" id="basic-addon2">学习内容</span>
                           <textarea class="form-control" v-model.trim="content" placeholder="请输入学习内容" style="height: 32px;"></textarea>
                       </div>
                   </div>
                   <!-- 学习地点 -->
                   <div class="col-auto">
                       <div class="input-group mb-3">
                           <span class="input-group-text" id="basic-addon3">学习地点</span>
                           <select class="form-select form-select-sm" v-model="selectedOption">
                               <option v-for="option in options" :value="option.place" :key="option.placeCode">{{ option.place }}</option>
                           </select>
                       </div>
                   </div>
                   <!-- 添加按钮 -->
                   <div class="col-auto">
                       <button type="submit" class="btn btn-primary">添加</button>
                   </div>
               </div>
           </form>
       </div>
   </div>
   </template>
   ```

#### 步骤 3：提交表单并添加数据
3. 创建`add`方法，处理表单提交：
   - 检查学习科目是否为空，若为空则提示用户。
   - 计算下一个ID并添加新学习计划数据。
   - 重置表单数据。

   ```vue
   <script setup>
   const add = () => {
       if (subject.value === '') {
           alert('学习科目为必填项！');
           return;
       }
       nextId.value = Math.max(...list.value.map(item => item.id)) + 1;
       const obj = {
           id: nextId.value,
           subject: subject.value,
           content: content.value,
           place: selectedOption.value,
           status: false
       };
       list.value.push(obj);

       // 清空表单
       subject.value = '';
       content.value = '';
       selectedOption.value = '自习室';
   };
   </script>
   ```

---

### 2.1.5 实现状态的切换功能
**目标**：使用户能够通过点击文字切换学习计划的完成状态。

#### 步骤 1：修改`<input>`和`<label>`绑定
1. 动态生成`input`标签的`id`，并绑定`for`属性，使用户可以点击标签文字来切换状态。

   ```vue
   <div class="form-check form-switch">
       <input class="form-check-input" type="checkbox" role="switch" :id="'cb' + item.id"

 v-model="item.status"/>
       <label class="form-check-label" :for="'cb' + item.id" v-if="item.status">已完成</label>
       <label class="form-check-label" :for="'cb' + item.id" v-else>未完成</label>
   </div>
   ```

#### 步骤 2：修改`v-for`中的`input`和`label`绑定
2. 通过`v-model`绑定学习计划的`status`属性，实现状态切换。

这样，点击切换按钮或标签文字时，`status`值会变动，从而在表格中显示“已完成”或“未完成”。

---

这就是详细的开发文档整理，涵盖了表格渲染、删除、添加、切换状态等主要功能的实现步骤。