### for...in 循环
    for...in 循环用于遍历对象的可枚举属性。
    例如：
    for (let key in obj) {
        console.log(key);
    }
    其中，key 是对象 obj 的属性名，obj 是要遍历的对象。
    注意：for...in 循环会遍历对象的所有可枚举属性，包括原型链上的属性。
    如果要遍历对象自身的属性，可以使用 Object.hasOwnProperty 方法。
    例如：
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            console.log(key);
        }
    }
    其中，key 是对象 obj 的属性名，obj 是要遍历的对象。
    注意：Object.hasOwnProperty 方法只能遍历对象自身的属性，不能遍历原型链上的属性。

### for...of 循环
    for...of 循环用于遍历可迭代对象的元素。
    例如：
    for (let value of arr) {
        console.log(value);
    }
    其中，value 是数组 arr 的元素，arr 是要遍历的数组。
    注意：for...of 循环只能遍历数组和字符串等可迭代对象，不能遍历对象。
    如果要遍历对象的属性，可以使用 Object.keys 方法将对象转换为数组，再使用 for...of 循环。
    例如：
    for (let key of Object.keys(obj)) {
        console.log(key);
    }
    其中，key 是对象 obj 的属性名，obj 是要遍历的对象。
    注意：Object.keys 方法返回的是一个数组，数组的元素是对象 obj 的属性名。