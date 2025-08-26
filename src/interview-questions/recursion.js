// 递归
// 1.递归实现数组扁平化
const arr = [1, 2, 3, [21, 22, 23, [221, 222, 223], [231, 232]], 122, ['a', 'b']]
const recursionArr = (arr) => {
    let result = []
    function handle(arr) {
        arr.forEach(item => {
            // 如果还是数组，使用递归在进行处理 不是数组的话push到result
            if (Array.isArray(item)) {
                handle(item)
            } else {
                result.push(item)
            }
        });
    }
    handle(arr)
    return result
}

recursionArr(arr)