// 加减法hooks
import { ref } from 'vue'

export const useAddSub = () => {
  // 加法 可以接受多个参数
  const add = (...args) => {
    return args.reduce((a, b) => a + b, 0)
  }

  // 减法 可以接受多个参数
  const sub = (...args) => {
    if (args.length === 0) return 0;
    if (args.length === 1) return args[0];
    return args.reduce((a, b) => a - b)
  }

  // 乘法 可以接受多个参数
  const mul = (...args) => {
    return args.reduce((a, b) => a * b, 1)
  }

  // 除法 可以接受多个参数
  const div = (...args) => {
    if (args.length === 0) return 0;
    if (args.length === 1) return args[0];
    if (args.includes(0)) {
      return('不能有包含0');
    }
    return args.reduce((a, b) => {
      return a / b;
    });
  }

  return {
    add,
    sub,
    mul,
    div
  }
}
