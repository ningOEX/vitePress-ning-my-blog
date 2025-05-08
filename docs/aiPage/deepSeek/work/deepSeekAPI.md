---
title: deepSeekAPI
description: 使用PWA使用deepSeekAPI 请求一个对话
updated: 2025-2-27
---

# 使用PWA使用deepSeekAPI 请求一个对话
<UpdatedTime :updated="$frontmatter.updated" />

使用 PWA（Progressive Web App）结合 Deepseek API 实现一个对话功能，可以创建一个具有离线能力、快速加载和原生应用体验的智能对话应用。以下是一个完整的实现方案，包括前端、后端和 API 集成的代码示例。

---

## **1. 项目概述**
开发一个基于 PWA 的智能对话应用，用户可以通过输入文本与 Deepseek API 进行交互，获取智能回复。应用支持离线访问和快速加载。

---

## **2. 技术栈**
- **前端**: PWA（HTML、CSS、JavaScript）
- **后端**: Node.js（处理 API 请求）
- **API**: Deepseek API（对话功能）
- **数据库**: Firebase（可选，用于存储对话记录）
- **部署**: Netlify 或 Vercel（PWA 部署）

---

## **3. 实现步骤**

### **3.1 PWA 基础功能**
1. **Service Worker**: 实现离线缓存和资源预加载。
2. **Web App Manifest**: 提供添加到主屏幕的功能。
3. **响应式设计**: 确保应用在移动端和桌面端都能良好显示。

### **3.2 集成 Deepseek API**
1. **对话请求**:
    - 使用 Deepseek API 发送用户输入并获取智能回复。
2. **对话记录**:
    - 将对话记录存储在本地或 Firebase 中。

### **3.3 前端实现**
1. **用户界面**:
    - 提供输入框和发送按钮。
    - 显示对话记录。
2. **离线支持**:
    - 使用 Service Worker 缓存静态资源，确保离线访问。

---

## **4. 代码示例**

### **4.1 HTML**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>智能对话 PWA</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="manifest" href="manifest.json">
</head>
<body>
    <div id="chat-container">
        <div id="chat-log"></div>
        <input type="text" id="user-input" placeholder="输入消息...">
        <button id="send-button">发送</button>
    </div>
    <script src="main.js"></script>
</body>
</html>
```

### **4.2 CSS**
```css
body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}

#chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 10px;
}

#chat-log {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
}

#user-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
}

#send-button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

#send-button:hover {
    background-color: #0056b3;
}
```

### **4.3 JavaScript**
```javascript
// 注册 Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker 注册成功'))
        .catch(err => console.error('Service Worker 注册失败:', err));
}

// 获取元素
const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// 发送消息
async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // 显示用户消息
    appendMessage('user', userMessage);
    userInput.value = '';

    try {
        // 调用 Deepseek API
        const response = await fetch('https://api.deepseek.com/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_DEEPSEEK_API_KEY'
            },
            body: JSON.stringify({
                message: userMessage
            })
        });

        const data = await response.json();
        const botMessage = data.reply;

        // 显示机器人回复
        appendMessage('bot', botMessage);
    } catch (error) {
        console.error('请求失败:', error);
        appendMessage('bot', '抱歉，暂时无法处理您的请求。');
    }
}

// 添加消息到聊天记录
function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.textContent = message;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight; // 滚动到底部
}

// 绑定发送按钮事件
sendButton.addEventListener('click', sendMessage);

// 绑定回车键事件
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
```

### **4.4 Service Worker**
```javascript
const CACHE_NAME = 'chat-pwa-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/main.js'
];

// 安装 Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS_TO_CACHE))
    );
});

// 拦截网络请求
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});
```

### **4.5 Web App Manifest**
```json
{
    "short_name": "ChatPWA",
    "name": "智能对话 PWA",
    "icons": [
        {
            "src": "icon-192x192.png",
            "type": "image/png",
            "sizes": "192x192"
        },
        {
            "src": "icon-512x512.png",
            "type": "image/png",
            "sizes": "512x512"
        }
    ],
    "start_url": "/",
    "background_color": "#ffffff",
    "display": "standalone",
    "scope": "/",
    "theme_color": "#007bff"
}
```

---

## **5. 部署与测试**
1. **部署**:
    - 使用 Netlify 或 Vercel 部署 PWA。
    - 配置 HTTPS 以确保 PWA 功能正常运行。
2. **测试**:
    - 在移动端和桌面端测试应用。
    - 检查离线访问和添加到主屏幕功能。

---

## **6. 总结**
通过结合 PWA 和 Deepseek API，我们成功开发了一个智能对话应用。该应用不仅提供了智能对话功能，还通过 PWA 技术实现了离线访问和快速加载。这种技术组合非常适合需要高效数据处理和优质用户体验的场景。

如果你有类似的项目需求或需要进一步的帮助，请随时在评论区留言！