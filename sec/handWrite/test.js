var a = 4;
function outerFun() {
    //没有var 
    a = 0;
    console.log(a, 'outerFun');
}

outerFun();
console.log(a, 'global');


// const b 
// b = 1;
// console.log(b);