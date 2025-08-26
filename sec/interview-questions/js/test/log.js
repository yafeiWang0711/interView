console.log(1);

setTimeout(() => {
    console.log(2);
}, 0);

console.log(3);

new Promise((resolve) => {
    console.log(4);
    resolve();``
    console.log(5);
}).then(() => {
    console.log(6);
});

console.log(7);
