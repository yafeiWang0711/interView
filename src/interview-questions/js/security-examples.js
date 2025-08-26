// 前端安全防护实际代码示例

// ==================== XSS防护示例 ====================

// 1. 输入验证和清理
class XSSProtection {
  // HTML编码
  static escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
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

// 2. 安全的DOM操作
class SecureDOM {
  // 安全设置内容
  static setContent(element, content) {
    element.textContent = content; // 使用textContent而不是innerHTML
  }
  
  // 安全设置HTML（仅允许安全标签）
  static setHTML(element, html) {
    const sanitized = XSSProtection.sanitizeHtml(html);
    element.innerHTML = sanitized;
  }
  
  // 创建安全的元素
  static createElement(tagName, content, attributes = {}) {
    const element = document.createElement(tagName);
    
    // 设置内容
    if (content) {
      this.setContent(element, content);
    }
    
    // 设置属性（仅允许安全属性）
    const safeAttributes = ['class', 'id', 'title', 'alt', 'src', 'href'];
    Object.entries(attributes).forEach(([key, value]) => {
      if (safeAttributes.includes(key)) {
        element.setAttribute(key, value);
      }
    });
    
    return element;
  }
}

// ==================== CSRF防护示例 ====================

// 1. CSRF Token管理
class CSRFProtection {
  constructor() {
    this.token = this.getToken();
  }
  
  // 获取CSRF Token
  getToken() {
    return document.querySelector('meta[name="csrf-token"]')?.content ||
           document.cookie.match(/csrf-token=([^;]+)/)?.[1];
  }
  
  // 添加Token到请求头
  addTokenToHeaders(headers = {}) {
    return {
      ...headers,
      'X-CSRF-Token': this.token
    };
  }
  
  // 添加Token到表单
  addTokenToForm(form) {
    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = '_csrf';
    tokenInput.value = this.token;
    form.appendChild(tokenInput);
  }
}

// 2. 安全的AJAX请求
class SecureRequest {
  constructor() {
    this.csrf = new CSRFProtection();
  }
  
  // 安全GET请求
  async get(url, options = {}) {
    return this.request(url, {
      method: 'GET',
      ...options
    });
  }
  
  // 安全POST请求
  async post(url, data, options = {}) {
    return this.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(data),
      ...options
    });
  }
  
  // 通用安全请求
  async request(url, options = {}) {
    const secureOptions = {
      credentials: 'same-origin', // 包含cookies
      headers: this.csrf.addTokenToHeaders(options.headers),
      ...options
    };
    
    try {
      const response = await fetch(url, secureOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  }
}

// ==================== 综合安全工具类 ====================

class SecurityUtils {
  constructor() {
    this.xss = new XSSProtection();
    this.csrf = new CSRFProtection();
    this.request = new SecureRequest();
  }
  
  // 安全的表单处理
  secureForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    // 添加CSRF Token
    this.csrf.addTokenToForm(form);
    
    // 添加输入验证
    this.addFormValidation(form);
    
    // 添加安全提交
    this.addSecureSubmit(form);
  }
  
  // 添加表单验证
  addFormValidation(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    
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
        this.showFieldError(field, ruleName);
        return false;
      }
    }
    
    this.clearFieldError(field);
    return true;
  }
  
  // 验证规则
  validateRule(value, rule, param) {
    const validators = {
      required: (val) => val && val.trim().length > 0,
      email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      minLength: (val, min) => val.length >= parseInt(min),
      maxLength: (val, max) => val.length <= parseInt(max),
      pattern: (val, pattern) => new RegExp(pattern).test(val),
      xss: (val) => !/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(val)
    };
    
    return validators[rule]?.(value, param) ?? true;
  }
  
  // 显示字段错误
  showFieldError(field, rule) {
    field.classList.add('error');
    
    const errorElement = field.parentNode.querySelector('.error-message') || 
                        document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = this.getErrorMessage(rule);
    
    if (!field.parentNode.querySelector('.error-message')) {
      field.parentNode.appendChild(errorElement);
    }
  }
  
  // 清除字段错误
  clearFieldError(field) {
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
      pattern: 'This field format is invalid',
      xss: 'This field contains invalid characters'
    };
    
    return messages[rule] || 'Invalid input';
  }
  
  // 添加安全提交
  addSecureSubmit(form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (this.validateForm(form)) {
        await this.submitForm(form);
      }
    });
  }
  
  // 验证表单
  validateForm(form) {
    const fields = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  // 提交表单
  async submitForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await this.request.post(form.action, data);
      this.onFormSuccess(response);
    } catch (error) {
      this.onFormError(error);
    }
  }
  
  // 表单成功回调
  onFormSuccess(response) {
    console.log('Form submitted successfully:', response);
    // 可以显示成功消息或重定向
  }
  
  // 表单错误回调
  onFormError(error) {
    console.error('Form submission failed:', error);
    // 可以显示错误消息
  }
  
  // 安全的用户输入处理
  processUserInput(input, type = 'text') {
    // 1. 验证输入
    if (!XSSProtection.validateInput(input, type)) {
      throw new Error('Invalid input');
    }
    
    // 2. 清理输入
    const sanitized = XSSProtection.escapeHtml(input);
    
    return sanitized;
  }
  
  // 安全的显示内容
  displayContent(elementId, content, allowHTML = false) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    if (allowHTML) {
      SecureDOM.setHTML(element, content);
    } else {
      SecureDOM.setContent(element, content);
    }
  }
}

// ==================== 使用示例 ====================

// 初始化安全工具
const security = new SecurityUtils();

// 示例1：安全表单
document.addEventListener('DOMContentLoaded', () => {
  // 设置安全表单
  security.secureForm('user-form');
});

// 示例2：处理用户输入
function handleUserComment() {
  const commentInput = document.getElementById('comment-input');
  const comment = commentInput.value;
  
  try {
    const safeComment = security.processUserInput(comment, 'text');
    security.displayContent('comment-display', safeComment);
  } catch (error) {
    console.error('Invalid comment:', error.message);
  }
}

// 示例3：安全AJAX请求
async function updateUserProfile(userData) {
  try {
    const response = await security.request.post('/api/user/profile', userData);
    console.log('Profile updated:', response);
  } catch (error) {
    console.error('Update failed:', error);
  }
}

// 示例4：XSS防护测试
function testXSSProtection() {
  const maliciousInput = '<script>alert("XSS")</script>';
  
  console.log('Original input:', maliciousInput);
  console.log('Escaped input:', XSSProtection.escapeHtml(maliciousInput));
  console.log('Is valid:', XSSProtection.validateInput(maliciousInput, 'text'));
}

// 示例5：CSRF防护测试
function testCSRFProtection() {
  const csrf = new CSRFProtection();
  console.log('CSRF Token:', csrf.getToken());
  
  const headers = csrf.addTokenToHeaders();
  console.log('Headers with CSRF:', headers);
}

// 运行测试
console.log('=== XSS Protection Test ===');
testXSSProtection();

console.log('\n=== CSRF Protection Test ===');
testCSRFProtection();

// 导出安全工具
export { SecurityUtils, XSSProtection, CSRFProtection, SecureRequest }; 