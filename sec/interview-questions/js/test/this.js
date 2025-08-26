const obj = {
    f1() {
      const fn = () => {
        console.log('this1', this)
      }
      fn()
      fn.call(window)
    },
    f2: () => {
      function fn() {
        console.log('this2', this)
      }
      fn()
      fn.call(this)
    },
  }
  obj.f1()
  obj.f2()