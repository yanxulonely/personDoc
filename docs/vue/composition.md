# Vue 组合式 API 详解

组合式 API (Composition API) 是 Vue 3 中新增的一种编写组件逻辑的方式。它允许我们使用函数的方式编写组件，提供了更好的代码组织和逻辑复用能力。

## 为什么使用组合式 API？

1. 更好的逻辑复用和代码组织
2. 更好的类型推导
3. 更小的打包体积
4. 更好的逻辑复用能力

## 核心概念

### setup 函数

```vue
<script setup>
import { ref, onMounted } from 'vue'

// 响应式状态
const count = ref(0)

// 修改状态的方法
function increment() {
  count.value++
}

// 生命周期钩子
onMounted(() => {
  console.log(`计数器初始值是: ${count.value}`)
})
</script>

<template>
  <button @click="increment">点击了 {{ count }} 次</button>
</template>
```

### 响应式基础

#### ref

```js
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

#### reactive

```js
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  message: 'Hello'
})

state.count++ // 直接修改
```

### 计算属性

```js
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

// 带 getter 和 setter 的计算属性
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1
  }
})
```

### 监听器

```js
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('')

// 监听单个数据源
watch(question, async (newQuestion) => {
  try {
    const response = await fetch('https://api.example.com/answer')
    answer.value = await response.text()
  } catch (e) {
    answer.value = 'Error!'
  }
})

// 监听多个数据源
watch([question, answer], ([newQuestion, newAnswer]) => {
  console.log('question or answer changed')
})
```

## 生命周期钩子

```js
import {
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount
} from 'vue'

export default {
  setup() {
    onBeforeMount(() => {
      console.log('组件挂载前')
    })
    
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    onBeforeUpdate(() => {
      console.log('组件更新前')
    })
    
    onUpdated(() => {
      console.log('组件已更新')
    })
    
    onBeforeUnmount(() => {
      console.log('组件卸载前')
    })
    
    onUnmounted(() => {
      console.log('组件已卸载')
    })
  }
}
```

## 依赖注入

```js
// 在父组件中提供数据
import { provide, ref } from 'vue'

const location = ref('North Pole')
const updateLocation = (newLocation) => {
  location.value = newLocation
}

provide('location', {
  location,
  updateLocation
})

// 在子组件中注入数据
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
```

## 组合式函数（Composables）

```js
// useCounter.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useCounter() {
  const count = ref(0)
  const timer = ref(null)

  function increment() {
    count.value++
  }

  onMounted(() => {
    timer.value = setInterval(increment, 1000)
  })

  onUnmounted(() => {
    if (timer.value) clearInterval(timer.value)
  })

  return {
    count
  }
}

// 在组件中使用
import { useCounter } from './useCounter'

export default {
  setup() {
    const { count } = useCounter()
    return { count }
  }
}
```

## 最佳实践

1. 使用 `<script setup>`
   - 更简洁的语法
   - 更好的运行时性能
   - 更好的 IDE 类型推导

2. 合理使用 ref 和 reactive
   - 基础类型使用 ref
   - 对象类型使用 reactive

3. 组合式函数命名约定
   - 使用 use 前缀
   - 返回一个包含多个值的对象

4. 保持组件的纯度
   - 避免副作用
   - 使用生命周期钩子清理副作用

5. TypeScript 支持
   - 使用 defineProps 和 defineEmits
   - 合理使用类型注解

## 常见问题

### 1. ref vs. reactive

- ref 用于基础类型
- reactive 用于对象类型
- ref 可以持有任何值类型
- reactive 只能用于对象类型

### 2. 如何获取模板引用

```vue
<script setup>
import { ref, onMounted } from 'vue'

const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

### 3. 如何使用异步组件

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)
```

## 参考资源

- [Vue 3 官方文档](https://v3.vuejs.org/guide/composition-api-introduction.html)
- [组合式 API FAQ](https://v3.vuejs.org/guide/composition-api-introduction.html#why-composition-api)
- [Vue 3 组合式 API 教程](https://v3.vuejs.org/guide/composition-api-introduction.html) 