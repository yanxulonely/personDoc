# HTML 表单详解

## 表单基础

HTML 表单是用户输入的主要接口，它允许用户向服务器提交数据。

### 表单结构

基本的表单结构如下：

```html
<form action="/submit" method="post">
    <!-- 表单元素 -->
</form>
```

- `action`: 指定表单数据提交的地址
- `method`: 指定提交方法（GET 或 POST）

## 常用表单元素

### 1. 文本输入

```html
<!-- 单行文本 -->
<input type="text" name="username" placeholder="请输入用户名">

<!-- 密码 -->
<input type="password" name="password" placeholder="请输入密码">

<!-- 多行文本 -->
<textarea name="message" rows="4" cols="50"></textarea>
```

### 2. 选择元素

```html
<!-- 单选按钮 -->
<input type="radio" name="gender" value="male" id="male">
<label for="male">男</label>
<input type="radio" name="gender" value="female" id="female">
<label for="female">女</label>

<!-- 复选框 -->
<input type="checkbox" name="hobby" value="reading" id="reading">
<label for="reading">阅读</label>
<input type="checkbox" name="hobby" value="sports" id="sports">
<label for="sports">运动</label>

<!-- 下拉选择 -->
<select name="city">
    <option value="">请选择城市</option>
    <option value="beijing">北京</option>
    <option value="shanghai">上海</option>
    <option value="guangzhou">广州</option>
</select>
```

### 3. 特殊输入类型

```html
<!-- 数字输入 -->
<input type="number" name="age" min="0" max="120">

<!-- 日期选择 -->
<input type="date" name="birthday">

<!-- 颜色选择 -->
<input type="color" name="favorite-color">

<!-- 文件上传 -->
<input type="file" name="document">

<!-- 范围选择 -->
<input type="range" name="volume" min="0" max="100">
```

## 表单验证

### 1. HTML5 内置验证

```html
<!-- 必填字段 -->
<input type="text" required>

<!-- 邮箱验证 -->
<input type="email" required>

<!-- 长度限制 -->
<input type="text" minlength="3" maxlength="10">

<!-- 数值范围 -->
<input type="number" min="0" max="100">

<!-- 正则表达式匹配 -->
<input type="text" pattern="[A-Za-z]{3}">
```

### 2. 自定义验证

```html
<form id="myForm" onsubmit="return validateForm()">
    <input type="text" id="username" oninput="validateUsername()">
    <span id="usernameError"></span>
</form>

<script>
function validateUsername() {
    const username = document.getElementById('username').value;
    const error = document.getElementById('usernameError');
    
    if (username.length < 3) {
        error.textContent = '用户名至少需要3个字符';
        return false;
    }
    error.textContent = '';
    return true;
}
</script>
```

## 表单样式美化

### 1. 基本样式

```css
.form-control {
    display: block;
    width: 100%;
    padding: 8px 12px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
}

.form-control:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
}
```

### 2. 自定义复选框和单选按钮

```css
.custom-checkbox {
    position: relative;
    padding-left: 35px;
    cursor: pointer;
}

.custom-checkbox input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 4px;
}

.custom-checkbox:hover input ~ .checkmark {
    background-color: #ccc;
}

.custom-checkbox input:checked ~ .checkmark {
    background-color: #2196F3;
}
```

## 最佳实践

1. 始终使用 `<label>` 标签
2. 为表单元素提供合适的 `name` 属性
3. 使用适当的输入类型
4. 提供清晰的错误提示
5. 确保表单可访问性
6. 实现合理的表单布局
7. 添加适当的表单验证
8. 提供用户反馈 