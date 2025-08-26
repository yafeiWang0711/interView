### 深拷贝 vs 浅拷贝
    深拷贝和浅拷贝是指在复制一个对象时，是否复制对象的所有属性和方法。
    浅拷贝只复制对象的引用，而深拷贝则复制对象的所有属性和方法。
    深拷贝和浅拷贝的区别主要体现在对象的引用上。
    浅拷贝只复制对象的引用，而深拷贝则复制对象的所有属性和方法。
    因此，浅拷贝的对象和原对象指向的是同一个内存地址，而深拷贝的对象和原对象指向的是不同的内存地址。

    深拷贝 避免循环引用的问题
    深拷贝可以避免循环引用的问题，因为深拷贝会复制对象的所有属性和方法，而不会出现循环引用的现象。
    例如：
        let obj = {a: 1, b: 2};
        let obj2 = JSON.parse(JSON.stringify(obj));
        obj2.a = 3;
        console.log(obj); // {a: 1, b: 2}
        console.log(obj2); // {a: 3, b: 2}
        上面的代码中，obj和obj2是两个不同的对象，它们的属性值是相同的，但是指向的内存地址是不同的。
        深拷贝可以避免循环引用的问题，因为深拷贝会复制对象的所有属性和方法，而不会出现循环引用的现象。
        例如：
            let obj = {a: 1, b: 2};
            obj.c = obj;
            let obj2 = JSON.parse(JSON.stringify(obj));
            上面的代码中，obj和obj2是两个不同的对象，它们的属性值是相同的，但是指向的内存地址是不同的。
            深拷贝可以避免循环引用的问题，因为深拷贝会复制对象的所有属性和方法，而不会出现循环引用的现象。
          
    实现深拷贝的方法
        1. 使用JSON方法
            let obj = {a: 1, b: 2};
            let obj2 = JSON.parse(JSON.stringify(obj));
            不能复制函数和undefined
            不能复制循环引用的对象
        
        2. 使用递归实现深拷贝
            function deepClone(obj, cloneObj = {}) {
                if (obj === null || typeof obj !== 'object') {
                    return obj;
                }
                
                if (obj instanceof Date) {
                    cloneObj = new Date(obj);
                }
                if (obj instanceof RegExp) {
                    cloneObj = new RegExp(obj);
                }
                if (obj instanceof Function) {
                    cloneObj = new Function('return ' + obj)();
                }
                if (obj instanceof Object) {
                    cloneObj = {};
                }
            
                if (Array.isArray(obj)) {
                    cloneObj = [];
                } else {
                    cloneObj = {};
                }
                
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        cloneObj[key] = deepClone(obj[key]);
                    }
                }
                
                return cloneObj;
            }
        
        3. 使用lodash的_.cloneDeep方法
            let obj = {a: 1, b: 2};
            let obj2 = _.cloneDeep(obj);
            可以复制函数和undefined
            可以复制循环引用的对象
            可以复制DOM元素
            可以复制正则表达式
