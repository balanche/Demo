function testPromiseSync() {
    console.log('testPromiseSync()');
    let p = new Promise((resolve, reject) => {
        console.log('in executor');// 最先执行
        setTimeout(console.log, 0, 'executor');// 在 new Promise 时就执行
        setTimeout(reject, 2000, 'mError'); // 2秒后调用reject()
        // 执行函数的逻辑
    });
    setTimeout(console.log, 0, 'promise initialized'); 
    setTimeout(console.log, 0, p); // Promise <pending>
    setTimeout(console.log, 3000, p); // 3秒后再检查状态
}

function testPromiseResolve () {
    console.log('testPromiseResolve()');
    let p = new Promise((resolve, reject) => {
        reject('mError')
    });
    setTimeout(console.log, 0, p === Promise.resolve(p));
    setTimeout(console.log, 0, p === Promise.resolve(Promise.resolve(p)));
    setTimeout(console.log, 0, Promise.resolve(p));
}

function testPromiseReject () {
    console.log('testPromiseReject()');
    let p = new Promise((resolve, reject) => {
        resolve('mSuccess');
        // PS: resolve(Error('mError')) 和 resolve(new Error('mError')) 是等价的
    });
    
    setTimeout(console.log, 0, p === Promise.reject(p));
    setTimeout(console.log, 0, Promise.reject(p));
}

function testPromiseNest() {
    console.log('testPromiseNest()');
    // buy Pen
    function buy() {
        console.log("buy() ...");
        var p = new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log("Finish buy pen.");
                resolve("PEN");
            }, 3000);
        });
        return p;
    }

    // write Book
    function write(data) {
        console.log("write() ... with " + data);
        var p = new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log("Finish write book.");
                resolve("BOOK");
            }, 3000);
        });
        return p;
    }

    // commit Work
    function commitBook(data) {
        console.log("commitBook() ... with " + data);
        var p = new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log("Finish commit work.");
                resolve("SCORE-A");
            }, 3000);
        });
        return p;
    }

    buy()
        .then(write)
        .then(commitBook)
        .then((data)=>
            console.log(data)
        );
    
    let p1 = buy().then();
    setTimeout(console.log, 4000, p1);
}

function testCallBackNest() {
    console.log('testCallBackNest()');
    // buy Pen
    function buy(callBack) {
        console.log("buy() ...");
        setTimeout(function () {
            console.log("Finish buy pen.");
            callBack("PEN");
        }, 3000);
    }

    // write Book
    function write(data, callBack) {
        console.log("write() ... with " + data);
        setTimeout(function () {
            console.log("Finish write book.");
            callBack("BOOK");
        }, 3000);
    }

    // commit Work
    function commitBook(data, callBack) {
        console.log("commitBook() ... with " + data);
        setTimeout(function () {
            console.log("Finish commit work.");
            callBack("SCORE-A");
        }, 3000);
    }

    buy(pen =>
        write(pen, book => {
            commitBook(book, data => {
                console.log(data)
            })
        })
    )
}

function testPromiseThen() {
    console.log('testPromiseThen()');
    let p1 = Promise.resolve('P1-mSuccess');
    // /
    // let p1 = Promise.reject('P1-mError');

    // 有 onResolved/onRejected ：基于onResolved/onRejected 的返回值来构建，通过 Promise.resolve() 包装来生成新 promise。
    let p6 = p1.then(() => 'mSuccess',() => 'mError'); 
    let p7 = p1.then(() => Promise.resolve('mSuccess'),() => Promise.resolve('mSuccess'));
    let p9 = p1.then(() => Promise.reject('mError'),() => Promise.reject('mError')); // NAN / Uncaught (in promise) mError 
    setTimeout(console.log, 0, p6); // Promise {<fulfilled>: 'mSuccess'} / Promise {<fulfilled>: 'mError'}
    setTimeout(console.log, 0, p7); // Promise {<fulfilled>: 'mSuccess'}
    setTimeout(console.log, 0, p9); // Promise {<rejected>: 'mError'}

    // 无 onResolved/onRejected ：通过 Promise.resolve() 就会包装上一个 promise 解决之后的值
    let p2 = p1.then();// NAN / Uncaught (in promise) P1-mError
    setTimeout(console.log, 0, p1); // Promise {<fulfilled>: 'P1-mSuccess'} / Promise {<rejected>: 'P1-mError'}
    setTimeout(console.log, 0, p2); // Promise {<fulfilled>: 'P1-mSuccess'} / Promise {<rejected>: 'P1-mError'}
    setTimeout(console.log, 0, p1 === p2); // 返回新 promise，false

    // 没有显式的返回语句：通过 Promise.resolve() 会包装默认的返回值 undefined
    let p3 = p1.then(() => undefined,() => undefined);
    let p4 = p1.then(() => {},() => {});
    let p5 = p1.then(() => Promise.reject(),() => Promise.reject());// Uncaught (in promise) P1-mError
    setTimeout(console.log, 0, p3); // Promise {<fulfilled>: undefined}
    setTimeout(console.log, 0, p4); // Promise {<fulfilled>: undefined}
    setTimeout(console.log, 0, p5); // Promise <rejected>: undefined / Promise {<rejected>: undefined}

    // 抛出异常会返回rejected promise
    let p10 = p1.then(
    () => {throw 'mError';},
    () => {throw 'mError';}); // Uncaught (in promise) mError
    setTimeout(console.log, 0, p10); // Promise {<rejected>: 'mError'}
}

function testPromiseFinally() {
    console.log('testPromiseFinally()');
    let p1 = Promise.resolve('P1-mSuccess'); 

    // 返回pending、rejectedpromise：直接返回该 promise
    let p9 = p1.finally(() => new Promise(() => {})); 
    let p10 = p1.finally(() => Promise.reject('mError'));// Uncaught (in promise): mError 
    setTimeout(console.log, 0, p9); // Promise <pending> 
    setTimeout(console.log, 0, p10); // Promise <rejected>: 'mError'
    
    // 抛出异常：返回rejectedpromise
    let p11 = p1.finally(() => { throw 'mError'; }); // Uncaught (in promise) mError  
    setTimeout(console.log, 0, p11); // Promise <rejected>: mError 

    // 传递上一个 promise
    let p2 = p1.finally(); 
    let p3 = p1.finally(() => undefined); 
    let p4 = p1.finally(() => {}); 
    let p5 = p1.finally(() => Promise.resolve()); 
    let p6 = p1.finally(() => 'mError'); 
    let p7 = p1.finally(() => Promise.resolve('mError')); 
    let p8 = p1.finally(() => Error('mError')); 
    setTimeout(console.log, 0, p2); // Promise {<fulfilled>: 'P1-mSuccess'} 
    setTimeout(console.log, 0, p3); // Promise {<fulfilled>: 'P1-mSuccess'} 
    setTimeout(console.log, 0, p4); // Promise {<fulfilled>: 'P1-mSuccess'} 
    setTimeout(console.log, 0, p5); // Promise {<fulfilled>: 'P1-mSuccess'} 
    setTimeout(console.log, 0, p6); // Promise {<fulfilled>: 'P1-mSuccess'} 
    setTimeout(console.log, 0, p7); // Promise {<fulfilled>: 'P1-mSuccess'} 
    setTimeout(console.log, 0, p8); // Promise {<fulfilled>: 'P1-mSuccess'} 
}

function testPromiseNonReentrancy() {
    console.log('testPromiseNonReentrancy()');
    let synchronousResolve;  // 创建一个期约并将解决函数保存在一个局部变量中 
    let p = new Promise((resolve) => {
        console.log('0: in executor');
        setTimeout(console.log, 1000, 'in executor: setTimeout 1000');
        synchronousResolve = function () {
            console.log('1: invoking resolve()');
            resolve();
            console.log('2: resolve() returns');
        };
    });

    p.then(() => console.log('4: then() handler executes'));
    synchronousResolve();
    console.log('3: synchronousResolve() returns');
    // 实际的输出：
    // 0: in executor
    // 1: invoking resolve() 
    // 2: resolve() returns 
    // 3: synchronousResolve() returns 
    // 4: then() handler executes
    // in executor: setTimeout 1000
}

function testPromiseAllRace() {
    console.log('testPromiseAllRace()');
    let p = Promise.all([
    // let p = Promise.race([
        Promise.reject('first'),

        new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('second');
                console.log('2')
            }, 1000);
        }),

        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('third');
                console.log('3')
            }, 2000);
        })

    ]);

    p.then(
        (value)=>setTimeout(console.log, 0, 'success:' + value),
        (reason)=>setTimeout(console.log, 0, 'fail:' + reason),
    )
}

function testAsyncFn() {
    console.log('testAsyncFn()');// 执行与异步函数同级的前部分同步代码

    async function asyncFn() {
        console.log('2');
        let p = await new Promise((resolve, reject) => setTimeout(resolve, 2000, 'mSuccess'));
        console.log('5');
        return p;
    }

    console.log('1');// 执行与异步函数同级的前部分同步代码
    asyncFn().then(console.log);
    console.log('3');// 执行与异步函数同级的后部分同步代码

    setTimeout(console.log, 1000, '4');// 执行与异步函数同级的后部分同步代码: 添加到消息队列中
    setTimeout(console.log, 2000, '6');// 执行与异步函数同级的后部分同步代码: 添加到消息队列中
    setTimeout(console.log, 3000, '7');// 执行与异步函数同级的后部分同步代码: 添加到消息队列中
}

function testAsyncSleep() {
    async function sleep(delay) {
        return new Promise((resolve) => setTimeout(resolve, delay));
    }

    async function task() {
        const t0 = Date.now();
        console.log('before:' + t0);
        await sleep(1500); // 暂停约1500毫秒
        t1 = Date.now();
        console.log('after:' + t1 + ',during:' + (t1 - t0));
    }
    task();
}

function testAsyncParallel0() {
    async function randomDelay(id) {
        const delay = 2000;// Math.random() * 1000
        return new Promise((resolve) => setTimeout(() => {
            console.log(`${id} finished`);
            resolve(id);
        }, delay));
    } 
    
    async function task() {
        const t0 = Date.now();
        console.log(`awaited ${await randomDelay(0)}`);
        console.log(`awaited ${await randomDelay(1)}`);
        console.log(`awaited ${await randomDelay(2)}`);
        console.log(`awaited ${await randomDelay(3)}`);
        console.log(`awaited ${await randomDelay(4)}`);
        console.log(`${Date.now() - t0}ms elapsed`);
    }
    task();
}

function testAysncParallel1() {
    async function randomDelay(id) {
        const delay = 2000;// Math.random() * 1000
        return new Promise((resolve) => setTimeout(() => {
            console.log(`${id} finished`);
            resolve(id);
        }, delay));
    } 

    async function task() {
        const t0 = Date.now();
        let p0 = randomDelay(0);
        let p1 = randomDelay(1);
        let p2 = randomDelay(2);
        let p3 = randomDelay(3);
        let p4 = randomDelay(4);

        console.log(`awaited ${await p0}`);
        console.log(`awaited ${await p1}`);
        console.log(`awaited ${await p2}`);
        console.log(`awaited ${await p3}`);
        console.log(`awaited ${await p4}`);
        console.log(`${Date.now() - t0}ms elapsed`);
    }
    task();
}

testAysncParallel1()


