# TypeScript 基础教程

## 1. TypeScript 简介

TypeScript 是 JavaScript 的超集，它添加了可选的静态类型和基于类的面向对象编程。

### 1.1 TypeScript 特点

- 静态类型检查
- 类和接口
- 泛型
- 枚举
- 装饰器
- 模块系统

### 1.2 开发环境搭建

```bash
# 全局安装 TypeScript
npm install -g typescript

# 初始化 TypeScript 项目
tsc --init

# 编译 TypeScript 文件
tsc filename.ts

# 运行 TypeScript 文件
ts-node filename.ts
```

## 2. 基本类型

### 2.1 原始类型

```typescript
// 布尔值
let isDone: boolean = false;

// 数字
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// 字符串
let color: string = "blue";
let sentence: string = `The color is ${color}`;

// null 和 undefined
let n: null = null;
let u: undefined = undefined;

// symbol
let sym: symbol = Symbol("key");
```

### 2.2 数组和元组

```typescript
// 数组
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

// 元组
let tuple: [string, number] = ["hello", 10];
```

### 2.3 对象和接口

```typescript
// 接口定义
interface User {
  name: string;
  age: number;
  email?: string;  // 可选属性
  readonly id: number;  // 只读属性
}

// 使用接口
const user: User = {
  name: "张三",
  age: 25,
  id: 1
};

// 索引签名
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray = ["Bob", "Fred"];
```

## 3. 函数

### 3.1 函数类型

```typescript
// 函数声明
function add(x: number, y: number): number {
  return x + y;
}

// 函数表达式
let myAdd: (x: number, y: number) => number = 
    function(x: number, y: number): number { return x + y; };

// 可选参数和默认参数
function buildName(firstName: string, lastName?: string): string {
  return lastName ? `${firstName} ${lastName}` : firstName;
}

function greet(name: string = "Guest"): string {
  return `Hello, ${name}!`;
}

// 剩余参数
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}
```

### 3.2 重载

```typescript
function reverse(x: string): string;
function reverse(x: number): number;
function reverse(x: string | number): string | number {
  if (typeof x === "string") {
    return x.split("").reverse().join("");
  } else {
    return Number(x.toString().split("").reverse().join(""));
  }
}
```

## 4. 类

### 4.1 基本类

```typescript
class Animal {
  private name: string;
  protected age: number;
  readonly species: string;

  constructor(name: string, age: number, species: string) {
    this.name = name;
    this.age = age;
    this.species = species;
  }

  public makeSound(): void {
    console.log("Some sound");
  }
}

// 继承
class Dog extends Animal {
  constructor(name: string, age: number) {
    super(name, age, "dog");
  }

  public makeSound(): void {
    console.log("Woof!");
  }
}
```

### 4.2 访问修饰符

```typescript
class Person {
  private ssn: string;
  protected id: number;
  public name: string;

  constructor(ssn: string, id: number, name: string) {
    this.ssn = ssn;
    this.id = id;
    this.name = name;
  }

  private getSSN(): string {
    return this.ssn;
  }

  protected getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }
}
```

## 5. 泛型

### 5.1 泛型函数

```typescript
// 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

// 使用泛型函数
let output = identity<string>("myString");
let output2 = identity("myString");  // 类型推断

// 泛型接口
interface GenericIdentityFn<T> {
  (arg: T): T;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

### 5.2 泛型类

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;

  constructor(zero: T, addFn: (x: T, y: T) => T) {
    this.zeroValue = zero;
    this.add = addFn;
  }
}

let stringNumeric = new GenericNumber<string>("", (x: string, y: string) => x + y);
```

### 5.3 泛型约束

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// 在泛型约束中使用类型参数
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

## 6. 高级类型

### 6.1 联合类型和交叉类型

```typescript
// 联合类型
type StringOrNumber = string | number;
let value: StringOrNumber = "hello";
value = 42;

// 交叉类型
interface BusinessPartner {
  name: string;
  credit: number;
}

interface Identity {
  id: number;
  email: string;
}

type Employee = BusinessPartner & Identity;

let emp: Employee = {
  name: "John",
  credit: 100,
  id: 1,
  email: "john@example.com"
};
```

### 6.2 类型别名和字面量类型

```typescript
// 类型别名
type Point = {
  x: number;
  y: number;
};

// 字面量类型
type Direction = "North" | "South" | "East" | "West";
let direction: Direction = "North";

// 模板字面量类型
type EmailLocaleIDs = `${string}_${string}`;
type AllowedIDs = "user_id" | "task_id";
```

### 6.3 映射类型

```typescript
// Readonly
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Partial
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Pick
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Record
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

## 7. 装饰器

### 7.1 类装饰器

```typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}
```

### 7.2 方法装饰器

```typescript
function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}

class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  @enumerable(false)
  greet() {
    return "Hello, " + this.greeting;
  }
}
```

## 8. 模块和命名空间

### 8.1 模块

```typescript
// math.ts
export function add(x: number, y: number): number {
  return x + y;
}

export function subtract(x: number, y: number): number {
  return x - y;
}

// main.ts
import { add, subtract } from "./math";
import * as math from "./math";
```

### 8.2 命名空间

```typescript
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }

  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string): boolean {
      return /^[A-Za-z]+$/.test(s);
    }
  }
}

let validator = new Validation.LettersOnlyValidator();
```

## 9. 工具类型

### 9.1 内置工具类型

```typescript
// Partial - 将所有属性变为可选
interface Todo {
  title: string;
  description: string;
}

type PartialTodo = Partial<Todo>;

// Required - 将所有属性变为必需
type RequiredTodo = Required<Todo>;

// Readonly - 将所有属性变为只读
type ReadonlyTodo = Readonly<Todo>;

// Pick - 从类型中选择部分属性
type TodoPreview = Pick<Todo, "title">;

// Record - 构造一个对象类型
type PageInfo = {
  title: string;
};

type Page = Record<string, PageInfo>;
```

### 9.2 条件类型

```typescript
type TypeName<T> = 
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined" :
  T extends Function ? "function" :
  "object";

type T0 = TypeName<string>;  // "string"
type T1 = TypeName<"a">;     // "string"
type T2 = TypeName<true>;    // "boolean"
```

## 10. 最佳实践

### 10.1 类型声明文件

```typescript
// types.d.ts
declare module "my-module" {
  export function someFunction(): void;
  export interface SomeInterface {
    prop: string;
  }
}
```

### 10.2 配置文件

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### 10.3 代码规范

- 使用 interface 定义对象类型
- 使用 type 定义联合类型和交叉类型
- 避免使用 any 类型
- 使用 readonly 保护数据不被修改
- 使用 const assertions 优化类型推断
- 合理使用泛型提高代码复用性
- 使用 ESLint 和 Prettier 保持代码风格一致 