// 手写获取数据类型

function getType(data){
    if(data === null) return null
    // typeof 基本数据类型除了null function
    if(typeof data !='object'){
        return typeof data
    }else{
       return Object.prototype.toString.call(data).slice(8,-1)
    }

}

// {
//     var a = '123' 
// }
function test(){
    var a = '456' 
}

    console.log(a);


console.log(getType(null));
console.log(getType(12n));
console.log(getType(12));
console.log(getType({}));
console.log(getType(function(){}));
console.log(getType([1,2,3]));





