// 私有方法
// 1. class内部的方法默认是私有的
class Person {
    #name = 'world';
    #age = 18;
    #say() {
        console.log('hello');
    }
    say() {
        this.#say();
    }
    getAge() {
        return this.#age;
    }
}
const p = new Person();
// p.#say(); 报错 私有方法不能直接调用
p.say();  // hello 
console.log(p.getAge());

console.log('===========')

// 2. 闭包
function MyClass() {
    // 私有方法（闭包内定义）
    function privateMethod() {
        console.log("闭包私有方法");
    }

    // 公有方法（暴露给外部）
    this.publicMethod = function() {
        privateMethod(); // 内部可调用
    };
}

const instance = new MyClass();
instance.publicMethod(); // 正常执行
// instance.privateMethod(); // 报错！外部无法访问私有方法 instance.privateMethod is not a function
