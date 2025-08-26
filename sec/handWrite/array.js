

let arr = [1, 2, 3, 4, 5];

// // map 能不能中止循环
try {
    arr.map((item) => {
        if (item === 3) {
            throw new Error('中断循环');
        }
        console.log(item);
    })
} catch (error) {
    console.log(error.message);
}

console.log('forEach 能不能中止循环');
    // 输出：1 2 4 5
    // 注意：map 方法不能中止循环，只能返回 undefined。
    // 如果要中止循环，需要使用 for 循环或 forEach 方法。
    // arr.forEach((item) => {
    //     if (item === 3) {
    //         try {
    //             throw new Error('中断循环');
    //         } catch (error) {
    //             console.log(error.message);
    //         }
    //     }
    //     console.log(item);
    // })
    // 输出：1 2 4 5
    // 注意：forEach 方法不能中止循环，只能返回 undefined。
    // 如果要中止循环，需要使用 for 循环。

    try {
        arr.forEach((item) => {
            if (item === 3) {
                throw new Error('中断循环');
            }
            console.log(item);
        })
    } catch (error) {
        console.log(error.message);
    }