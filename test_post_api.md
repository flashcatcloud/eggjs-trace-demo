# POST接口测试文档

## 创建用户接口

### 接口信息
- **URL**: `POST /api/users`
- **Content-Type**: `application/json`

### 请求参数
```json
{
  "name": "张三",
  "email": "zhangsan@example.com",
  "phone": "13800138000",
  "avatar": "https://example.com/avatar.jpg",
  "status": "active"
}
```

### 必填参数
- `name`: 用户名（字符串）
- `email`: 邮箱地址（字符串，需要符合邮箱格式）

### 可选参数
- `phone`: 手机号（字符串）
- `avatar`: 头像URL（字符串）
- `status`: 用户状态（字符串，默认为"active"）

### 成功响应 (201)
```json
{
  "code": 0,
  "data": {
    "id": 1703123456789,
    "name": "张三",
    "email": "zhangsan@example.com",
    "phone": "13800138000",
    "avatar": "https://example.com/avatar.jpg",
    "status": "active",
    "createTime": "2023-12-21T10:30:45.123Z",
    "updateTime": "2023-12-21T10:30:45.123Z"
  },
  "message": "用户创建成功"
}
```

### 错误响应

#### 参数错误 (400)
```json
{
  "code": 400,
  "error": "用户名和邮箱是必填项",
  "message": "参数错误"
}
```

#### 邮箱格式错误 (400)
```json
{
  "code": 400,
  "error": "邮箱格式不正确",
  "message": "参数错误"
}
```

#### 服务器错误 (500)
```json
{
  "code": 500,
  "error": "创建用户失败",
  "message": "服务器内部错误"
}
```

## 测试示例

### 使用curl测试
```bash
curl -X POST http://localhost:7001/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "张三",
    "email": "zhangsan@example.com",
    "phone": "13800138000"
  }'
```

### 使用JavaScript测试
```javascript
const response = await fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138000'
  })
});

const result = await response.json();
console.log(result);
```

### 使用Postman测试
1. 选择POST方法
2. 输入URL: `http://localhost:7001/api/users`
3. 在Headers中添加: `Content-Type: application/json`
4. 在Body中选择raw，格式选择JSON
5. 输入请求体数据
6. 点击Send发送请求 