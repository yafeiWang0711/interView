// js this指向问题


// 1 this 提供一种机制，使得方法内部可以方便的访问和操作其所属对象的数据和其他方法 通过this，我们可以确保代码中对属性或者方法对引用是针对当前对象的而不是其他对象
var obj = {
    name: 'objName',
    greet: function () {
        console.log('hello,' + this.name);
    }
}

obj.greet()

// 2 动态上下文
function sayHi() {
    console.log('hello,' + this.name);
}

var person1 = {name:'person1',speak:sayHi}
var person2 = {name:'person2',speak:sayHi}

person1.speak()
person2.speak()


// 3 构造函数模式

function Person (name){
    this.name = name
}
var ap = new Person('ap')
var bob = new Person('bob')
console.log(ap.name);
console.log(bob.name);

// 通过正确的使用this，可以减少直接操作全局对象的可能性，从而降低代码之间的耦合度


