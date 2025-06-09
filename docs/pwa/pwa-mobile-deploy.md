# PWA 手机端发布与使用详解

## 1. 发布准备

### 1.1 必要条件

- HTTPS 证书
- Web App Manifest
- Service Worker
- 响应式设计
- 应用图标（多尺寸）

### 1.2 清单检查

- [ ] manifest.json 配置完整
- [ ] Service Worker 注册正确
- [ ] 离线功能测试通过
- [ ] 响应式布局适配
- [ ] 图标资源齐全

## 2. iOS 平台发布

### 2.1 Safari 添加到主屏幕

1. 打开 Safari 浏览器访问 PWA
2. 点击分享按钮
3. 选择"添加到主屏幕"
4. 确认应用名称和图标

### 2.2 iOS 特殊处理

```html
<!-- iOS 图标 -->
<link rel="apple-touch-icon" href="icon-180x180.png">
<link rel="apple-touch-icon" sizes="152x152" href="icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="icon-180x180.png">

<!-- iOS 启动画面 -->
<link rel="apple-touch-startup-image" href="launch.png">

<!-- iOS 状态栏 -->
<meta name="apple-mobile-web-app-status-bar-style" content="black">
```

### 2.3 iOS 限制

- 不支持后台同步
- 不支持推送通知
- 每次启动都是新会话
- 存储容量限制

## 3. Android 平台发布

### 3.1 Chrome 安装到主屏幕

1. 访问 PWA 网站
2. 等待安装横幅显示
3. 点击"安装"
4. 确认安装

### 3.2 manifest.json 配置

```json
{
  "name": "应用名称",
  "short_name": "短名称",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2196f3",
  "icons": [
    {
      "src": "icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 3.3 Android 特性

- 完整的 PWA 支持
- 后台同步
- 推送通知
- 硬件访问
- 文件系统访问

## 4. 用户引导

### 4.1 安装提示

```javascript
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallButton();
});

function showInstallButton() {
  const installButton = document.getElementById('installButton');
  installButton.style.display = 'block';
  installButton.addEventListener('click', installPWA);
}

async function installPWA() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const result = await deferredPrompt.userChoice;
  console.log('安装结果:', result.outcome);
  deferredPrompt = null;
}
```

### 4.2 使用教程

- 添加引导页面
- 提供操作说明
- 展示功能介绍
- 离线使用提醒

## 5. 发布后维护

### 5.1 版本更新

```javascript
// 检查更新
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_VERSION) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

### 5.2 数据同步

- 定期同步数据
- 处理离线数据
- 解决冲突
- 存储管理

### 5.3 性能监控

- 使用 Analytics
- 错误跟踪
- 性能指标
- 用户反馈

## 6. 常见问题解决

### 6.1 iOS 相关

- 缓存更新问题
- 存储限制处理
- 横竖屏适配
- 手势冲突

### 6.2 Android 相关

- 推送权限
- 后台同步
- 存储管理
- 系统集成

## 7. 最佳实践建议

- 渐进式增强
- 优雅降级
- 定期更新
- 用户体验优先
- 性能优化
- 安全性保障 