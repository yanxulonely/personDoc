# 前端测试规范指南

## 1. 测试类型

### 1.1 单元测试

- 测试独立的函数和组件
- 模拟外部依赖
- 关注输入输出
- 保持测试简单和快速

```typescript
// utils/math.ts
export const add = (a: number, b: number): number => a + b;

// utils/math.test.ts
import { add } from './math';

describe('Math Utils', () => {
  it('should add two numbers correctly', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, 1)).toBe(0);
    expect(add(0, 0)).toBe(0);
  });
});
```

### 1.2 集成测试

- 测试多个组件的交互
- 测试与后端 API 的集成
- 模拟用户操作流程
- 验证功能完整性

```typescript
// features/auth/Login.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Login } from './Login';

describe('Login Feature', () => {
  it('should handle login flow correctly', async () => {
    const mockLogin = jest.fn();
    render(<Login onLogin={mockLogin} />);

    // 填写表单
    fireEvent.change(screen.getByLabelText('用户名'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText('密码'), {
      target: { value: 'password123' },
    });

    // 提交表单
    fireEvent.click(screen.getByText('登录'));

    // 验证结果
    expect(mockLogin).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
    });
  });
});
```

### 1.3 端到端测试

- 测试完整的用户流程
- 在真实环境中运行
- 验证关键业务流程
- 自动化测试场景

```typescript
// e2e/checkout.spec.ts
import { test, expect } from '@playwright/test';

test('complete checkout process', async ({ page }) => {
  // 登录
  await page.goto('/login');
  await page.fill('[name=username]', 'testuser');
  await page.fill('[name=password]', 'password123');
  await page.click('button[type=submit]');

  // 添加商品到购物车
  await page.goto('/products');
  await page.click('button[data-testid=add-to-cart]');

  // 完成结账
  await page.goto('/cart');
  await page.click('button[data-testid=checkout]');
  await page.fill('[name=card-number]', '4111111111111111');
  await page.click('button[data-testid=confirm-payment]');

  // 验证结果
  expect(await page.textContent('.order-confirmation')).toContain('订单已确认');
});
```

## 2. 测试工具

### 2.1 Jest 配置

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### 2.2 React Testing Library 使用

```typescript
// components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when loading', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

### 2.3 Mock Service Worker

```typescript
// mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
      ])
    );
  }),

  rest.post('/api/login', (req, res, ctx) => {
    const { username, password } = req.body as any;
    
    if (username === 'testuser' && password === 'password123') {
      return res(
        ctx.status(200),
        ctx.json({ token: 'fake-jwt-token' })
      );
    }
    
    return res(
      ctx.status(401),
      ctx.json({ message: '用户名或密码错误' })
    );
  }),
];
```

## 3. 测试规范

### 3.1 命名规范

```typescript
// 文件命名
component.test.tsx
component.spec.tsx
__tests__/component.tsx

// 测试套件命名
describe('ComponentName', () => {});
describe('featureName', () => {});
describe('utils/functionName', () => {});

// 测试用例命名
it('should render correctly', () => {});
it('should handle click event', () => {});
it('should display error message when validation fails', () => {});
```

### 3.2 测试结构

```typescript
// 标准测试结构
describe('ComponentName', () => {
  // 在所有测试之前运行
  beforeAll(() => {
    // 设置全局配置
  });

  // 在每个测试之前运行
  beforeEach(() => {
    // 重置状态
    // 准备测试数据
  });

  // 测试用例
  it('should do something', () => {
    // 准备
    const props = {};
    
    // 执行
    const result = someFunction(props);
    
    // 断言
    expect(result).toBe(expected);
  });

  // 在每个测试之后运行
  afterEach(() => {
    // 清理状态
  });

  // 在所有测试之后运行
  afterAll(() => {
    // 清理全局配置
  });
});
```

### 3.3 断言最佳实践

```typescript
// 组件渲染测试
it('should render correctly', () => {
  render(<Component />);
  
  // 优先使用语义化查询
  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.getByLabelText('用户名')).toBeInTheDocument();
  
  // 其次使用测试 ID
  expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  
  // 最后才使用文本内容
  expect(screen.getByText('提交')).toBeInTheDocument();
});

// 事件处理测试
it('should handle user interactions', async () => {
  const handleSubmit = jest.fn();
  render(<Form onSubmit={handleSubmit} />);
  
  // 模拟用户输入
  await userEvent.type(screen.getByLabelText('用户名'), 'testuser');
  
  // 模拟点击
  await userEvent.click(screen.getByRole('button'));
  
  // 验证回调
  expect(handleSubmit).toHaveBeenCalledWith({
    username: 'testuser',
  });
});

// 异步操作测试
it('should handle async operations', async () => {
  render(<AsyncComponent />);
  
  // 等待加载状态
  expect(screen.getByText('加载中...')).toBeInTheDocument();
  
  // 等待数据加载完成
  await waitFor(() => {
    expect(screen.getByText('数据已加载')).toBeInTheDocument();
  });
});
```

## 4. 测试覆盖率

### 4.1 覆盖率指标

```typescript
// package.json
{
  "scripts": {
    "test": "jest",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

### 4.2 覆盖率报告

```typescript
// 生成覆盖率报告
npm run test:coverage

// 覆盖率报告结构
coverage/
  ├── lcov-report/      # HTML 报告
  ├── coverage.json     # JSON 格式数据
  └── lcov.info        # LCOV 格式数据
```

## 5. 测试策略

### 5.1 测试金字塔

1. 单元测试（底层）
   - 数量最多
   - 运行最快
   - 成本最低

2. 集成测试（中层）
   - 验证组件交互
   - 测试数据流
   - 中等复杂度

3. 端到端测试（顶层）
   - 数量最少
   - 运行最慢
   - 成本最高

### 5.2 测试优先级

1. 关键业务流程
   - 用户认证
   - 支付流程
   - 核心功能

2. 复杂逻辑
   - 状态管理
   - 数据转换
   - 算法实现

3. 边界情况
   - 错误处理
   - 极限值
   - 异常流程

## 6. 持续集成

### 6.1 GitHub Actions 配置

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'

    - name: Install dependencies
      run: npm ci

    - name: Run tests
      run: npm test

    - name: Upload coverage
      uses: codecov/codecov-action@v2
      with:
        token: ${{ secrets.CODECOV_TOKEN }}
```

### 6.2 预提交检查

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm test",
      "pre-push": "npm run test:coverage"
    }
  }
}
```

## 7. 测试文档

### 7.1 测试说明文档

```markdown
# 测试文档

## 运行测试
- `npm test`: 运行所有测试
- `npm test -- --watch`: 监听模式
- `npm run test:coverage`: 生成覆盖率报告

## 测试结构
- `__tests__/`: 测试文件目录
- `__mocks__/`: Mock 文件目录
- `setupTests.ts`: 测试环境配置

## 注意事项
- 保持测试独立性
- 避免测试实现细节
- 关注用户行为
- 维护测试可读性
```

### 7.2 测试用例文档

```typescript
/**
 * @jest-environment jsdom
 * 
 * 测试组件: UserProfile
 * 功能描述: 用户信息展示组件
 * 测试范围:
 * 1. 渲染测试
 * 2. 用户交互
 * 3. 错误处理
 */

describe('UserProfile', () => {
  /**
   * 测试用例: 基础渲染
   * 验证点:
   * - 显示用户名
   * - 显示头像
   * - 显示基本信息
   */
  it('should render user information correctly', () => {
    // 测试实现
  });

  /**
   * 测试用例: 编辑功能
   * 验证点:
   * - 点击编辑按钮
   * - 修改表单内容
   * - 保存更新
   */
  it('should handle edit functionality', () => {
    // 测试实现
  });
});
```

## 8. 常见问题

### 8.1 异步测试

```typescript
// 异步操作测试
it('should handle async operations', async () => {
  // 使用 async/await
  const result = await asyncFunction();
  expect(result).toBe(expected);

  // 使用 done 回调
  it('should handle callbacks', done => {
    callbackFunction(result => {
      expect(result).toBe(expected);
      done();
    });
  });

  // 处理 Promise
  return promiseFunction().then(result => {
    expect(result).toBe(expected);
  });
});
```

### 8.2 组件测试

```typescript
// 复杂组件测试
describe('ComplexComponent', () => {
  // 测试 Props
  it('should handle props correctly', () => {
    const props = {
      title: 'Test Title',
      data: [],
      onAction: jest.fn(),
    };
    
    render(<ComplexComponent {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument();
  });

  // 测试状态更新
  it('should update state correctly', async () => {
    render(<ComplexComponent />);
    
    await userEvent.click(screen.getByText('Update'));
    expect(screen.getByText('Updated')).toBeInTheDocument();
  });

  // 测试条件渲染
  it('should render conditionally', () => {
    const { rerender } = render(<ComplexComponent show={false} />);
    expect(screen.queryByText('Content')).not.toBeInTheDocument();

    rerender(<ComplexComponent show={true} />);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
```

## 9. 最佳实践

### 9.1 测试原则

1. 测试行为而不是实现
2. 保持测试简单和可维护
3. 避免测试私有方法
4. 一个测试只测试一个概念
5. 使用有意义的测试数据

### 9.2 代码质量

1. 避免测试代码重复
2. 使用测试工具函数
3. 保持测试代码整洁
4. 定期更新测试用例
5. 及时修复失败的测试

### 9.3 测试维护

1. 定期审查测试代码
2. 删除过时的测试
3. 更新测试文档
4. 监控测试性能
5. 持续改进测试策略 