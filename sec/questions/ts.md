### ts 基础

    1. 类型
        1. 类型注解
            类型注解是指在变量、函数参数、函数返回值等位置添加类型信息。
            例如：
                let a: number = 1;
                function add(a: number, b: number): number {
                    return a + b;
                }
        2. 类型推断
            类型推断是指根据变量的初始值、函数的返回值等推断出变量的类型。
            例如：
                let a = 1; // 推断为 number 类型
                function add(a: number, b: number) {
                    return a + b;
                } // 推断为 (a: number, b: number) => number 类型
                let b = '1'; // 推断为 string 类型
                function add(a: string, b: string) {
                    return a + b;
                } // 推断为 (a: string, b: string) => string 类型
                let c = true; // 推断为 boolean 类型
                function add(a: boolean, b: boolean) {
                    return a && b;
                } // 推断为 (a: boolean, b: boolean) => boolean 类型