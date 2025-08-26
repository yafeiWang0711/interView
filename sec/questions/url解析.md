### 浏览器输入url到页面渲染的过程
    1. 输入url 到浏览器地址栏
    2. 浏览器查找域名ip地址 DNS解析
    3. 浏览器向服务器发送http请求（http协议）
    4. 服务器接受请求并返回响应
    5. 浏览器解析html代码
    6. 浏览器解析css代码
    7. 浏览器解析js代码
    8. 浏览器渲染页面
    9. 页面加载完成

    [
  {
    title: 'URL解析',
    description: '浏览器解析URL的各个部分：协议、域名、路径、参数等',
    status: '等待中',
    active: false,
    completed: false,
    details: null
  },
  {
    title: 'DNS解析',
    description: '将域名转换为IP地址，包括本地缓存、ISP DNS、根DNS等查询过程',
    status: '等待中',
    active: false,
    completed: false,
    details: '浏览器缓存 → 系统缓存 → 路由器缓存 → ISP DNS → 根DNS → 权威DNS'
  },
  {
    title: 'TCP连接',
    description: '与服务器建立TCP连接，进行三次握手',
    status: '等待中',
    active: false,
    completed: false,
    details: 'SYN → SYN+ACK → ACK'
  },
  {
    title: 'SSL/TLS握手',
    description: '如果是HTTPS，进行SSL/TLS握手建立加密通道',
    status: '等待中',
    active: false,
    completed: false,
    details: 'Client Hello → Server Hello → 证书验证 → 密钥交换'
  },
  {
    title: 'HTTP请求',
    description: '发送HTTP请求到服务器',
    status: '等待中',
    active: false,
    completed: false,
    details: 'GET / HTTP/1.1\nHost: www.example.com\nUser-Agent: ...'
  },
  {
    title: '服务器处理',
    description: '服务器处理请求并返回响应',
    status: '等待中',
    active: false,
    completed: false,
    details: '路由匹配 → 业务处理 → 数据库查询 → 生成响应'
  },
  {
    title: 'HTML解析',
    description: '浏览器解析HTML，构建DOM树',
    status: '等待中',
    active: false,
    completed: false,
    details: '解析HTML标签 → 构建DOM树 → 构建CSSOM树 → 合并渲染树'
  },
  {
    title: '资源加载',
    description: '加载CSS、JavaScript、图片等外部资源',
    status: '等待中',
    active: false,
    completed: false,
    details: '并行下载 → 优先级控制 → 缓存利用'
  },
  {
    title: '页面渲染',
    description: '计算布局，绘制页面，执行JavaScript',
    status: '等待中',
    active: false,
    completed: false,
    details: '布局计算 → 绘制页面 → JS执行 → 事件绑定'
  },
  {
    title: '页面加载完成，四次挥手断开连接',
    description: '页面加载完成，用户可以交互',
    status: '等待中',
    active: false,
    completed: false,
    details: '页面加载完成，用户可以交互'
  }
]


    