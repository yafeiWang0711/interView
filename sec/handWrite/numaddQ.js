// 数字添加千分位
function addComma(num) {
    // return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    let str = num.toString();
    let strLen = str.length;
    let result = '';
    for (let i = 0; i < strLen; i++) {
        if (i > 0 && i % 3 === 0) {
            result += ','
        }
        result += str[i]
    }
    return result;

}
// 测试
console.log(addComma(1000000)); // 1,000,000
console.log(addComma(1000000.123)); // 1,000,000.123
console.log(addComma(1000000.123456)); // 1,000,000.123,456