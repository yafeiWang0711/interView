// 类型 ts 的类型
    // 1. 基本类型
        // 1.1 数字类型 number
        let num: number = 1;
        // 1.2 字符串类型 string
        let str: string = 'hello';
        // 1.3 布尔类型 boolean
        let bool: boolean = true;
        // 1.4 空类型 void
        let voidType: void = undefined;
        // 1.5 未定义类型 undefined
        let undefinedType: undefined = undefined;
        // 1.6 空值类型 null
        let nullType: null = null;
        // 1.7 任意类型 any
        let anyType: any = 1;
        // 1.8 未知类型 unknown
        let unknownType: unknown = 1;
        // 1.9 never 类型
        // 不能将类型“1”分配给类型“never”。
        // 不能将类型“string”分配给类型“never”。
        let neverType: never  = (() => {
            throw new Error('error');
        })();
    // 2. 数组类型
        // 2.1 数组类型 number[]
        let numArr: number[] = [1, 2, 3];
        // 2.2 数组类型 Array<number>
        let numArr2: Array<number> = [1, 2, 3];
        // 2.3 数组类型 泛型
        let numArr3: Array<number> = [1, 2, 3];
    // 3. 元组类型
    // 3.1 元组类型 定义 Tuple 类型 定义一个数组，但是每个元素都是固定的类型
        let tuple: [number, string] = [1, 'hello'];
        // 3.1 元组类型 只读
        let readonlyTuple: readonly [number, string] = [1, 'hello'];
        // 3.2 元组类型 可选
        let optionalTuple: [number, string?] = [1, 'hello'];
        // 3.3 元组类型 剩余元素
        let restTuple: [number, ...string[]] = [1, 'hello', 'world'];
    // 4. 枚举类型
        // 4.1 枚举类型 数字枚举
        enum Direction {
            Up,
            Down,
            Left,
            Right,
        }
        let direction: Direction = Direction.Up;
    // 5. 任意类型
    // 6. 空类型
    // 7. 未知类型
    // 8.  never 类型
    // 9. 类型断言
    // 10. 类型守卫
    // 11. 类型别名
    // 12. 接口
    // 13. 类
    // 14. 泛型
    // 15. 类型运算
    // 16. 类型映射
    // 17. 类型条件
    // 18. 类型分发
    // 19. 类型索引
    // 20. 类型查询
    // 21. 类型投影
    // 22. 类型逆变
    // 23. 类型协变
    // 24. 类型兼容
    // 25. 类型互斥