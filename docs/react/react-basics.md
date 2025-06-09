# React 基础教程

## 1. React 简介

React 是一个用于构建用户界面的 JavaScript 库。它由 Facebook 开发和维护，主要用于构建单页应用程序。

### 1.1 React 特点

- 声明式编程
- 组件化开发
- 虚拟 DOM
- 单向数据流
- JSX 语法
- 强大的生态系统

### 1.2 开发环境搭建

```bash
# 使用 Create React App
npx create-react-app my-app --template typescript

# 使用 Vite
npm create vite@latest my-app -- --template react-ts
```

## 2. JSX 基础

### 2.1 JSX 语法

```tsx
// 基本语法
const element = <h1>Hello, React!</h1>;

// 使用 JavaScript 表达式
const name = 'React';
const element = <h1>Hello, {name}!</h1>;

// 条件渲染
const element = (
  <div>
    {isLoggedIn ? (
      <UserGreeting />
    ) : (
      <GuestGreeting />
    )}
  </div>
);

// 列表渲染
const items = ['Apple', 'Banana', 'Orange'];
const listItems = items.map((item, index) => (
  <li key={index}>{item}</li>
));
```

### 2.2 JSX 属性

```tsx
// className 代替 class
const element = <div className="container">内容</div>;

// style 使用对象语法
const style = {
  backgroundColor: 'blue',
  color: 'white',
  fontSize: '16px'
};
const element = <div style={style}>样式内容</div>;
```

## 3. 组件开发

### 3.1 函数组件

```tsx
interface Props {
  name: string;
  age?: number;
}

const UserProfile: React.FC<Props> = ({ name, age = 18 }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>年龄：{age}</p>
    </div>
  );
};

// 使用组件
<UserProfile name="张三" age={25} />
```

### 3.2 类组件

```tsx
interface Props {
  title: string;
}

interface State {
  count: number;
}

class Counter extends React.Component<Props, State> {
  state = {
    count: 0
  };

  increment = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <p>计数：{this.state.count}</p>
        <button onClick={this.increment}>增加</button>
      </div>
    );
  }
}
```

## 4. Hooks 使用

### 4.1 useState

```tsx
const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState<User>({
    name: '',
    age: 0
  });

  return (
    <div>
      <p>计数：{count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      
      <input
        value={user.name}
        onChange={e => setUser({ ...user, name: e.target.value })}
      />
    </div>
  );
};
```

### 4.2 useEffect

```tsx
const UserInfo: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('获取用户信息失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div>加载中...</div>;
  if (!user) return <div>未找到用户</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>年龄：{user.age}</p>
    </div>
  );
};
```

### 4.3 useContext

```tsx
// 创建 Context
const ThemeContext = React.createContext<'light' | 'dark'>('light');

// 提供 Context
const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          切换主题
        </Button>
        <Content />
      </div>
    </ThemeContext.Provider>
  );
};

// 使用 Context
const Content: React.FC = () => {
  const theme = useContext(ThemeContext);
  
  return (
    <div className={`content ${theme}`}>
      当前主题：{theme}
    </div>
  );
};
```

### 4.4 useReducer

```tsx
interface State {
  count: number;
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const Counter: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    loading: false,
    error: null
  });

  return (
    <div>
      <p>计数：{state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>增加</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>减少</button>
    </div>
  );
};
```

## 5. 性能优化

### 5.1 React.memo

```tsx
interface Props {
  name: string;
  onNameChange: (name: string) => void;
}

const UserProfile: React.FC<Props> = React.memo(({ name, onNameChange }) => {
  console.log('UserProfile 重新渲染');
  
  return (
    <div>
      <h2>{name}</h2>
      <input
        value={name}
        onChange={e => onNameChange(e.target.value)}
      />
    </div>
  );
});
```

### 5.2 useMemo 和 useCallback

```tsx
const ExpensiveComponent: React.FC<{ data: number[] }> = ({ data }) => {
  // 使用 useMemo 缓存计算结果
  const processedData = useMemo(() => {
    return data.map(item => item * 2).filter(item => item > 10);
  }, [data]);

  // 使用 useCallback 缓存回调函数
  const handleClick = useCallback(() => {
    console.log('处理点击事件');
  }, []);

  return (
    <div>
      {processedData.map((item, index) => (
        <div key={index} onClick={handleClick}>{item}</div>
      ))}
    </div>
  );
};
```

## 6. 路由管理

### 6.1 React Router

```tsx
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
        <Link to="/users">用户列表</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

const UserDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h2>用户详情 - {id}</h2>
      <button onClick={() => navigate(-1)}>返回</button>
    </div>
  );
};
```

## 7. 状态管理

### 7.1 Redux Toolkit

```tsx
// store.ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 } as CounterState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    }
  }
});

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

// App.tsx
import { Provider, useSelector, useDispatch } from 'react-redux';

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <p>计数：{count}</p>
      <button onClick={() => dispatch(increment())}>增加</button>
      <button onClick={() => dispatch(decrement())}>减少</button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
};
```

## 8. 测试

### 8.1 Jest 和 React Testing Library

```tsx
import { render, screen, fireEvent } from '@testing-library/react';

describe('Counter 组件', () => {
  test('点击按钮增加计数', () => {
    render(<Counter />);
    
    const button = screen.getByText('增加');
    const count = screen.getByText('计数：0');
    
    fireEvent.click(button);
    
    expect(screen.getByText('计数：1')).toBeInTheDocument();
  });
});
```

## 9. 最佳实践

### 9.1 项目结构

```
src/
  ├── components/        # 通用组件
  ├── pages/            # 页面组件
  ├── hooks/            # 自定义 Hooks
  ├── services/         # API 服务
  ├── utils/            # 工具函数
  ├── types/            # TypeScript 类型定义
  ├── assets/           # 静态资源
  └── styles/           # 样式文件
```

### 9.2 代码规范

- 使用 TypeScript
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码
- 编写单元测试
- 组件职责单一
- 提取公共逻辑到 Hooks
- 使用 CSS Modules 或 styled-components 