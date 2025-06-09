# HTML 基础教程

## 1. HTML 简介

HTML (HyperText Markup Language) 是构建网页的基础。它使用标记语言来描述网页的结构。

### 1.1 基本结构

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>页面标题</title>
</head>
<body>
    <h1>这是标题</h1>
    <p>这是段落</p>
</body>
</html>
```

### 1.2 HTML5 新特性

- 语义化标签
- 多媒体支持
- Canvas 绘图
- 本地存储
- WebSocket

## 2. 常用标签

### 2.1 文本标签

```html
<!-- 标题标签 -->
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>

<!-- 段落标签 -->
<p>这是一个段落</p>

<!-- 文本格式化 -->
<strong>加粗文本</strong>
<em>斜体文本</em>
<mark>高亮文本</mark>
<del>删除线</del>
<ins>下划线</ins>
```

### 2.2 列表标签

```html
<!-- 无序列表 -->
<ul>
    <li>项目1</li>
    <li>项目2</li>
    <li>项目3</li>
</ul>

<!-- 有序列表 -->
<ol>
    <li>第一步</li>
    <li>第二步</li>
    <li>第三步</li>
</ol>

<!-- 定义列表 -->
<dl>
    <dt>术语</dt>
    <dd>术语描述</dd>
</dl>
```

### 2.3 链接和图片

```html
<!-- 链接 -->
<a href="https://example.com">访问链接</a>
<a href="mailto:example@email.com">发送邮件</a>
<a href="tel:+1234567890">拨打电话</a>

<!-- 图片 -->
<img src="image.jpg" alt="图片描述" width="300" height="200">
```

## 3. 表单元素

### 3.1 基本表单

```html
<form action="/submit" method="post">
    <!-- 文本输入 -->
    <input type="text" name="username" placeholder="用户名">
    
    <!-- 密码输入 -->
    <input type="password" name="password" placeholder="密码">
    
    <!-- 单选按钮 -->
    <input type="radio" name="gender" value="male"> 男
    <input type="radio" name="gender" value="female"> 女
    
    <!-- 复选框 -->
    <input type="checkbox" name="hobby" value="reading"> 阅读
    <input type="checkbox" name="hobby" value="sports"> 运动
    
    <!-- 下拉选择 -->
    <select name="city">
        <option value="beijing">北京</option>
        <option value="shanghai">上海</option>
        <option value="guangzhou">广州</option>
    </select>
    
    <!-- 文本区域 -->
    <textarea name="message" rows="4" cols="50"></textarea>
    
    <!-- 提交按钮 -->
    <button type="submit">提交</button>
</form>
```

### 3.2 HTML5 新增表单元素

```html
<!-- 日期选择 -->
<input type="date" name="birthday">

<!-- 时间选择 -->
<input type="time" name="meeting-time">

<!-- 数字输入 -->
<input type="number" name="quantity" min="1" max="100">

<!-- 范围滑块 -->
<input type="range" name="volume" min="0" max="100">

<!-- 颜色选择 -->
<input type="color" name="theme-color">

<!-- 电子邮件 -->
<input type="email" name="email">

<!-- 搜索框 -->
<input type="search" name="search">

<!-- 电话号码 -->
<input type="tel" name="phone">
```

## 4. 语义化标签

### 4.1 页面结构

```html
<header>
    <nav>
        <ul>
            <li><a href="#home">首页</a></li>
            <li><a href="#about">关于</a></li>
            <li><a href="#contact">联系</a></li>
        </ul>
    </nav>
</header>

<main>
    <article>
        <section>
            <h2>文章标题</h2>
            <p>文章内容...</p>
        </section>
    </article>
    
    <aside>
        <h3>相关链接</h3>
        <ul>
            <li><a href="#">链接1</a></li>
            <li><a href="#">链接2</a></li>
        </ul>
    </aside>
</main>

<footer>
    <p>&copy; 2024 版权所有</p>
</footer>
```

### 4.2 文本语义

```html
<article>
    <header>
        <h1>文章标题</h1>
        <p><time datetime="2024-03-15">2024年3月15日</time></p>
    </header>
    
    <section>
        <h2>第一部分</h2>
        <p>这是<mark>重要</mark>的内容。</p>
        <figure>
            <img src="image.jpg" alt="示例图片">
            <figcaption>图片说明</figcaption>
        </figure>
    </section>
    
    <footer>
        <address>
            作者：张三<br>
            邮箱：<a href="mailto:zhangsan@example.com">zhangsan@example.com</a>
        </address>
    </footer>
</article>
```

## 5. 多媒体元素

### 5.1 音频

```html
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    您的浏览器不支持音频元素。
</audio>
```

### 5.2 视频

```html
<video width="640" height="360" controls>
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    您的浏览器不支持视频元素。
</video>
```

## 6. 最佳实践

### 6.1 代码规范

- 使用小写标签和属性
- 正确嵌套标签
- 使用语义化标签
- 添加适当的注释
- 保持代码缩进整洁

### 6.2 可访问性

- 使用适当的标签语义
- 提供替代文本
- 使用 ARIA 属性
- 确保键盘可访问
- 提供足够的颜色对比度

### 6.3 SEO 优化

- 使用合适的标题层级
- 提供 meta 描述
- 使用语义化标签
- 优化图片 alt 属性
- 使用规范的 URL 