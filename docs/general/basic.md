# CSS 基础知识

## 什么是 CSS？

CSS（Cascading Style Sheets）是用于设置网页样式的语言。它描述了 HTML 元素应该如何显示。

## CSS 语法

CSS 规则由选择器和声明块组成：

```css
selector {
    property1: value1;
    property2: value2;
}
```

## CSS 引入方式

### 1. 内联样式

```html
<div style="color: blue; margin: 20px;">这是内联样式</div>
```

### 2. 内部样式表

```html
<head>
    <style>
        p {
            color: red;
            margin-bottom: 20px;
        }
    </style>
</head>
```

### 3. 外部样式表

```html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```

## 选择器

### 1. 基本选择器

```css
/* 元素选择器 */
p {
    color: red;
}

/* 类选择器 */
.className {
    font-size: 16px;
}

/* ID选择器 */
#uniqueId {
    background-color: yellow;
}

/* 通用选择器 */
* {
    margin: 0;
    padding: 0;
}
```

### 2. 组合选择器

```css
/* 后代选择器 */
div p {
    color: blue;
}

/* 子元素选择器 */
div > p {
    color: red;
}

/* 相邻兄弟选择器 */
h1 + p {
    margin-top: 20px;
}

/* 通用兄弟选择器 */
h1 ~ p {
    color: green;
}
```

### 3. 伪类和伪元素

```css
/* 伪类 */
a:hover {
    color: red;
}

/* 伪元素 */
p::first-line {
    font-weight: bold;
}
```

## 常用属性

### 1. 文本样式

```css
p {
    color: #333;
    font-size: 16px;
    font-family: Arial, sans-serif;
    font-weight: bold;
    text-align: center;
    line-height: 1.5;
    text-decoration: underline;
}
```

### 2. 盒模型

```css
div {
    width: 200px;
    height: 100px;
    padding: 20px;
    margin: 10px;
    border: 1px solid black;
    box-sizing: border-box;
}
```

### 3. 布局属性

```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    float: left;
}
```

### 4. 背景

```css
div {
    background-color: #f0f0f0;
    background-image: url('image.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
```

## CSS3 新特性

### 1. 圆角和阴影

```css
div {
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
```

### 2. 渐变

```css
div {
    background: linear-gradient(to right, #ff0000, #00ff00);
    background: radial-gradient(circle, #ff0000, #00ff00);
}
```

### 3. 转换和过渡

```css
div {
    transform: rotate(45deg) scale(1.2);
    transition: all 0.3s ease;
}
```

### 4. 动画

```css
@keyframes slide {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(100px);
    }
}

.animated {
    animation: slide 2s infinite;
}
```

## 响应式设计

### 媒体查询

```css
/* 移动设备 */
@media screen and (max-width: 768px) {
    .container {
        width: 100%;
    }
}

/* 平板设备 */
@media screen and (min-width: 769px) and (max-width: 1024px) {
    .container {
        width: 90%;
    }
}
```

## CSS 最佳实践

1. 使用 CSS Reset 或 Normalize.css
2. 采用 BEM 命名规范
3. 避免过度嵌套选择器
4. 使用简写属性
5. 保持代码整洁和有组织
6. 注释关键代码
7. 优先使用类选择器
8. 避免使用!important 