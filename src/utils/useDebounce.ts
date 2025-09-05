// 防抖函数
import { useCallback, useEffect, useRef } from 'react';

/**
 * 防抖 Hook
 * @param func 需要防抖的函数
 * @param delay 延迟时间(毫秒)
 * @param immediate 是否立即执行（true: 触发时立即执行，false: 延迟后执行）
 * @returns 防抖处理后的函数和取消函数
 */
function useDebounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  immediate: boolean = false
) {
  // 存储定时器ID
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // 存储最新的函数引用（处理函数更新的情况）
  const funcRef = useRef<T>(func);

  // 当传入的函数更新时，更新ref中的函数引用
  useEffect(() => {
    funcRef.current = func;
  }, [func]);

  // 防抖处理函数
  const debouncedFunc = useCallback((...args: Parameters<T>) => {
    // 如果已有定时器，清除它
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // 立即执行模式
    if (immediate) {
      // 判断是否是首次触发（没有定时器）
      const isFirstTrigger = !timerRef.current;
      // 设置定时器，delay后清空（以便下次能再次触发）
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
      }, delay);
      
      // 首次触发时立即执行
      if (isFirstTrigger) {
        funcRef.current.apply(this, args);
      }
    } else {
      // 延迟执行模式：重新设置定时器
      timerRef.current = setTimeout(() => {
        funcRef.current.apply(this, args);
        timerRef.current = null;
      }, delay);
    }
  }, [delay, immediate]);

  // 取消当前防抖
  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // 组件卸载时清除定时器，防止内存泄漏
  useEffect(() => {
    return cancel;
  }, [cancel]);

  return { debouncedFunc, cancel };
}

export default useDebounce;

