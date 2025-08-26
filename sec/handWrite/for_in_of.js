// for in 循环
    for (let key in obj) {
        console.log(key); // 输出对象的键名
    }
    // 注意：for in 循环会遍历对象的所有可枚举属性，包括原型链上的属性。
    // 如果只想遍历对象自身的属性，可以使用 hasOwnProperty 方法进行判断。
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            console.log(key); // 输出对象自身的属性
        }
    }

// for of 循环
    for (let value of arr) {
        console.log(value); // 输出数组的元素
    }
    // 注意：for of 循环只能遍历可迭代对象，如数组、字符串、Set、Map 等。
    // 如果要遍历对象的属性，需要使用 for in 循环。
    for (let value of obj) {
        console.log(value); // 输出对象的属性值
    }
    // 注意：for of 循环不能直接遍历对象的属性，需要使用 Object.keys 方法将对象的属性转换为数组，再进行遍历。
    for (let key of Object.keys(obj)) {
        console.log(key); // 输出对象的属性名
    }
