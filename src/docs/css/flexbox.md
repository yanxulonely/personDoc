# CSS Flexbox 布局详解

## 什么是 Flexbox？

Flexbox（弹性盒子）是一种一维布局模型，它提供了一种更加有效的方式来对齐和分配容器中项目之间的空间。

## 基本概念

Flexbox 布局由两个主要部分组成：
- Flex 容器（父元素）
- Flex 项目（子元素）

```css
.container {
    display: flex; /* 或 display: inline-flex */
}
```

## Flex 容器属性

### 1. flex-direction

决定主轴的方向。

```css
.container {
    flex-direction: row;             /* 默认值，从左到右 */
    flex-direction: row-reverse;     /* 从右到左 */
    flex-direction: column;          /* 从上到下 */
    flex-direction: column-reverse;  /* 从下到上 */
}
```

### 2. flex-wrap

决定项目是否换行。

```css
.container {
    flex-wrap: nowrap;       /* 默认值，不换行 */
    flex-wrap: wrap;         /* 换行 */
    flex-wrap: wrap-reverse; /* 换行，反向 */
}
```

### 3. justify-content

定义项目在主轴上的对齐方式。

```css
.container {
    justify-content: flex-start;    /* 默认值，左对齐 */
    justify-content: flex-end;      /* 右对齐 */
    justify-content: center;        /* 居中对齐 */
    justify-content: space-between; /* 两端对齐 */
    justify-content: space-around;  /* 项目两侧间隔相等 */
    justify-content: space-evenly;  /* 项目间隔完全相等 */
}
```

### 4. align-items

定义项目在交叉轴上的对齐方式。

```css
.container {
    align-items: stretch;     /* 默认值，拉伸填充 */
    align-items: flex-start;  /* 顶部对齐 */
    align-items: flex-end;    /* 底部对齐 */
    align-items: center;      /* 居中对齐 */
    align-items: baseline;    /* 基线对齐 */
}
```

### 5. align-content

定义多行项目在交叉轴上的对齐方式。

```css
.container {
    align-content: stretch;      /* 默认值，拉伸填充 */
    align-content: flex-start;   /* 顶部对齐 */
    align-content: flex-end;     /* 底部对齐 */
    align-content: center;       /* 居中对齐 */
    align-content: space-between;/* 两端对齐 */
    align-content: space-around; /* 项目两侧间隔相等 */
}
```

## Flex 项目属性

### 1. order

定义项目的排列顺序。

```css
.item {
    order: 0;  /* 默认值 */
    order: 1;  /* 数值越大，排列越靠后 */
    order: -1; /* 数值越小，排列越靠前 */
}
```

### 2. flex-grow

定义项目的放大比例。

```css
.item {
    flex-grow: 0; /* 默认值，不放大 */
    flex-grow: 1; /* 放大比例为1 */
    flex-grow: 2; /* 放大比例为2 */
}
```

### 3. flex-shrink

定义项目的缩小比例。

```css
.item {
    flex-shrink: 1; /* 默认值，等比缩小 */
    flex-shrink: 0; /* 不缩小 */
    flex-shrink: 2; /* 缩小比例为2 */
}
```

### 4. flex-basis

定义项目在主轴上的初始大小。

```css
.item {
    flex-basis: auto; /* 默认值 */
    flex-basis: 0;    /* 绝对弹性 */
    flex-basis: 200px;/* 指定宽度 */
}
```

### 5. flex

flex-grow、flex-shrink 和 flex-basis 的简写。

```css
.item {
    flex: 0 1 auto;  /* 默认值 */
    flex: 1;         /* 等同于 flex: 1 1 0% */
    flex: auto;      /* 等同于 flex: 1 1 auto */
    flex: none;      /* 等同于 flex: 0 0 auto */
}
```

### 6. align-self

允许单个项目有不同于其他项目的对齐方式。

```css
.item {
    align-self: auto;       /* 默认值 */
    align-self: flex-start; /* 顶部对齐 */
    align-self: flex-end;   /* 底部对齐 */
    align-self: center;     /* 居中对齐 */
    align-self: baseline;   /* 基线对齐 */
    align-self: stretch;    /* 拉伸填充 */
}
```

## 常见布局示例

### 1. 居中布局

```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
```

### 2. 导航栏布局

```css
.navbar {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
}

.nav-links {
    display: flex;
    gap: 1rem;
}
```

### 3. 卡片网格布局

```css
.card-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.card {
    flex: 0 1 calc(33.333% - 1rem);
}
```

## 最佳实践

1. 使用 flex 简写属性
2. 考虑浏览器兼容性
3. 合理使用 flex-basis
4. 注意性能影响
5. 避免过度嵌套
6. 使用 gap 属性设置间距
7. 结合媒体查询实现响应式布局
8. 使用适当的语义化标签 