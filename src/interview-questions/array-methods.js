/**
 * JavaScript数组方法面试题详解
 * 知识点：遍历方法、转换方法、高阶函数应用、性能对比
 */

// 问题1：数组遍历方法对比及使用场景
const arr = [1, 2, 3, 4, 5];

// 1. forEach - 纯遍历，无返回值
arr.forEach((item, index) => console.log(item, index));

// 2. map - 返回新数组，不改变原数组
const doubled = arr.map(item => item * 2);

// 3. filter - 返回满足条件的元素组成的新数组
const evens = arr.filter(item => item % 2 === 0);

// 4. reduce - 累加器，功能强大
const sum = arr.reduce((acc, item) => acc + item, 0);
const flattened = [[1,2], [3,4]].reduce((acc, item) => [...acc, ...item], []);

// 5. find/findIndex - 查找元素/索引
const found = arr.find(item => item > 3);
const foundIndex = arr.findIndex(item => item > 3);

// 6. some/every - 判断数组是否满足条件
const hasEven = arr.some(item => item % 2 === 0);
const allPositive = arr.every(item => item > 0);

// 问题2：数组去重的6种实现方式
function unique1(arr) { return [...new Set(arr)]; }
function unique2(arr) { return arr.filter((v, i) => arr.indexOf(v) === i); }
function unique3(arr) {
  const obj = {};
  return arr.filter(v => obj[v] ? false : (obj[v] = true));
}
function unique4(arr) {
  const newArr = [];
  arr.forEach(v => !newArr.includes(v) && newArr.push(v));
  return newArr;
}
function unique5(arr) { return Array.from(new Set(arr)); }
function unique6(arr) { return arr.reduce((acc, v) => acc.includes(v) ? acc : [...acc, v], []); }

// 问题3：数组扁平化的4种实现方式
function flatten1(arr) { return arr.flat(Infinity); }
function flatten2(arr) {
  return arr.reduce((acc, v) => 
    Array.isArray(v) ? [...acc, ...flatten2(v)] : [...acc, v], []);
}
function flatten3(arr) {
  let result = [...arr];
  while (result.some(v => Array.isArray(v))) {
    result = [].concat(...result);
  }
  return result;
}
function flatten4(arr) { return arr.toString().split(',').map(Number); }

// 问题4：实现数组的push、pop、shift、unshift方法
function myPush(arr, ...elements) {
  const len = arr.length;
  for (let i = 0; i < elements.length; i++) {
    arr[len + i] = elements[i];
  }
  return arr.length;
}

function myPop(arr) {
  if (arr.length === 0) return undefined;
  const last = arr[arr.length - 1];
  arr.length--;
  return last;
}

function myShift(arr) {
  if (arr.length === 0) return undefined;
  const first = arr[0];
  for (let i = 0; i < arr.length - 1; i++) {
    arr[i] = arr[i + 1];
  }
  arr.length--;
  return first;
}

function myUnshift(arr, ...elements) {
  const len = elements.length;
  // 原数组元素后移
  for (let i = arr.length - 1; i >= 0; i--) {
    arr[i + len] = arr[i];
  }
  // 添加新元素
  for (let i = 0; i < len; i++) {
    arr[i] = elements[i];
  }
  return arr.length;
}

// 问题5：数组排序方法底层实现及时间复杂度
/**
 * 1. sort() - 不同浏览器实现不同
 *    - Chrome/V8: 小于22个元素用插入排序(O(n²))，大于等于用快速排序(O(n log n))
 *    - Firefox: 归并排序(O(n log n))
 *
 * 2. 常见排序算法对比：
 *    - 冒泡排序：O(n²)，稳定
 *    - 选择排序：O(n²)，不稳定
 *    - 插入排序：O(n²)，稳定
 *    - 快速排序：O(n log n)，不稳定
 *    - 归并排序：O(n log n)，稳定
 *    - 堆排序：O(n log n)，不稳定
 */