### 数组方法
    数组方法主要包括以下几个方面：
    push()：在数组的末尾添加一个或多个元素，并返回新的长度。
    pop()：删除数组的最后一个元素，并返回该元素。
    shift()：删除数组的第一个元素，并返回该元素。
    unshift()：在数组的开头添加一个或多个元素，并返回新的长度。
    splice()：删除或替换数组的元素，并返回被删除的元素。
    slice()：返回数组的一个副本。
    concat()：合并两个或多个数组，并返回新的数组。
    join()：将数组的所有元素连接成一个字符串。
    reverse()：颠倒数组中元素的顺序。
    sort()：对数组的元素进行排序。
    indexOf()：返回数组中第一个匹配元素的索引。
    lastIndexOf()：返回数组中最后一个匹配元素的索引。
    includes()：判断数组是否包含指定元素。
    find()：返回数组中满足条件的第一个元素。
    findIndex()：返回数组中满足条件的第一个元素的索引。
    forEach()：对数组的每个元素执行一次函数。
    map()：对数组的每个元素调用一个函数，并返回新的数组。
    filter()：返回数组中满足条件的元素组成的新数组。
    reduce()：对数组的每个元素调用一个函数，将结果汇总为一个值。
    some()：判断数组中是否至少有一个元素满足条件。
    every()：判断数组中的所有元素是否都满足条件。
    flat()：将嵌套的数组展开为一个新数组。
    flatMap()：对数组的每个元素调用一个函数，将结果展开为一个新数组。

    数组扁平化：
    数组扁平化是指将嵌套的数组展开为一个新数组。
    1. 使用 flat 方法：
    let arr = [1, 2, [3, 4, [5, 6]]];
    let flatArr = arr.flat();
    console.log(flatArr); // [1, 2, 3, 4, [5, 6]]
    如果要展开多层嵌套数组，可以指定深度：
    let arr = [1, 2, [3, 4, [5, 6]]];
    let flatArr = arr.flat(Infinity);
    console.log(flatArr); // [1, 2, 3, 4, 5, 6]
    2. 使用递归：
    function flatten(arr) {
        return arr.reduce((prev, cur) => {
            return prev.concat(Array.isArray(cur) ? flatten(cur) : cur);
        }, []);
    }
    
