一个基于vue3的商品管理项目
### 4.1.2 初始化商品列表数据

在"商品管理"案例中，首先需要初始化商品列表数据。在 `App` 组件中，定义了一个商品列表 `goodsList`，用于存储商品的基本信息。具体代码如下：

```vue
<script setup>
import { ref } from 'vue';

const goodsList = ref([
  { id: 1, goods_name: '夏季专柜同款女鞋', goods_price: 298, tags: ['舒适', '透气'], inputVisible: false, inputValue: '' },
  { id: 2, goods_name: '冬季保暖女士休闲雪地靴舒适加绒防水短靴防滑棉鞋', goods_price: 89, tags: ['保暖', '防滑'], inputVisible: false, inputValue: '' },
  { id: 3, goods_name: '秋冬新款女士毛衣套头宽松针织衫简约上衣', goods_price: 199, tags: ['秋冬', '毛衣'], inputVisible: false, inputValue: '' },
  { id: 4, goods_name: '2023春秋装新款大码女装衬衫上衣', goods_price: 19, tags: ['雪纺衫', '打底'], inputVisible: false, inputValue: '' },
  { id: 5, goods_name: '长款长袖圆领女士毛衣2022秋装新款假两件连衣裙', goods_price: 178, tags: ['圆领', '连衣裙'], inputVisible: false, inputValue: '' }
]);
</script>
```

在这个数据结构中：
- `id`：商品编号。
- `goods_name`：商品名称。
- `goods_price`：商品价格。
- `tags`：商品标签。
- `inputVisible`：控制标签输入框的显示与隐藏。
- `inputValue`：输入框的内容，表示新的标签。

### 4.1.3 封装 `MyTable` 组件

为了提高组件的复用性，商品数据将展示在一个 `MyTable` 组件中。以下是实现步骤：

#### (1) 创建并使用 `MyTable` 组件
1. 在 `D:/vue/chapter04/table/src/components` 目录下创建 `MyTable.vue` 文件。
2. 在 `App` 组件中导入并注册 `MyTable` 组件：

```vue
<script setup>
import MyTable from './components/MyTable.vue';
</script>
```

3. 在 `App` 组件的模板中使用 `MyTable` 组件：

```vue
<template>
  <h4>商品管理</h4>
  <MyTable :goodsList="goodsList"></MyTable>
</template>
```

#### (2) 声明数据源

在 `MyTable` 组件中，使用 `props` 接收从父组件传递过来的商品列表数据：

```vue
<script setup>
const props = defineProps({
  goodsList: {
    type: Array,
    required: true,
    default: []
  }
});
</script>
```

在 `App` 组件中，将 `goodsList` 传递给 `MyTable` 组件：

```vue
<MyTable :goodsList="goodsList"></MyTable>
```

#### (3) 预留具名插槽 `header`

通过具名插槽，可以让使用者自定义表格的标题区域：

```vue
<template>
  <table class="table table-striped table-bordered">
    <thead>
      <tr>
        <slot name="header"></slot>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
</template>
```

在 `App` 组件中通过具名插槽指定表格标题：

```vue
<MyTable :goodsList="goodsList">
  <template v-slot:header>
    <th scope="col">#</th>
    <th scope="col">商品名称</th>
    <th scope="col">价格</th>
    <th scope="col">标签</th>
    <th scope="col">操作</th>
  </template>
</MyTable>
```

#### (4) 预留作用域插槽 `body`

通过作用域插槽，可以让用户自定义表格内容：

```vue
<template>
  <tbody>
    <tr v-for="(item, index) in goodsList" :key="item.id">
      <slot name="body" :row="item" :index="index"></slot>
    </tr>
  </tbody>
</template>
```

在 `App` 组件中使用作用域插槽渲染商品数据：

```vue
<MyTable :goodsList="goodsList">
  <template #body="{ row, index }">
    <td>{{ index + 1 }}</td>
    <td>{{ row.goods_name }}</td>
    <td>{{ row.goods_price }}</td>
    <td>{{ row.tags.join(', ') }}</td>
    <td>
      <button type="button" class="btn btn-outline-danger btn-sm">删除</button>
    </td>
  </template>
</MyTable>
```

### 4.1.4 实现删除商品数据功能

1. 在商品列表中添加删除按钮，绑定点击事件：

```vue
<button type="button" class="btn btn-outline-danger btn-sm" @click="onRemove(row.id)">删除</button>
```

2. 在 `App` 组件中，定义 `onRemove` 方法删除商品：

```vue
<script setup>
const onRemove = (id) => {
  goodsList.value = goodsList.value.filter(item => item.id !== id);
};
</script>
```

### 4.1.5 实现添加标签的功能

1. 自定义渲染商品标签列：

```vue
<td>
  <span class="btn btn-outline-dark" v-for="item in row.tags" :key="item">
    {{ item }}
  </span>
</td>
```

2. 在 `App` 组件中，添加文本框和按钮以切换显示：

```vue
<td>
  <input type="text" v-if="row.inputVisible" class="form-control form-control-sm ipt-tag" v-model="row.inputValue" @blur="onInputConfig(row)" />
  <button class="btn btn-outline-primary rounded-pill" v-else @click="row.inputVisible = true">+Tag</button>
</td>
```

3. 在 `App` 组件中，定义自定义指令 `v-focus` 以便文本框自动获取焦点：

```vue
<script setup>
const vFocus = (el) => { el.focus(); };
</script>
```

4. 使用 `v-focus` 指令：

```vue
<input type="text" v-if="row.inputVisible" class="form-control form-control-sm ipt-tag" v-focus v-model="row.inputValue" @blur="onInputConfig(row)" />
```

5. 定义 `onInputConfig` 方法，实现标签添加与清空：

```vue
<script setup>
const onInputConfig = (row) => {
  const val = row.inputValue;
  if (!val || row.tags.includes(val)) {
    return;
  }
  row.tags.push(val);
  row.inputValue = '';
  row.inputVisible = false;
};
</script>
```

6. 支持按下 "Enter" 键添加标签并清空输入框：

```vue
<input type="text" v-if="row.inputVisible" class="form-control form-control-sm ipt-tag" v-focus v-model="row.inputValue" @blur="onInputConfig(row)" @keyup.enter="onInputConfig(row)" />
```

7. 支持按下 "Esc" 键清空文本框内容：

```vue
<input type="text" v-if="row.inputVisible" class="form-control form-control-sm ipt-tag" v-focus v-model="row.inputValue" @blur="onInputConfig(row)" @keyup.enter="onInputConfig(row)" @keyup.esc="row.inputValue = ''" />
```

### 完成 "商品管理" 功能

通过上述步骤，完成了商品数据的展示、删除以及标签的添加功能。