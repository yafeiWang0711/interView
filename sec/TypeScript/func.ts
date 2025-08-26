// ts 函数
    // 1. 函数声明
    function add(a: number, b: number): number {
        return a + b;
    }
    // 2. 函数表达式
    const add2 = function (a: number, b: number): number {
        return a + b;
    }
    // 3. 箭头函数
    const add3 = (a: number, b: number): number => {
        return a + b;
    }

    // 没有返回值 void表示不返回任何值
    const add4 = (a: number, b: number): void => {
        console.log(a + b);
    }
