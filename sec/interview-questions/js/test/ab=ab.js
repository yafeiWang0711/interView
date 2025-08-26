// 如何让 var [a,b] = {a:1,b:2} 解构成功


let obj = {
    a:1,
    b:2
}

Object.prototype[Symbol.iterator] = function(){
    // 使用 Object.values(this) 方法获取对象的所有值，并返回这些值的迭代器对象
    return Object.values(this)[Symbol.iterator]()
}

const [a,b] =obj
console.log(a,b);

console.log(obj);


