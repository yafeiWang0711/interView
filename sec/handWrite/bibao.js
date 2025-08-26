// 闭包

function outer() {
    let a = 1;
    function inner() {
        console.log(a);
    }
    return inner;
}

const innerFn = outer();
innerFn(); // 1

let a = 2;
innerFn(); // 1 依然打印1，因为innerFn捕获了outer的a变量
