# 前端性能优化指南

## 1. 加载性能优化

### 1.1 资源加载优化

- 使用 HTTP/2
- 开启 Gzip 压缩
- 使用 CDN 加速
- 合理使用缓存策略
- 预加载关键资源

```nginx
# Nginx 配置示例
server {
    listen 80;
    server_name example.com;
    
    # 开启 gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # 缓存配置
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

### 1.2 代码分割

```typescript
// 路由级别代码分割
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}

// 组件级别代码分割
const HeavyComponent = lazy(() => import('@/components/HeavyComponent'));
```

### 1.3 资源压缩

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      plugins: [
        visualizer({
          open: true,
          gzipSize: true,
        }),
      ],
    },
  },
});
```

## 2. 渲染性能优化

### 2.1 虚拟列表

```typescript
import { FixedSizeList } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style}>Row {index}</div>
);

const VirtualList = () => (
  <FixedSizeList
    height={400}
    width={300}
    itemCount={1000}
    itemSize={35}
  >
    {Row}
  </FixedSizeList>
);
```

### 2.2 防抖和节流

```typescript
// hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// hooks/useThrottle.ts
import { useState, useEffect, useRef } from 'react';

export function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    if (now >= lastExecuted.current + interval) {
      lastExecuted.current = now;
      setThrottledValue(value);
    } else {
      const timer = setTimeout(() => {
        lastExecuted.current = now;
        setThrottledValue(value);
      }, interval);

      return () => clearTimeout(timer);
    }
  }, [value, interval]);

  return throttledValue;
}
```

### 2.3 React 组件优化

```typescript
// 使用 React.memo 避免不必要的重渲染
const ExpensiveComponent = React.memo<Props>(({ data }) => {
  return (
    <div>
      {/* 渲染逻辑 */}
    </div>
  );
});

// 使用 useMemo 缓存计算结果
const MemoComponent = () => {
  const expensiveValue = useMemo(() => {
    return someExpensiveCalculation(props);
  }, [props]);

  return <div>{expensiveValue}</div>;
};

// 使用 useCallback 缓存回调函数
const CallbackComponent = () => {
  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []);

  return <button onClick={handleClick}>Click me</button>;
};
```

## 3. 网络优化

### 3.1 请求优化

```typescript
// 请求合并
const batchRequest = async (ids: string[]) => {
  const response = await fetch('/api/batch', {
    method: 'POST',
    body: JSON.stringify({ ids }),
  });
  return response.json();
};

// 请求缓存
const cache = new Map();

const cachedFetch = async (url: string) => {
  if (cache.has(url)) {
    return cache.get(url);
  }

  const response = await fetch(url);
  const data = await response.json();
  cache.set(url, data);
  return data;
};

// 请求取消
const CancelableRequest = () => {
  const abortController = new AbortController();

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        signal: abortController.signal,
      });
      const data = await response.json();
      // 处理数据
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request canceled');
      }
    }
  };

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []);
};
```

### 3.2 数据预加载

```typescript
// 路由预加载
const prefetchRoutes = () => {
  const routes = ['/about', '/contact', '/products'];
  routes.forEach(route => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  });
};

// 图片预加载
const preloadImage = (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });
};
```

## 4. 静态资源优化

### 4.1 图片优化

```typescript
// 图片懒加载
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ImageComponent = () => (
  <LazyLoadImage
    src="image.jpg"
    effect="blur"
    threshold={100}
    placeholderSrc="placeholder.jpg"
  />
);

// 响应式图片
const ResponsiveImage = () => (
  <picture>
    <source
      media="(min-width: 800px)"
      srcSet="large.jpg"
    />
    <source
      media="(min-width: 400px)"
      srcSet="medium.jpg"
    />
    <img src="small.jpg" alt="responsive image" />
  </picture>
);
```

### 4.2 字体优化

```css
/* 字体预加载 */
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/CustomFont.woff2') format('woff2');
  font-display: swap;
}

/* 使用系统字体 */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
```

## 5. 构建优化

### 5.1 Tree Shaking

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['lodash-es', 'date-fns'],
        },
      },
    },
  },
});
```

### 5.2 缓存优化

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
});
```

## 6. 运行时优化

### 6.1 Web Worker

```typescript
// worker.ts
self.onmessage = (e) => {
  const result = heavyCalculation(e.data);
  self.postMessage(result);
};

// main.ts
const worker = new Worker('worker.ts');

worker.onmessage = (e) => {
  console.log('计算结果:', e.data);
};

worker.postMessage(data);
```

### 6.2 Service Worker

```typescript
// service-worker.ts
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/app.js',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

## 7. 性能监控

### 7.1 性能指标收集

```typescript
// utils/performance.ts
export const collectMetrics = () => {
  const metrics = {
    // 首次内容绘制
    fcp: performance.getEntriesByType('paint')
      .find(entry => entry.name === 'first-contentful-paint')?.startTime,
    
    // 最大内容绘制
    lcp: new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    }),
    
    // 首次输入延迟
    fid: new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    }),
  };

  return metrics;
};
```

### 7.2 错误监控

```typescript
// utils/error.ts
export const errorMonitor = {
  init() {
    // 捕获全局错误
    window.onerror = (message, source, lineno, colno, error) => {
      this.log({
        type: 'error',
        message,
        source,
        lineno,
        colno,
        error,
      });
    };

    // 捕获 Promise 错误
    window.addEventListener('unhandledrejection', (event) => {
      this.log({
        type: 'promise',
        message: event.reason,
      });
    });

    // 捕获资源加载错误
    window.addEventListener('error', (event) => {
      if (event.target && (event.target as HTMLElement).tagName) {
        this.log({
          type: 'resource',
          message: `Resource load failed: ${(event.target as HTMLElement).tagName}`,
          source: (event.target as HTMLElement).src || (event.target as HTMLElement).href,
        });
      }
    }, true);
  },

  log(error: any) {
    // 上报错误到监控平台
    console.error(error);
  },
};
```

## 8. 性能测试

### 8.1 Lighthouse 测试

```typescript
// scripts/lighthouse.js
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

(async () => {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless'],
  });

  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance'],
    port: chrome.port,
  };

  const runnerResult = await lighthouse('https://example.com', options);
  console.log('Report is done for', runnerResult.lhr.finalUrl);
  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

  await chrome.kill();
})();
```

### 8.2 性能测试用例

```typescript
// tests/performance.test.ts
import { render } from '@testing-library/react';
import { performance } from 'perf_hooks';

describe('Performance Tests', () => {
  it('should render list efficiently', () => {
    const startTime = performance.now();
    
    render(<LargeList items={Array(1000).fill(0)} />);
    
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(100);
  });

  it('should handle user input responsively', async () => {
    const { getByRole } = render(<SearchInput />);
    const input = getByRole('textbox');
    
    const startTime = performance.now();
    await userEvent.type(input, 'test query');
    const endTime = performance.now();
    
    expect(endTime - startTime).toBeLessThan(50);
  });
});
```

## 9. 最佳实践

### 9.1 代码层面

- 避免内存泄漏
- 减少重绘和回流
- 使用事件委托
- 避免频繁操作 DOM
- 使用 requestAnimationFrame 处理动画

### 9.2 资源层面

- 使用适当的图片格式
- 压缩静态资源
- 合理使用字体图标
- 避免资源重复加载
- 控制资源加载优先级

### 9.3 构建层面

- 合理拆分代码块
- 移除无用代码
- 优化依赖包大小
- 使用现代构建工具
- 持续监控构建产物 