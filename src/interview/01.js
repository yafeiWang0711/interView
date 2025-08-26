// 一、js超过number最大值的时候怎么处理
console.log(Number.MAX_VALUE);
console.log(1232131231231231231231231312312313123123123123);
// 1 BigInt
const bignum =BigInt('12324234234234234234234234234234234234234234234234111')
console.log(bignum);
// 2 使用外部库 deciaml


// 二、页面请求接口大规模并发问题
// 滑动窗口 算法 专门控制流量的
// 1. 请求队列，
// 队列
const q = []

// 入队，push


// 2. 防抖/截流做对应处理
// 3. 分页加载
