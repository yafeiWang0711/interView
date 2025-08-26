# 前端安全面试题 - XSS攻击与CSRF攻击

## 1. XSS攻击（跨站脚本攻击）

### 问题1：什么是XSS攻击？有哪些类型？

**答案：**

XSS（Cross-Site Scripting）跨站脚本攻击是一种代码注入攻击，攻击者通过在网页中注入恶意脚本，当用户浏览该页面时，恶意脚本会在用户浏览器中执行。

#### XSS攻击类型：

**1. 反射型XSS（Reflected XSS）**
```javascript
// 攻击示例
// URL: https://example.com/search?q=<script>alert('XSS')</script>
// 服务器直接将用户输入返回给浏览器
const searchTerm = new URLSearchParams(window.location.search).get('q');
document.getElementById('search-results').innerHTML = searchTerm; // 危险！
```

**2. 存储型XSS（Stored XSS）**
```javascript
// 攻击示例 - 评论系统
// 攻击者提交恶意评论
const comment = `<script>alert('XSS')</script>`;
// 评论被存储到数据库，其他用户查看时执行恶意脚本
```

**3. DOM型XSS（DOM-based XSS）**
```javascript
// 攻击示例
// URL: https://example.com/page#<script>alert('XSS')</script>
const hash = window.location.hash.substring(1);
document.getElementById('content').innerHTML = hash; // 危险！
```

### 问题2：如何防止XSS攻击？

**答案：**

#### 1. 输入验证和过滤
```javascript
// 使用DOMPurify库
import DOMPurify from 'dompurify';

const userInput = '<script>alert("XSS")</script>';
const sanitized = DOMPurify.sanitize(userInput);
document.getElementById('content').innerHTML = sanitized;
```

#### 2. 输出编码
```javascript
// HTML编码
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// 使用安全的DOM操作
const userInput = '<script>alert("XSS")</script>';
document.getElementById('content').textContent = userInput; // 安全
```

#### 3. 内容安全策略（CSP）
```html
<!-- 在HTML头部添加CSP -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline';">
```

```javascript
// 在服务器端设置CSP头
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline';"
  );
  next();
});
```

#### 4. 使用安全的框架
```javascript
// React自动转义
function UserComment({ comment }) {
  return <div>{comment}</div>; // React自动转义
}

// Vue自动转义
<template>
  <div>{{ userInput }}</div> <!-- Vue自动转义 -->
</template>
```

### 问题3：请实现一个XSS防护函数

**答案：**

```javascript
// XSS防护工具类
class XSSProtection {
  // HTML编码
  static escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
  
  // URL编码
  static escapeUrl(str) {
    return encodeURIComponent(str);
  }
  
  // JavaScript编码
  static escapeJs(str) {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t');
  }
  
  // 验证输入
  static validateInput(input, type = 'text') {
    const patterns = {
      text: /^[a-zA-Z0-9\s\-_.,!?()]+$/,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      url: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
      number: /^\d+$/
    };
    
    return patterns[type]?.test(input) || false;
  }
  
  // 清理HTML
  static sanitizeHtml(html) {
    const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li'];
    const allowedAttributes = ['class', 'id'];
    
    // 移除不允许的标签
    html = html.replace(/<(\/?)(?!\/?(?:p|br|strong|em|u|ol|ul|li)\b)[^>]*>/gi, '');
    
    // 移除不允许的属性
    html = html.replace(/\s+(?!class|id)\w+="[^"]*"/gi, '');
    
    return html;
  }
}

// 使用示例
const userInput = '<script>alert("XSS")</script><p>Hello</p>';
const safeInput = XSSProtection.sanitizeHtml(userInput);
console.log(safeInput); // "<p>Hello</p>"
```

## 2. CSRF攻击（跨站请求伪造）

### 问题1：什么是CSRF攻击？如何工作？

**答案：**

CSRF（Cross-Site Request Forgery）跨站请求伪造是一种攻击方式，攻击者诱导用户执行非预期的操作。

#### CSRF攻击流程：

```javascript
// 攻击示例 - 银行转账
// 1. 用户已登录银行网站
// 2. 攻击者诱导用户访问恶意网站
// 3. 恶意网站自动发送转账请求

// 恶意网站代码
<img src="https://bank.com/transfer?to=attacker&amount=1000" style="display:none">
```

#### 更复杂的CSRF攻击：
```html
<!-- 恶意网站 -->
<form id="csrf-form" action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="to" value="attacker">
  <input type="hidden" name="amount" value="1000">
</form>
<script>
  document.getElementById('csrf-form').submit();
</script>
```

### 问题2：如何防止CSRF攻击？

**答案：**

#### 1. CSRF Token
```javascript
// 服务器端生成token
app.get('/form', (req, res) => {
  const csrfToken = generateToken();
  req.session.csrfToken = csrfToken;
  res.render('form', { csrfToken });
});

// 前端表单包含token
<form action="/transfer" method="POST">
  <input type="hidden" name="_csrf" value="{{csrfToken}}">
  <input type="text" name="amount">
  <button type="submit">转账</button>
</form>

// 服务器验证token
app.post('/transfer', (req, res) => {
  if (req.body._csrf !== req.session.csrfToken) {
    return res.status(403).send('CSRF token invalid');
  }
  // 处理转账逻辑
});
```

#### 2. SameSite Cookie
```javascript
// 设置SameSite属性
app.use(session({
  secret: 'your-secret',
  cookie: {
    sameSite: 'strict', // 或 'lax'
    secure: true,
    httpOnly: true
  }
}));
```

#### 3. 双重提交Cookie
```javascript
// 客户端JavaScript
function submitForm() {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrfToken='))
    ?.split('=')[1];
    
  const form = document.getElementById('transfer-form');
  const tokenInput = document.createElement('input');
  tokenInput.type = 'hidden';
  tokenInput.name = '_csrf';
  tokenInput.value = token;
  form.appendChild(tokenInput);
  form.submit();
}
```

#### 4. 验证Referer头
```javascript
// 服务器端验证
app.use((req, res, next) => {
  const referer = req.headers.referer;
  const allowedDomains = ['https://yourdomain.com', 'https://www.yourdomain.com'];
  
  if (req.method === 'POST') {
    if (!referer || !allowedDomains.some(domain => referer.startsWith(domain))) {
      return res.status(403).send('Invalid referer');
    }
  }
  next();
});
```

### 问题3：请实现一个CSRF防护中间件

**答案：**

```javascript
// CSRF防护中间件
class CSRFProtection {
  constructor(options = {}) {
    this.secret = options.secret || 'csrf-secret';
    this.cookieName = options.cookieName || '_csrf';
    this.headerName = options.headerName || 'X-CSRF-Token';
    this.ignoreMethods = options.ignoreMethods || ['GET', 'HEAD', 'OPTIONS'];
  }
  
  // 生成CSRF token
  generateToken(sessionId) {
    const crypto = require('crypto');
    return crypto
      .createHmac('sha256', this.secret)
      .update(sessionId)
      .digest('hex');
  }
  
  // 验证token
  validateToken(token, sessionId) {
    const expectedToken = this.generateToken(sessionId);
    return token === expectedToken;
  }
  
  // Express中间件
  middleware() {
    return (req, res, next) => {
      // 跳过不需要验证的方法
      if (this.ignoreMethods.includes(req.method)) {
        return next();
      }
      
      const sessionId = req.sessionID;
      if (!sessionId) {
        return res.status(403).json({ error: 'No session found' });
      }
      
      // 获取token
      const token = req.body._csrf || 
                   req.headers[this.headerName.toLowerCase()] ||
                   req.cookies[this.cookieName];
      
      if (!token) {
        return res.status(403).json({ error: 'CSRF token missing' });
      }
      
      // 验证token
      if (!this.validateToken(token, sessionId)) {
        return res.status(403).json({ error: 'CSRF token invalid' });
      }
      
      next();
    };
  }
  
  // 生成token的辅助方法
  getToken(req) {
    const sessionId = req.sessionID;
    return this.generateToken(sessionId);
  }
}

// 使用示例
const csrfProtection = new CSRFProtection({
  secret: 'your-secret-key',
  cookieName: '_csrf',
  headerName: 'X-CSRF-Token'
});

app.use(csrfProtection.middleware());

// 在模板中使用
app.get('/form', (req, res) => {
  const token = csrfProtection.getToken(req);
  res.render('form', { csrfToken: token });
});
```

## 3. 综合安全实践

### 问题1：如何在前端实现完整的安全防护？

**答案：**

```javascript
// 前端安全工具类
class SecurityUtils {
  // XSS防护
  static sanitizeInput(input, type = 'text') {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }
  
  // CSRF Token管理
  static getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]')?.content;
  }
  
  // 安全的AJAX请求
  static secureRequest(url, options = {}) {
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.getCSRFToken()
      },
      credentials: 'same-origin'
    };
    
    return fetch(url, { ...defaultOptions, ...options });
  }
  
  // 输入验证
  static validateInput(input, rules) {
    const validators = {
      required: (value) => value && value.trim().length > 0,
      email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      url: (value) => /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(value),
      minLength: (value, min) => value.length >= min,
      maxLength: (value, max) => value.length <= max,
      pattern: (value, pattern) => new RegExp(pattern).test(value)
    };
    
    for (const [rule, param] of Object.entries(rules)) {
      if (!validators[rule](input, param)) {
        return { valid: false, error: rule };
      }
    }
    
    return { valid: true };
  }
  
  // 安全的DOM操作
  static safeSetInnerHTML(element, content) {
    element.textContent = content; // 使用textContent而不是innerHTML
  }
  
  // 防止点击劫持
  static preventClickjacking() {
    if (window.self !== window.top) {
      window.top.location = window.self.location;
    }
  }
}

// 使用示例
document.addEventListener('DOMContentLoaded', () => {
  // 防止点击劫持
  SecurityUtils.preventClickjacking();
  
  // 表单验证
  const form = document.getElementById('user-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = form.querySelector('[name="email"]').value;
    const validation = SecurityUtils.validateInput(email, {
      required: true,
      email: true
    });
    
    if (!validation.valid) {
      alert('Invalid input');
      return;
    }
    
    // 安全提交
    SecurityUtils.secureRequest('/api/user', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  });
});
```

### 问题2：如何检测和监控安全攻击？

**答案：**

```javascript
// 安全监控类
class SecurityMonitor {
  constructor() {
    this.suspiciousPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /eval\s*\(/gi,
      /document\.cookie/gi
    ];
    
    this.init();
  }
  
  init() {
    this.monitorInputs();
    this.monitorNetwork();
    this.monitorConsole();
  }
  
  // 监控输入
  monitorInputs() {
    document.addEventListener('input', (e) => {
      const value = e.target.value;
      if (this.detectXSS(value)) {
        this.reportAttack('XSS', value, e.target);
      }
    });
  }
  
  // 监控网络请求
  monitorNetwork() {
    const originalFetch = window.fetch;
    window.fetch = (...args) => {
      const [url, options] = args;
      
      // 检查可疑的请求
      if (this.detectSuspiciousRequest(url, options)) {
        this.reportAttack('Suspicious Request', { url, options });
      }
      
      return originalFetch.apply(this, args);
    };
  }
  
  // 监控控制台
  monitorConsole() {
    const originalLog = console.log;
    console.log = (...args) => {
      const message = args.join(' ');
      if (this.detectSuspiciousConsole(message)) {
        this.reportAttack('Console Injection', message);
      }
      return originalLog.apply(console, args);
    };
  }
  
  // 检测XSS
  detectXSS(input) {
    return this.suspiciousPatterns.some(pattern => pattern.test(input));
  }
  
  // 检测可疑请求
  detectSuspiciousRequest(url, options) {
    const suspiciousUrls = [
      /\/admin\//,
      /\/api\/user\/delete/,
      /\/api\/admin\//
    ];
    
    return suspiciousUrls.some(pattern => pattern.test(url));
  }
  
  // 检测可疑控制台输出
  detectSuspiciousConsole(message) {
    return message.includes('XSS') || 
           message.includes('hack') || 
           message.includes('exploit');
  }
  
  // 报告攻击
  reportAttack(type, data, element = null) {
    const report = {
      type,
      data,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      element: element ? element.tagName + (element.id ? `#${element.id}` : '') : null
    };
    
    // 发送到安全监控服务
    fetch('/api/security/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report)
    }).catch(console.error);
    
    console.warn('Security alert:', report);
  }
}

// 初始化安全监控
const securityMonitor = new SecurityMonitor();
```

## 4. 实际面试题

### 问题1：请描述一个XSS攻击场景并实现防护

**答案：**

```javascript
// 攻击场景：评论系统
// 攻击者提交评论：<script>alert('XSS')</script>
// 网站直接显示评论内容，执行恶意脚本

// 防护实现
class CommentSystem {
  constructor() {
    this.comments = [];
  }
  
  // 添加评论（安全版本）
  addComment(content, author) {
    // 1. 输入验证
    if (!this.validateInput(content)) {
      throw new Error('Invalid input');
    }
    
    // 2. 内容清理
    const sanitizedContent = this.sanitizeContent(content);
    
    // 3. 存储评论
    const comment = {
      id: Date.now(),
      content: sanitizedContent,
      author: this.sanitizeContent(author),
      timestamp: new Date().toISOString()
    };
    
    this.comments.push(comment);
    this.displayComment(comment);
  }
  
  // 输入验证
  validateInput(input) {
    return input && 
           input.length <= 1000 && 
           !/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(input);
  }
  
  // 内容清理
  sanitizeContent(content) {
    const div = document.createElement('div');
    div.textContent = content;
    return div.innerHTML;
  }
  
  // 安全显示评论
  displayComment(comment) {
    const container = document.getElementById('comments');
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    
    // 使用textContent而不是innerHTML
    commentElement.innerHTML = `
      <div class="author">${comment.author}</div>
      <div class="content">${comment.content}</div>
      <div class="timestamp">${comment.timestamp}</div>
    `;
    
    container.appendChild(commentElement);
  }
}

// 使用示例
const commentSystem = new CommentSystem();

// 安全添加评论
try {
  commentSystem.addComment('Hello, this is a safe comment!', 'John');
} catch (error) {
  console.error('Comment rejected:', error.message);
}
```

### 问题2：如何实现一个安全的表单提交系统？

**答案：**

```javascript
// 安全表单系统
class SecureForm {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.csrfToken = this.getCSRFToken();
    this.init();
  }
  
  init() {
    this.addCSRFToken();
    this.addValidation();
    this.addSubmitHandler();
  }
  
  // 添加CSRF Token
  addCSRFToken() {
    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = '_csrf';
    tokenInput.value = this.csrfToken;
    this.form.appendChild(tokenInput);
  }
  
  // 获取CSRF Token
  getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]')?.content || 
           document.cookie.match(/csrf-token=([^;]+)/)?.[1];
  }
  
  // 添加验证
  addValidation() {
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('input', (e) => {
        this.validateField(e.target);
      });
      
      input.addEventListener('blur', (e) => {
        this.validateField(e.target);
      });
    });
  }
  
  // 验证字段
  validateField(field) {
    const rules = field.dataset.validation?.split(',') || [];
    const value = field.value;
    
    for (const rule of rules) {
      const [ruleName, param] = rule.split(':');
      
      if (!this.validateRule(value, ruleName, param)) {
        this.showError(field, ruleName);
        return false;
      }
    }
    
    this.clearError(field);
    return true;
  }
  
  // 验证规则
  validateRule(value, rule, param) {
    const validators = {
      required: (val) => val && val.trim().length > 0,
      email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      minLength: (val, min) => val.length >= parseInt(min),
      maxLength: (val, max) => val.length <= parseInt(max),
      pattern: (val, pattern) => new RegExp(pattern).test(val)
    };
    
    return validators[rule]?.(value, param) ?? true;
  }
  
  // 显示错误
  showError(field, rule) {
    field.classList.add('error');
    const errorElement = field.parentNode.querySelector('.error-message') || 
                        document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = this.getErrorMessage(rule);
    
    if (!field.parentNode.querySelector('.error-message')) {
      field.parentNode.appendChild(errorElement);
    }
  }
  
  // 清除错误
  clearError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }
  
  // 获取错误消息
  getErrorMessage(rule) {
    const messages = {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      minLength: 'This field is too short',
      maxLength: 'This field is too long',
      pattern: 'This field format is invalid'
    };
    
    return messages[rule] || 'Invalid input';
  }
  
  // 添加提交处理器
  addSubmitHandler() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (this.validateForm()) {
        this.submitForm();
      }
    });
  }
  
  // 验证表单
  validateForm() {
    const fields = this.form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  // 提交表单
  async submitForm() {
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch(this.form.action, {
        method: this.form.method || 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': this.csrfToken
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        this.onSuccess(response);
      } else {
        this.onError(response);
      }
    } catch (error) {
      this.onError(error);
    }
  }
  
  // 成功回调
  onSuccess(response) {
    console.log('Form submitted successfully');
    this.form.reset();
  }
  
  // 错误回调
  onError(error) {
    console.error('Form submission failed:', error);
  }
}

// 使用示例
const secureForm = new SecureForm('user-form');
```

## 总结

### 关键安全原则：

1. **输入验证**：始终验证用户输入
2. **输出编码**：对输出进行适当编码
3. **最小权限**：只授予必要权限
4. **深度防御**：多层安全防护
5. **安全配置**：正确配置安全头
6. **定期更新**：保持依赖包更新
7. **安全测试**：定期进行安全测试
8. **监控日志**：监控异常行为

### 面试要点：

- ✅ 理解XSS和CSRF的攻击原理
- ✅ 掌握防护措施和最佳实践
- ✅ 能够实现基本的安全功能
- ✅ 了解安全监控和检测
- ✅ 关注最新的安全威胁和防护技术 