// 原型 

// 已有对象 可乐
const cola = {
    color: '褐色',
    sweetness: '高',
    sourness: '低',
    getf() {
        console.log('cola');
    }
}

// 以可乐为原型定义新对象
const myDrink = Object.create(cola)
myDrink.flavor = 'apple味道'
myDrink.getf = ()=>{
    console.log('myDrink==getf');   
}
myDrink.getf()
cola.getf()
