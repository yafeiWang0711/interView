// 深浅拷贝的区别

// 1. 浅拷贝
//    浅拷贝就是拷贝对象的引用，拷贝对象和原对象指向同一个内存地址，拷贝对象和原对象的值会互相影响
//    创建一个新的对象或数组，但是仅仅复制第第一层次的属性或元素
//    浅拷贝实现方法


let obj = {
    a: 1,
    b: 2,
    c: {
        c1: 'c1',
        c2: 'c3',
    }
}

let obj1 = obj

obj1.a = 'aaa'
obj1.c.c1 = 'c1111'

console.log(obj);

console.log(obj1);

// 手写深拷贝

function deepCopy(obj, hash = new WeakMap()) {
    // 是基本数据类型的时候直接返回
    if (obj == null || typeof (obj) !== 'object') {
        return obj
    }

    // 时间类型
    if (obj instanceof Date) {
        return new Date(obj.getTime())
    }

    // 正则
    if (obj instanceof RegExp) {
        return new RegExp(obj)
    }

    // function
    if (obj instanceof Function) {
        return obj
    }

    if (hash.has(obj)) {
        return hash.get(obj)
    }


    const cloneObj = Array.isArray(obj) ? [] : {};
    hash.set(obj, cloneObj);

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key], hash);
        }
    }

    return cloneObj;

}
