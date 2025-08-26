function sum(...args) {
  // 计算当前参数总和
  const total = args.reduce((acc, val) => acc + val, 0);

  // 定义下一次调用的函数
  const next = (...nextArgs) => {
    // 如果没有传入新参数，直接返回当前总和
    if (nextArgs.length === 0) return total;
    // 否则递归调用sum，将当前总和与新参数合并
    return sum(total, ...nextArgs);
  };

  // 重写toString和valueOf方法，返回当前总和
  next.toString = () => total;
  next.valueOf = () => total;

  return next;
}

console.log(sum(1)(2));
