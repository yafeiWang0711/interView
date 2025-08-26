// 如何让 a==1 && a==2 为true

//js调用==进行比较时，不同与===，双等号会触发类型转换，
// //进行比较的事实上不是原始值，而是**toString()的返回值，所以我们可以从原型方法toString()**上做一点手脚
// 1. **对象与数字比较**：会调用对象的 `valueOf()` 或 `toString()` 方法
// 2. **Symbol.toPrimitive**：如果对象有这个方法，会优先调用
// 3. **类型转换顺序**：`Symbol.toPrimitive` → `valueOf()` → `toString()`


// 1.重写valueOf()
const a = {
    value: 1,
    valueOf() {
        return this.value++
    }
}

// a==1  调用valueOf 返回 1 然后value+1
// a==2  调用valueOf 返回 2 然后value+1

console.log('a==1 && a==2', a == 1 && a == 2);


// 2.重写toString()方法
const b = {
    num: 1,
    toString() {
        return this.num++
    }
}
console.log('b==1 && b==2', b == 1 && b == 2);


// 3.使用数组
// 数组的shift方法是删除第一个元素，并且返回当前删除的元素
let c = [1, 2]
c.toString = c.shift
console.log('c==1 && c==2', c == 1 && c == 2);

// 4.Symbol.toPrimitive
let dCount = 1
let d = {
    [Symbol.toPrimitive]() {
        return dCount++
    }
}
console.log('d==1 && d==2', d == 1 && d == 2);


// 
