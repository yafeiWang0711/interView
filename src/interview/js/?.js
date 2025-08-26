let a = {
    name:'123',
    age:25,
    other:{
        sex:'男',
        phone:'15226117272'
    }
}

console.log(a.name ? a.name: 'other');
console.log(a.name ?? 'other'); //123
console.log(a.c ?? 'other'); //other 



