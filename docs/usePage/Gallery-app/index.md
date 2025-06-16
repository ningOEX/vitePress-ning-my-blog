---
title: 图库开发文档
description: 关于使用API开发文档
updated: 2025-6-16
---

# Gallery-app 开发文档

***uniapp*** 使用云服务开发（阿里云），接口请求使用示例 （uniCloud.callFunction）

```javascript
// 参数请求示例
const res = await uniCloud.callFunction({
    name: 'api_login',
    data: {
        can: username.value,
        password: password.value
    }
});

// 无参
const res = await uniCloud.callFunction({
    name: 'api_get_hot_week_list',
});

```

## 登录接口

API
```javascript
api_login
```

参数：
> username  用户名 | 必填
>
> password  密码 | 必填


## 注册接口

API
```javascript
api_register
```

参数：
> username  用户名 | 必填
>
> password  密码 | 必填


## 发布接口

API
```javascript
api_upload_image
```

参数：
> title  标题 | 必填
> 
> description 描述 | 必填
> 
> src 图片路径 | 必填
> 
> username 用户名 | 必填
> 
> views 浏览 | 选填
> 
> uid 用户id | 必填


## 获取热门周更接口

API
```javascript
api_get_hot_week_list
```

## 修改用户名称/密码接口

API
```javascript
api_get_hot_week_list
```

参数：
> userId 用户id | 必填
> 
> username  新用户名称 | 选填
>
> newPassword 新密码 | 选填

