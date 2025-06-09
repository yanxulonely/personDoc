# HTML 基础知识

## 什么是 HTML？

HTML（HyperText Markup Language）是用于创建网页的标准标记语言。它描述了网页的结构，由一系列的元素组成，这些元素告诉浏览器如何展示内容。

## HTML 文档结构

一个基本的 HTML 文档结构如下：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>页面标题</title>
</head>
<body>
    <h1>这是一个标题</h1>
    <p>这是一个段落。</p>
</body>
</html>
```

## 常用 HTML 元素

### 1. 标题

HTML 提供了六级标题：

```html
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
```

### 2. 段落和文本格式化

```html
<p>这是一个段落</p>
<strong>粗体文本</strong>
<em>斜体文本</em>
<br> <!-- 换行 -->
<hr> <!-- 水平线 -->
```

### 3. 链接和图片

```html
<a href="https://www.example.com">这是一个链接</a>
<img src="image.jpg" alt="图片描述">
```

### 4. 列表

无序列表：
```html
<ul>
    <li>项目1</li>
    <li>项目2</li>
    <li>项目3</li>
</ul>
```

有序列表：
```html
<ol>
    <li>第一项</li>
    <li>第二项</li>
    <li>第三项</li>
</ol>
```

### 5. 表格

```html
<table>
    <tr>
        <th>表头1</th>
        <th>表头2</th>
    </tr>
    <tr>
        <td>单元格1</td>
        <td>单元格2</td>
    </tr>
</table>
```

### 6. 表单

```html
<form>
    <label for="username">用户名：</label>
    <input type="text" id="username" name="username">
    
    <label for="password">密码：</label>
    <input type="password" id="password" name="password">
    
    <input type="submit" value="提交">
</form>
```

## HTML5 新特性

HTML5 引入了许多新的元素和特性：

1. 语义化元素
```html
<header>页眉</header>
<nav>导航</nav>
<main>主要内容</main>
<article>文章</article>
<section>区块</section>
<footer>页脚</footer>
```

2. 多媒体元素
```html
<audio src="music.mp3" controls></audio>
<video src="video.mp4" controls></video>
```

3. Canvas 绘图
```html
<canvas id="myCanvas"></canvas>
```

## 最佳实践

1. 始终声明文档类型
2. 使用语义化标签
3. 属性名使用小写
4. 属性值使用双引号
5. 图片始终添加 alt 属性
6. 确保页面具有良好的结构和层次

## 浏览器支持

现代浏览器都支持 HTML5 的特性，但在使用新特性时，建议先检查浏览器的兼容性。 