# CSS Grid 布局详解

## 什么是 Grid？

Grid（网格）布局是一个二维布局系统，它可以同时处理行和列的布局。这使得它特别适合于创建复杂的网页布局。

## 基本概念

Grid 布局包含以下主要概念：
- Grid 容器（父元素）
- Grid 项目（子元素）
- Grid 线
- Grid 单元格
- Grid 区域

## 创建 Grid 容器

```css
.container {
    display: grid;           /* 块级网格容器 */
    /* 或 */
    display: inline-grid;    /* 内联网格容器 */
}
```

## Grid 容器属性

### 1. grid-template-columns/rows

定义网格的列和行。

```css
.container {
    /* 固定宽度 */
    grid-template-columns: 100px 100px 100px;
    
    /* 百分比 */
    grid-template-columns: 33.33% 33.33% 33.33%;
    
    /* fr 单位 */
    grid-template-columns: 1fr 1fr 1fr;
    
    /* 混合单位 */
    grid-template-columns: 100px 1fr 2fr;
    
    /* repeat() 函数 */
    grid-template-columns: repeat(3, 1fr);
    
    /* 自动填充 */
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
```

### 2. grid-gap

设置网格间距。

```css
.container {
    gap: 20px;                    /* 行列间距相同 */
    gap: 20px 10px;              /* 行间距 列间距 */
    row-gap: 20px;               /* 行间距 */
    column-gap: 10px;            /* 列间距 */
}
```

### 3. justify-items/align-items

控制网格项目在单元格内的对齐方式。

```css
.container {
    justify-items: start | end | center | stretch;
    align-items: start | end | center | stretch;
}
```

### 4. justify-content/align-content

控制整个网格在容器内的对齐方式。

```css
.container {
    justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
    align-content: start | end | center | stretch | space-around | space-between | space-evenly;
}
```

### 5. grid-template-areas

通过命名网格区域创建布局。

```css
.container {
    grid-template-areas:
        "header header header"
        "sidebar main main"
        "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

## Grid 项目属性

### 1. grid-column/row

定义项目的位置和跨度。

```css
.item {
    grid-column: 1 / 3;           /* 从第1条列线到第3条列线 */
    grid-column: 1 / span 2;      /* 从第1条列线开始，跨越2个单元格 */
    grid-row: 2 / 4;             /* 从第2条行线到第4条行线 */
}
```

### 2. grid-area

指定项目放置在哪个网格区域。

```css
.item {
    grid-area: header;            /* 放置在名为header的区域 */
    /* 或 */
    grid-area: 1 / 1 / 2 / 3;    /* 行开始 / 列开始 / 行结束 / 列结束 */
}
```

### 3. justify-self/align-self

控制单个项目在单元格内的对齐方式。

```css
.item {
    justify-self: start | end | center | stretch;
    align-self: start | end | center | stretch;
}
```

## 常见布局示例

### 1. 经典网页布局

```css
.container {
    display: grid;
    grid-template-areas:
        "header header header"
        "nav main aside"
        "footer footer footer";
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}

.header { grid-area: header; }
.nav { grid-area: nav; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
```

### 2. 响应式卡片网格

```css
.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
}

.card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

### 3. 画廊布局

```css
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-rows: 200px;
    gap: 16px;
}

.gallery-item {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* 特定项目跨越多个单元格 */
.gallery-item--featured {
    grid-column: span 2;
    grid-row: span 2;
}
```

## 最佳实践

1. 使用命名网格线和区域
2. 合理使用 fr 单位
3. 利用 minmax() 函数实现响应式布局
4. 考虑浏览器兼容性
5. 使用 grid-gap 代替外边距
6. 结合媒体查询调整布局
7. 避免过度复杂的网格结构
8. 使用 Grid 开发者工具调试布局

## 浏览器支持

现代浏览器都很好地支持 Grid 布局，但在使用某些高级特性时，建议先检查浏览器兼容性。对于需要支持旧版浏览器的项目，可以考虑使用回退方案。 