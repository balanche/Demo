function testIterator() {
    /**
     * 迭代器
     */
    const arr = ['h','e'];
    const iterator = arr[Symbol.iterator]();

    console.log(iterator.next()); // {value: 'h', done: false}
    console.log(iterator.next()); // {value: 'e', done: false}
    console.log(iterator.next()); // {value: undefined, done: true}

    for (const a of arr) {
        console.log(a);// 依次输出 'h'、'e'
    }

    /**
     * 生成器
     */
     function* generatorFn() {
         console.log('init');
         yield 'h';
         yield 'e';
      }
      // 生成器函数体只会在初次调用 next() 方法后开始执行
      let generatorFnObj = generatorFn();// 不会输出 init
      const item_0 = generatorFnObj.next();// init

      console.log(item_0);// {value: 'h', done: false}
      console.log(generatorFnObj.next());// {value: 'e', done: false}
      console.log(generatorFnObj.next());// {value: undefined, done: true}

      for (const item of generatorFnObj) {
          console.log(item);// 依次输出 {value: 'h', done: false}、{value: 'e', done: false}、{value: undefined, done: true}
      }

    /**
     * yield 作为输入
     * 上一次让生成器函数暂停的 yield 关键字会接收到传给 next()方法的第一个值。
     */
    function* generatorFn2() {
        console.log(yield 1);// 先执行语句 yield 1，再执行语句 console
    }
    let generatorFnObj2 = generatorFn2();

    const item2_0 = generatorFnObj2.next('B');// 无输出
    console.log(item2_0);// {value: 1, done: false}

    const item2_1 = generatorFnObj2.next('C');// C
    console.log(item2_1);// {value: undefined, done: true}

    /**
     * yield* 增强 yield 的行为，让它能够迭代一个可迭代对象，从而一次产出一个值
     */
    function* generatorFn3() {
        yield* ['h','e'];
    }
    const generatorFnObj3 = generatorFn3();
    for (const item of generatorFnObj3) {
        console.log(item);// 依次输出 'h'、'e'
    }

    // 使用 yield* 实现递归
    function* generatorFn4(n) {
        if(n > 0) {
            yield* generatorFn4(n - 1);
            yield n-1;
        } 
    }
    const generatorFnObj4 = generatorFn4(3);
    for (const item of generatorFnObj4) {
        console.log(item);// 依次输出 0、1、2
    }
}

testIterator();