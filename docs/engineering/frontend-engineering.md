# 前端工程化指南

## 1. 项目初始化

### 1.1 技术栈选择

- 框架：React + TypeScript
- 构建工具：Vite
- 包管理：pnpm
- 代码规范：ESLint + Prettier
- 提交规范：Husky + Commitlint
- 单元测试：Jest + React Testing Library
- 状态管理：Redux Toolkit
- 样式方案：Tailwind CSS
- UI 组件库：Ant Design

### 1.2 项目创建

```bash
# 使用 Vite 创建项目
pnpm create vite my-app --template react-ts

# 安装依赖
cd my-app
pnpm install

# 初始化 Git
git init
```

### 1.3 目录结构

```
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 项目资源文件
│   ├── components/        # 公共组件
│   ├── hooks/            # 自定义 Hooks
│   ├── layouts/          # 布局组件
│   ├── pages/            # 页面组件
│   ├── services/         # API 服务
│   ├── stores/           # 状态管理
│   ├── styles/           # 全局样式
│   ├── types/            # 类型定义
│   ├── utils/            # 工具函数
│   ├── App.tsx          # 应用入口
│   ├── main.tsx         # 主入口
│   └── vite-env.d.ts    # 环境声明
├── .eslintrc.js          # ESLint 配置
├── .prettierrc           # Prettier 配置
├── .gitignore           # Git 忽略配置
├── index.html           # HTML 模板
├── package.json         # 项目配置
├── tsconfig.json        # TypeScript 配置
└── vite.config.ts       # Vite 配置
```

## 2. 代码规范配置

### 2.1 ESLint 配置

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
```

### 2.2 Prettier 配置

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### 2.3 Git 提交规范

```bash
# 安装 husky 和 commitlint
pnpm add -D husky @commitlint/cli @commitlint/config-conventional

# 初始化 husky
npx husky install

# 添加 commit-msg hook
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
```

```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新功能
        'fix',      // 修复
        'docs',     // 文档
        'style',    // 格式
        'refactor', // 重构
        'perf',     // 性能
        'test',     // 测试
        'chore',    // 构建过程或辅助工具的变动
        'revert',   // 回退
      ],
    ],
    'subject-case': [0],
  },
};
```

## 3. 构建配置

### 3.1 Vite 配置

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          antd: ['antd'],
        },
      },
    },
  },
});
```

### 3.2 TypeScript 配置

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## 4. 环境配置

### 4.1 环境变量

```env
# .env
VITE_APP_TITLE=My App
VITE_API_BASE_URL=http://localhost:8080

# .env.development
VITE_APP_ENV=development
VITE_API_BASE_URL=http://dev-api.example.com

# .env.production
VITE_APP_ENV=production
VITE_API_BASE_URL=http://api.example.com
```

### 4.2 环境配置使用

```typescript
// src/config/index.ts
export const config = {
  appTitle: import.meta.env.VITE_APP_TITLE,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};
```

## 5. CI/CD 配置

### 5.1 GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Setup pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 6.x
        
    - name: Install dependencies
      run: pnpm install
      
    - name: Run linter
      run: pnpm lint
      
    - name: Run tests
      run: pnpm test
      
    - name: Build
      run: pnpm build
```

### 5.2 自动化部署

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    tags:
      - 'v*'

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Setup pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 6.x
        
    - name: Install dependencies
      run: pnpm install
      
    - name: Build
      run: pnpm build
      
    - name: Deploy to production
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 6. 开发规范

### 6.1 组件开发规范

- 使用函数组件和 Hooks
- 组件文件使用 PascalCase 命名
- 组件属性使用 TypeScript 接口定义
- 抽取可复用逻辑到自定义 Hooks
- 使用 React.memo 优化渲染性能

### 6.2 样式开发规范

- 使用 CSS Modules 或 styled-components
- 遵循 BEM 命名规范
- 使用主题变量统一样式
- 响应式设计使用断点
- 避免内联样式

### 6.3 状态管理规范

- 按功能模块划分 store
- 使用 TypeScript 定义 state 类型
- 异步操作使用 createAsyncThunk
- 遵循不可变数据原则
- 避免冗余的状态

## 7. 性能优化

### 7.1 代码分割

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
```

### 7.2 资源优化

- 使用 CDN 加载第三方库
- 图片懒加载和压缩
- 使用 webp 格式图片
- 合理使用缓存策略
- 开启 gzip 压缩

## 8. 监控和日志

### 8.1 性能监控

```typescript
// src/utils/monitor.ts
export const monitor = {
  // 记录性能指标
  logPerformance() {
    const metrics = performance.getEntriesByType('navigation')[0];
    console.log('页面加载时间:', metrics.loadEventEnd - metrics.navigationStart);
  },
  
  // 记录错误信息
  logError(error: Error) {
    console.error('错误:', error);
    // 上报错误到监控平台
  },
};
```

### 8.2 日志记录

```typescript
// src/utils/logger.ts
export const logger = {
  info(message: string, data?: any) {
    console.log(`[INFO] ${message}`, data);
  },
  
  error(message: string, error?: Error) {
    console.error(`[ERROR] ${message}`, error);
  },
  
  warn(message: string, data?: any) {
    console.warn(`[WARN] ${message}`, data);
  },
};
```

## 9. 安全配置

### 9.1 XSS 防护

```typescript
// src/utils/security.ts
export const security = {
  // HTML 转义
  escapeHtml(str: string) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },
  
  // URL 参数验证
  validateUrl(url: string) {
    const pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    return pattern.test(url);
  },
};
```

### 9.2 CSRF 防护

```typescript
// src/utils/http.ts
import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
  },
});

export default http;
```

## 10. 发布流程

### 10.1 版本管理

```json
// package.json
{
  "scripts": {
    "release": "standard-version"
  }
}
```

### 10.2 发布检查清单

- 运行所有测试
- 检查代码规范
- 更新版本号
- 生成更新日志
- 构建生产包
- 本地验证
- 提交代码
- 创建标签
- 发布 