let n = 10
function f1() {
  n++
  function f2() {
    function f3() {
      n++
      console.log('f3',n);
    }
    let n = 20
    f3()
    n++
    console.log('f2',n);
  }
  f2()
  n++
}
f1()
console.log('n', n)

