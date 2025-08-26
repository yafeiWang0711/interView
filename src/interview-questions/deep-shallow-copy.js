/**
 * JavaScript深浅拷贝面试题详解
 * 知识点：赋值 vs 浅拷贝 vs 深拷贝、实现方式对比、循环引用处理
 */

// 问题1：赋值、浅拷贝与深拷贝的区别
const obj = { a: 1, b: { c: 2 } };

// 赋值 - 引用关系
const assignObj = obj;
assignObj.b.c = 3; // 原对象也会改变

// 浅拷贝 - 仅拷贝第一层
const shallowObj = { ...obj };
shallowObj.b.c = 4; // 原对象仍会改变

// 深拷贝 - 完全独立的副本
const deepObj = JSON.parse(JSON.stringify(obj));
shallowObj.b.c = 5; // 原对象不受影响

// 问题2：实现一个完整的深拷贝函数（考虑特殊类型）
function deepClone(target, hash = new WeakMap()) {
  // 处理null和基本类型
  if (target === null || typeof target !== 'object') return target;

  // 处理循环引用
  if (hash.has(target)) return hash.get(target);

  let cloneObj;
  // 处理日期
  if (target instanceof Date) {
    cloneObj = new Date(target);
    hash.set(target, cloneObj);
    return cloneObj;
  }

  // 处理正则
  if (target instanceof RegExp) {
    cloneObj = new RegExp(target.source, target.flags);
    hash.set(target, cloneObj);
    return cloneObj;
  }

  // 处理数组和对象
  cloneObj = Array.isArray(target) ? [] : {};
  hash.set(target, cloneObj);

  // 递归拷贝属性
  Reflect.ownKeys(target).forEach(key => {
    cloneObj[key] = deepClone(target[key], hash);
  });

  return cloneObj;
}

// 问题3：结构化克隆(Structured Clone) API
/**
 * 优点：原生支持，无需手写递归
 * 缺点：不支持函数、Symbol、DOM节点等
 */
const structuredCloneObj = structuredClone(obj);

// 问题4：深拷贝性能优化策略
/**
 * 1. 使用WeakMap处理循环引用
 * 2. 避免递归爆栈：改用迭代+栈/队列
 * 3. 类型判断优化：优先判断基础类型
 * 4. 特殊对象处理：只处理必要的内置对象
 */
function deepCloneOptimized(target) {
  if (!isObject(target)) return target;
  const root = Array.isArray(target) ? [] : {};
  const stack = [{ parent: root, key: undefined, data: target }];
  const hash = new WeakMap();

  while (stack.length) {
    const { parent, key, data } = stack.pop();
    let current = parent;
    if (key !== undefined) {
      current = parent[key] = Array.isArray(data) ? [] : {};
    }

    if (hash.has(data)) {
      parent[key] = hash.get(data);
      continue;
    }
    hash.set(data, current);

    for (const k of Reflect.ownKeys(data)) {
      if (isObject(data[k])) {
        stack.push({ parent: current, key: k, data: data[k] });
      } else {
        current[k] = data[k];
      }
    }
  }
  return root;
}
function isObject(target) { return typeof target === 'object' && target !== null; }