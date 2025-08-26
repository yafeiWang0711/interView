/**
 * JavaScript防抖节流面试题详解
 * 知识点：实现原理、应用场景、性能优化
 */

// 闭包是实现防抖节流的关键，通过闭包保存变量状态，避免全局变量污染
// 问题1：手写防抖函数(Debounce)  取最后一次的
function debounce(fn, delay, immediate = false) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    // 立即执行版
    if (immediate && !timer) {
      fn.apply(this, args);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

// 问题2：手写节流函数(Throttle) 第一次开始之后固定时间内不再操作
// 方案1：时间戳版
function throttleTimestamp(fn, interval) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}

// 方案2：定时器版
function throttleTimer(fn, interval) {
  let timer = null;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, interval);
    }
  };
}

// 问题3：防抖与节流的应用场景
/**
 * 防抖应用：
 * - 搜索框输入联想
 * - 窗口大小resize事件
 * - 表单输入验证
 *
 * 节流应用：
 * - 滚动加载更多
 * - 高频点击按钮
 * - 鼠标移动跟踪
 */

// 问题4：带取消功能的防抖节流
function debounceWithCancel(fn, delay) {
  let timer = null;
  const debounced = function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
  // 取消方法
  debounced.cancel = function() {
    if (timer) clearTimeout(timer);
    timer = null;
  };
  return debounced;
}

// 问题5：防抖节流的性能优化
/**
 * 1. 使用requestAnimationFrame代替setTimeout（视觉相关场景）
 * 2. 添加leading/trailing选项控制执行时机
 * 3. 使用RAF节流示例：
 */
function throttleRAF(fn) {
  let isRunning = false;
  return function(...args) {
    if (!isRunning) {
      isRunning = true;
      requestAnimationFrame(() => {
        fn.apply(this, args);
        isRunning = false;
      });
    }
  };
}