# React Hooks 完全指南

React Hooks 是 React 16.8 中引入的新特性。它们允许你在不编写 class 的情况下使用 state 和其他 React 特性。

## 为什么使用 Hooks？

1. 在组件之间复用状态逻辑很难
2. 复杂组件变得难以理解
3. 难以理解的 class
4. 更好的代码组织

## 基础 Hooks

### useState

```jsx
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点击我
      </button>
    </div>
  );
}
```

### useEffect

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `你点击了 ${count} 次`;
  });

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点击我
      </button>
    </div>
  );
}
```

### useContext

```jsx
import React, { useContext } from 'react';

const ThemeContext = React.createContext('light');

function Example() {
  const theme = useContext(ThemeContext);
  return <div>当前主题：{theme}</div>;
}
```

## 额外的 Hooks

### useReducer

```jsx
import React, { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
}
```

### useCallback

```jsx
import React, { useCallback } from 'react';

function Example() {
  const memoizedCallback = useCallback(
    () => {
      doSomething(a, b);
    },
    [a, b],
  );
  return <Child callback={memoizedCallback} />;
}
```

### useMemo

```jsx
import React, { useMemo } from 'react';

function Example() {
  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
  return <div>{memoizedValue}</div>;
}
```

## 自定义 Hooks

你可以创建自己的 Hooks，这让你可以将组件逻辑提取到可重用的函数中。

```jsx
import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return width;
}

// 使用自定义 Hook
function WindowWidth() {
  const width = useWindowWidth();
  return <div>Window width: {width}</div>;
}
```

## Hooks 使用规则

1. 只在最顶层使用 Hooks
   - 不要在循环，条件或嵌套函数中调用 Hook

2. 只在 React 函数中调用 Hooks
   - 在 React 的函数组件中调用 Hook
   - 在自定义 Hook 中调用其他 Hook

## 常见问题

### 1. 如何获取上一轮的 props 或 state？

```jsx
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
```

### 2. 如何实现 getDerivedStateFromProps？

```jsx
function ScrollView({row}) {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [prevRow, setPrevRow] = useState(null);

  if (row !== prevRow) {
    setIsScrollingDown(prevRow !== null && row > prevRow);
    setPrevRow(row);
  }
}
```

### 3. 如何避免重复创建昂贵的对象？

```jsx
function Table(props) {
  const memoizedValue = useMemo(() => computeExpensiveValue(props.item), [props.item]);
  return <div>{memoizedValue}</div>;
}
```

## 最佳实践

1. 使用多个 State 变量
   - 将不相关的 state 拆分为多个 state 变量

2. 依赖项数组优化
   - 确保数组包含回调中使用的所有值

3. 使用 Hooks 的时机
   - 当你需要在函数组件中使用 state 或其他 React 特性时

4. 保持 Hooks 简单
   - 每个 Hook 应该只做一件事

5. 测试策略
   - 把测试重点放在你的代码行为上，而不是具体实现细节

## 参考资源

- [React 官方文档](https://reactjs.org/docs/hooks-intro.html)
- [Hooks API 参考](https://reactjs.org/docs/hooks-reference.html)
- [Hooks FAQ](https://reactjs.org/docs/hooks-faq.html) 