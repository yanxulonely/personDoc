# HTML5 新特性详解

## 语义化标签

HTML5 引入了更多具有语义化的标签，使文档结构更加清晰。

```html
<header>页面头部</header>
<nav>导航栏</nav>
<main>
    <article>
        <header>文章头部</header>
        <section>文章章节</section>
        <footer>文章底部</footer>
    </article>
    <aside>侧边栏</aside>
</main>
<footer>页面底部</footer>
```

### 常用语义化标签

- `<header>`: 页眉
- `<nav>`: 导航
- `<main>`: 主要内容
- `<article>`: 独立的内容
- `<section>`: 内容区块
- `<aside>`: 侧边栏
- `<footer>`: 页脚
- `<figure>`: 图片/图表容器
- `<figcaption>`: 图片/图表说明
- `<time>`: 时间标记

## 多媒体支持

### 音频

```html
<audio controls>
    <source src="music.mp3" type="audio/mpeg">
    <source src="music.ogg" type="audio/ogg">
    您的浏览器不支持音频标签
</audio>
```

#### 音频属性
- `controls`: 显示控制面板
- `autoplay`: 自动播放
- `loop`: 循环播放
- `muted`: 静音
- `preload`: 预加载

### 视频

```html
<video width="640" height="360" controls>
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    您的浏览器不支持视频标签
</video>
```

#### 视频属性
- `controls`: 显示控制面板
- `width/height`: 设置尺寸
- `poster`: 封面图片
- `autoplay`: 自动播放
- `loop`: 循环播放
- `muted`: 静音
- `preload`: 预加载

## Canvas 绘图

Canvas 提供了一个通过 JavaScript 来绘制图形的平台。

### 基本使用

```html
<canvas id="myCanvas" width="500" height="300"></canvas>

<script>
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 绘制矩形
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 100, 50);

// 绘制线条
ctx.beginPath();
ctx.moveTo(10, 100);
ctx.lineTo(110, 100);
ctx.stroke();

// 绘制圆形
ctx.beginPath();
ctx.arc(60, 200, 50, 0, Math.PI * 2);
ctx.fill();
</script>
```

### 常用绘图功能

- 形状绘制
- 颜色和样式
- 渐变
- 图案
- 文本
- 图片操作
- 变换
- 动画

## SVG 图形

SVG 是一种基于 XML 的矢量图形格式。

```html
<svg width="200" height="200">
    <!-- 矩形 -->
    <rect x="10" y="10" width="80" height="80" fill="red" />
    
    <!-- 圆形 -->
    <circle cx="150" cy="50" r="40" fill="blue" />
    
    <!-- 线条 -->
    <line x1="10" y1="120" x2="190" y2="120" 
          stroke="green" stroke-width="2" />
    
    <!-- 文本 -->
    <text x="10" y="180" fill="black">SVG 文本</text>
</svg>
```

## Web Storage

HTML5 提供了两种客户端存储数据的方法：

### localStorage

```javascript
// 存储数据
localStorage.setItem('username', 'John');

// 获取数据
const username = localStorage.getItem('username');

// 删除数据
localStorage.removeItem('username');

// 清空所有数据
localStorage.clear();
```

### sessionStorage

```javascript
// 存储数据
sessionStorage.setItem('token', '123456');

// 获取数据
const token = sessionStorage.getItem('token');

// 删除数据
sessionStorage.removeItem('token');

// 清空所有数据
sessionStorage.clear();
```

## 地理定位

HTML5 Geolocation API 允许获取用户的地理位置。

```javascript
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        // 成功回调
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(`纬度：${latitude}，经度：${longitude}`);
        },
        // 错误回调
        (error) => {
            console.error('获取位置失败：', error.message);
        }
    );
} else {
    console.error('浏览器不支持地理定位');
}
```

## Web Workers

Web Workers 允许在后台线程中运行脚本，不影响页面性能。

```javascript
// 创建 Worker
const worker = new Worker('worker.js');

// 发送消息给 Worker
worker.postMessage({ type: 'start', data: [1, 2, 3, 4, 5] });

// 接收 Worker 消息
worker.onmessage = (e) => {
    console.log('从 Worker 收到结果：', e.data);
};

// worker.js
self.onmessage = (e) => {
    const { type, data } = e.data;
    if (type === 'start') {
        const result = data.map(x => x * 2);
        self.postMessage(result);
    }
};
```

## WebSocket

WebSocket 提供了全双工的通信通道。

```javascript
// 创建 WebSocket 连接
const ws = new WebSocket('ws://example.com/socket');

// 连接建立时的回调
ws.onopen = () => {
    console.log('连接已建立');
    ws.send('Hello Server!');
};

// 接收消息的回调
ws.onmessage = (e) => {
    console.log('收到消息：', e.data);
};

// 连接关闭的回调
ws.onclose = () => {
    console.log('连接已关闭');
};

// 发生错误的回调
ws.onerror = (error) => {
    console.error('WebSocket 错误：', error);
};
```

## 最佳实践

1. 合理使用语义化标签
2. 确保多媒体内容的可访问性
3. 提供后备方案
4. 注意性能优化
5. 考虑兼容性
6. 实现响应式设计
7. 保护用户隐私
8. 进行错误处理 