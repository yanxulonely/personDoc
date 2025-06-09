# 代码审查指南

## 1. 代码审查目的

### 1.1 主要目标

- 提高代码质量
- 发现潜在问题
- 知识共享和学习
- 确保代码一致性
- 预防技术债务

### 1.2 审查重点

- 代码正确性
- 性能问题
- 安全隐患
- 可维护性
- 代码规范

## 2. 审查流程

### 2.1 提交前准备

```typescript
// 代码格式化
npm run format

// 运行 lint 检查
npm run lint

// 运行测试
npm run test

// 本地构建验证
npm run build
```

### 2.2 Pull Request 规范

```markdown
## PR 标题格式
feat: 添加用户认证功能
fix: 修复登录页面样式问题
docs: 更新 API 文档
refactor: 重构数据处理逻辑

## PR 描述模板
### 变更说明
- 实现了用户登录功能
- 添加了表单验证
- 集成了 JWT 认证

### 测试说明
- 单元测试覆盖率 > 80%
- 已进行手动测试
- E2E 测试通过

### 相关文档
- API 文档已更新
- 添加了使用说明

### 其他说明
- 依赖更新
- 性能影响
- 向后兼容性
```

## 3. 审查清单

### 3.1 功能性检查

```typescript
// 业务逻辑
function processUserData(data: UserData): ProcessedData {
  // 检查点：
  // 1. 输入验证是否完整
  if (!isValidUserData(data)) {
    throw new Error('Invalid user data');
  }

  // 2. 错误处理是否合适
  try {
    const processed = transform(data);
    return processed;
  } catch (error) {
    logger.error('Data processing failed', error);
    throw error;
  }

  // 3. 返回值是否符合预期
  // 4. 边界情况是否处理
}

// 数据处理
function transform(data: InputData): OutputData {
  // 检查点：
  // 1. 数据转换是否正确
  // 2. 是否有数据丢失
  // 3. 性能是否优化
}
```

### 3.2 代码质量检查

```typescript
// 组件结构
interface Props {
  data: DataType;
  onAction: (data: DataType) => void;
  children?: React.ReactNode;
}

// 检查点：
// 1. 类型定义是否完整
// 2. 属性命名是否合理
// 3. 是否有不必要的属性

const Component: React.FC<Props> = ({ data, onAction, children }) => {
  // 检查点：
  // 1. 组件职责是否单一
  // 2. 是否有重复代码
  // 3. 性能优化是否合理
  
  return (
    <div>
      {/* JSX 结构是否清晰 */}
      {/* 样式组织是否合理 */}
    </div>
  );
};
```

### 3.3 性能检查

```typescript
// 数据缓存
const cache = new Map<string, Data>();

function getData(key: string): Data {
  // 检查点：
  // 1. 缓存策略是否合理
  // 2. 内存使用是否优化
  // 3. 是否有内存泄漏风险
}

// 渲染优化
const MemoizedComponent = React.memo(({ data }) => {
  // 检查点：
  // 1. 是否需要记忆化
  // 2. 依赖项是否正确
  // 3. 是否有不必要的重渲染
});
```

## 4. 代码规范

### 4.1 命名规范

```typescript
// 变量命名
const userList: User[] = []; // 使用有意义的名称
const data: any = {}; // 避免使用模糊的名称

// 函数命名
function getUserById(id: string): User {} // 动词 + 名词
function handle() {} // 避免使用模糊的动词

// 组件命名
const UserProfile: React.FC = () => {}; // 使用 PascalCase
const userRow = () => {}; // 避免使用 camelCase
```

### 4.2 注释规范

```typescript
/**
 * 用户服务类
 * @class UserService
 * @description 处理用户相关的业务逻辑
 */
class UserService {
  /**
   * 创建新用户
   * @param {UserData} userData - 用户数据
   * @returns {Promise<User>} 创建的用户对象
   * @throws {ValidationError} 当用户数据无效时
   */
  async createUser(userData: UserData): Promise<User> {
    // 实现逻辑
  }
}

// 避免无意义的注释
const count = 0; // 初始化计数器为 0

// 使用有意义的注释
// 使用计数器跟踪异步操作的完成次数
const operationCount = 0;
```

## 5. 安全检查

### 5.1 数据安全

```typescript
// 输入验证
function processUserInput(input: string): string {
  // 检查点：
  // 1. 是否进行输入净化
  // 2. 是否防止 XSS 攻击
  // 3. 是否有 SQL 注入风险
}

// 敏感数据处理
function storeCredentials(credentials: Credentials): void {
  // 检查点：
  // 1. 是否加密存储
  // 2. 是否使用安全的传输方式
  // 3. 是否有日志泄露风险
}
```

### 5.2 认证和授权

```typescript
// 权限检查
function checkPermission(user: User, resource: Resource): boolean {
  // 检查点：
  // 1. 权限验证是否完整
  // 2. 是否有权限绕过风险
  // 3. 是否记录敏感操作
}

// 会话管理
function handleSession(session: Session): void {
  // 检查点：
  // 1. 会话超时设置
  // 2. 令牌管理
  // 3. CSRF 防护
}
```

## 6. 测试审查

### 6.1 测试覆盖率

```typescript
// 单元测试
describe('UserService', () => {
  // 检查点：
  // 1. 测试用例是否完整
  // 2. 是否测试了边界条件
  // 3. 是否有足够的断言
  
  it('should create user successfully', () => {
    // 测试实现
  });
});

// 集成测试
describe('User Registration Flow', () => {
  // 检查点：
  // 1. 是否测试了关键流程
  // 2. 是否模拟了外部依赖
  // 3. 是否验证了异常情况
});
```

### 6.2 测试质量

```typescript
// 测试设置
beforeEach(() => {
  // 检查点：
  // 1. 测试环境是否正确设置
  // 2. 是否清理了测试数据
  // 3. 是否避免了测试间的相互影响
});

// 测试用例
it('should handle edge cases', () => {
  // 检查点：
  // 1. 测试描述是否清晰
  // 2. 是否遵循 AAA 模式
  // 3. 断言是否有意义
});
```

## 7. 文档审查

### 7.1 代码文档

```typescript
/**
 * @module UserManagement
 * @description 用户管理模块，处理用户相关的所有功能
 */

/**
 * 用户服务接口
 * @interface IUserService
 */
interface IUserService {
  /**
   * 获取用户信息
   * @param {string} id - 用户ID
   * @returns {Promise<User>} 用户信息
   * @throws {NotFoundError} 当用户不存在时
   */
  getUser(id: string): Promise<User>;
}
```

### 7.2 API 文档

```typescript
/**
 * @api {post} /api/users 创建用户
 * @apiName CreateUser
 * @apiGroup User
 *
 * @apiParam {String} username 用户名
 * @apiParam {String} email 邮箱
 *
 * @apiSuccess {Object} user 创建的用户信息
 * @apiError {Object} error 错误信息
 */
```

## 8. 性能审查

### 8.1 前端性能

```typescript
// 资源加载
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

// 检查点：
// 1. 是否合理使用代码分割
// 2. 是否优化了资源加载
// 3. 是否处理了加载状态

// 渲染优化
const MemoizedList = React.memo(({ items }) => {
  // 检查点：
  // 1. 是否避免了不必要的渲染
  // 2. 是否优化了大列表渲染
  // 3. 是否合理使用虚拟化
});
```

### 8.2 后端性能

```typescript
// 数据库查询
async function queryUsers(filter: Filter): Promise<User[]> {
  // 检查点：
  // 1. 是否优化了查询性能
  // 2. 是否使用了适当的索引
  // 3. 是否处理了大数据量场景
}

// 缓存策略
const cache = new LRUCache<string, Data>(1000);

// 检查点：
// 1. 缓存策略是否合理
// 2. 是否处理了缓存失效
// 3. 是否考虑了并发访问
```

## 9. 最佳实践

### 9.1 审查态度

1. 保持客观和专业
2. 关注代码而不是个人
3. 提供建设性意见
4. 及时响应和沟通
5. 持续学习和改进

### 9.2 沟通技巧

1. 使用清晰的语言
2. 提供具体的建议
3. 解释修改的原因
4. 保持开放的态度
5. 适时给予肯定

### 9.3 持续改进

1. 收集审查反馈
2. 更新审查标准
3. 优化审查流程
4. 培养审查文化
5. 总结经验教训 