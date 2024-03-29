function testObject() {
    /**
     * 其他：key 值为变量，使用 []
     * 因为对象属性可以通过点来访问，也可以通过方括号来表示
     */
    let n = 'userName';
    // let CEO = {sex: 'male'}
    // CEO[n] = 'Tom';
    // CEO[3] = true; // 3自动转换为字符串
    let CEO = {
        [n]: 'Tom',
        sex: 'male',
        3: true  // 3自动转换为字符串
    }
    console.log(JSON.stringify(CEO));// {"3":true,"sex":"male","userName":"Tom"}
    console.log(CEO.userName);// Tom
    console.log(CEO[n]);// Tom
    console.log('\n');
}

function testArray() {
    let arr = ['h','e','l','l','o'];
    const str = 'hello world';
    
    // 动态改变数组
    console.log(arr + '\tlength:' + arr.length)// h,e,l,l,o	length:5
    arr[6] = 'w'
    console.log(arr + '\tlength:' + arr.length)// h,e,l,l,o,,w	length:7
    arr.length = 5
    console.log(arr + '\tlength:' + arr.length)// h,e,l,l,o	length:5

    // 数组解构
    const [a,b,c,d,e] = arr;
    console.log(' a = ' + a
        + '\t b = ' + b
        + '\t c = ' + c
        + '\t d = ' + d
        + '\t e = ' + e
    );// a = h	 b = e	 c = l	 d = l	 e = o

    // 扩展操作符：使用任何可以迭代的变量
    console.log([...str]);// ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']

    // 相当于复制数组
    let nArr = [...arr];
    let nArr2 = [...arr];
    console.log(nArr);// ['h', 'e', 'l', 'l', 'o']
    console.log(nArr == arr);// false
    console.log(nArr2 == arr);// true

    /**
     * Array.from 用法：适用任何可以迭代的结构
     * 第一个参数：任何可迭代的结构
     * 第二个参数：相当于 map 后处理，增强新数组的值
     * 第三个参数：用于指定映射函 数中 this 的值。但这个重写的 this 值在箭头函数中不适用
     */
    // 字符串。同 [...str]
    console.log(Array.from(str));// ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']
    // 数组。
    const copyArr = Array.from(arr);
    console.log(arr);// ['h', 'e', 'l', 'l', 'o']
    console.log('arr === copyArr //' +(arr === copyArr));// false
    // set
    const s = new Set().add('h').add('e');
    console.log(Array.from(s));// ['h', 'e']
    // Map
    const m = new Map().set('A', 'h').set('B', 'e')
    console.log(Array.from(m));// [ ['A', 'h'],['B', 'e'] ]
    // 迭代器
    const iter = {
        *[Symbol.iterator]() {
          yield 'h';
          yield 'e';
          yield 'l';
          yield 'l';
          yield 'o';
      }
    };
    console.log(Array.from(iter));// ['h', 'e', 'l', 'l', 'o']
    // 函数参数，同 Array.of(xx)
    function getArgsArray() {
        return Array.from(arguments)
    }
    console.log(getArgsArray('h','e','l','l','o'));// ['h', 'e', 'l', 'l', 'o']

   // 两参数情况
   console.log(Array.from(str, x => x.toUpperCase()));// ['H', 'E', 'L', 'L', 'O', ' ', 'W', 'O', 'R', 'L', 'D']
   // 三参数情况
   const arrStr = Array.from(
       str, 
       function(x) {
           return x.padEnd(this.num, this.placeStr)
       }, 
       {num: 2,placeStr: '!'}
   );
   console.log(arrStr);// ['h!', 'e!', 'l!', 'l!', 'o!', ' !', 'w!', 'o!', 'r!', 'l!', 'd!']
   // 注意，第三个参数，在第二个参数是箭头函数时，不适用
   const noUsed = Array.from(
       str, 
       x=> x.padEnd(this.num, this.placeStr), 
       {num: 2,placeStr: '!'}
   );
   console.log(noUsed);// ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']

   /**
    * Array.of 将一组参数转化为数组
    */
    console.log(Array.of('h','e','l','l','o'));// ['h', 'e', 'l', 'l', 'o']

    /**
     * 转化方法
     */
    console.log(arr.toString());// h,e,l,l,o
    console.log(arr.join('-'));// h-e-l-l-o

    /**
     * 迭代方法
     */
    const arr1 = [36,54,32,16]
    console.log('every-' +
        arr1.every((item,i,a)=> {
        console.log(i + ':' + item);// 依次打印 0:36、1:54、2:32 (会断言：没有执行3:16)
        return item > 32;
    }));// every-false

    console.log('some-' + 
        arr1.some((item,i,a)=> {
        console.log(i + ':' + item);// 依次打印 0:36 (会断言：没有执行后续的)
        return item > 32;
    }));// some-true

    console.log('filter-' + 
        arr1.filter((item,i,a)=> {
        console.log(i + ':' + item);// 依次打印 0:36、1:54、2:32、3:16
        return item > 32;
    }));// filter-[36, 54]

    console.log('map-' + 
        arr1.map((item,i,a)=> {
        console.log(i + ':' + item);// 依次打印 0:36、1:54、2:32、3:16
        return item + 1;
    }));// map-[37, 55, 33, 17]

    arr1.forEach((item,i,a)=> {
        // do somethings
        console.log(i + ':' + item);// 依次打印 0:36、1:54、2:32、3:16
    });

    /**
     * 迭代器
     */
    for (const k of arr1.keys()) {
        console.log(k);// 依次打印 0、1、2、3
    }
    for (const v of arr1.values()) {
        console.log(v);// 依次打印 36、54、32、16
    }
    for (const [k,v] of arr1.entries()) {// 注意这里是 [k,v]
        console.log(k + ':' + v);// 依次打印 0:36、1:54、2:32、3:16
    }

    /**
     * 复制和填充（改变数组）
     */
    let initArr;
    const reset = ()=> {initArr=[0,1,2,3,4,5,6,7,8,9]};

    reset();
    console.log(initArr.fill('-',3,8));// [0, 1, 2, '-', '-', '-', '-', '-', 8, 9]
    console.log(initArr);// 改变原数组：[0, 1, 2, '-', '-', '-', '-', '-', 8, 9]
    reset();
    console.log(initArr.copyWithin(4,0,3));// [0, 1, 2, 3, 0, 1, 2, 7, 8, 9]
    console.log(initArr);// 改变原数组：[0, 1, 2, 3, 0, 1, 2, 7, 8, 9]

    /**
     * 栈方法（改变数组）
     */
    reset();
    console.log('length:' + initArr.push('h','e'));// length:12
    console.log(initArr);// 改变原数组：[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'h', 'e']
    console.log(initArr.pop());// e

    /**
     * 队列方法（改变数组）
     */
    reset();
    console.log('length:' + initArr.unshift('h','e'));// length:12
    console.log(initArr);// 改变原数组：['h', 'e', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    console.log(initArr.shift());// h

    /**
     * 排序方法（改变数组）
     */
    reset();
    console.log(initArr.reverse());// [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    console.log(initArr);// 改变原数组：[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

    let sortArr = [0,1,10,5,15];
    console.log(sortArr.sort());// 按 toString() 字符串比较的[0, 1, 10, 15, 5]
    console.log(sortArr);// 改变原数组：[0, 1, 10, 15, 5]
    console.log(sortArr.sort(
        function(v1,v2) {
            if(v1 > v2) {
                return 1;
            } else if(v1 < v2) {
                return -1;
            } else {return 0;}
        //  return v1 - v2;
        })
    );// [0, 1, 5, 10, 15]

    /**
     * 操作方法
     */
    const arr2 = [',','w'];
    console.log(arr.concat(arr2));// ['h', 'e', 'l', 'l', 'o', ',', 'w']
    arr2[Symbol.isConcatSpreadable] = false;
    console.log(arr.concat(arr2));// ['h', 'e', 'l', 'l', 'o', [',', 'w']]
    console.log(arr);// concat 不会改变原数组: ['h', 'e', 'l', 'l', 'o']
    
    console.log(arr.slice(0,3));// ['h', 'e', 'l']
    console.log(arr);// slice 不会改变原数组: ['h', 'e', 'l', 'l', 'o']

    let tmp = arr.splice(1,3,'-','+')
    console.log(tmp)// ['e', 'l', 'l']
    console.log(arr)// splice 会改变原数组: ['h', '-', '+', 'o']
    // 还原下数组
    arr.splice(1,2,'e','l','l')
    console.log(arr)// ['h', 'e', 'l', 'l', 'o']

    /**
     * 搜索和位置
     */
    console.log(arr.indexOf('l',2));// 2
    console.log(arr.lastIndexOf('l',3));// 3

    console.log(arr.find((item,i,a)=> {
        console.log(i + ':' + item);// 依次打印 0:h、1:e、2:l
        return item.toUpperCase() == 'L';
        })
    );// l

    console.log(arr.findIndex((item,i,a)=> {
        console.log(i + ':' + item);// 依次打印 0:h、1:e、2:l
        return item.toUpperCase() == 'L';
        })
    );// 2

    // 归并函数
    let values = [ 1 , 2 , 3 , 4 , 5 ] ; 
    let sumReduce = values.reduce ((prev, cur , currIndex , array ) => {
        // 依次打印 0--prev:100, cur:1、1--prev:101, cur:2、2--prev:103, cur:3、3--prev:106, cur:4、4--prev:110, cur:5
        console.log(`${currIndex}--prev:${prev}, cur:${cur}`)
        return prev + cur
    }, 100);// 如果没有起始值 100，则 index 从 1 开始。即依次打印 1--prev:1, cur:2、2--prev:3, cur:3、3--prev:6, cur:4, cur:3、4--prev:10, cur:5
    console.log(sumReduce);// 115

// (1) 执行到 outerFunction 函数体，第一个栈帧被推到栈上。 
// (2) 执行 outerFunction 函数体，到达 return 语句。为求值返回语句，必须先求值 innerFunction。 
// (3) 引擎发现把第一个栈帧弹出栈外也没问题，因为 innerFunction 的返回值也是 outerFunction 的返回值。 
// (4) 弹出 outerFunction 的栈帧。 
// (5) 执行到 innerFunction 函数体，栈帧被推到栈上。 
// (6) 执行 innerFunction 函数体，计算其返回值。 
// (7) 将 innerFunction 的栈帧弹出栈外。
function outerFunction(a, b) {
    return innerFunction(a + b);
}
}

function testMap() {
    /**
     * 定义/添加键值对的三种方法
     */
    // 方法一：嵌套数组初始化
    const m = new Map([
        ['1A','h'],
        ['2B','e'],
        ['3C','l'],
        ['4D','l'],
        ['5E','o'],
        ['6F','!']
    ]);

    // 方法二：set 添加
    // const m = new Map()
    //     .set('1A','h')
    //     .set('2B','e')
    //     .set('3C','l')
    //     .set('4D','l')
    //     .set('5E','o');
    //     .set('6F','!');

    // 方法三：迭代器初始化
    // const m = new Map({
    //     [Symbol.iterator]: function*() {
    //         yield ['1A','h'];
    //         yield ['2B','e'];
    //         yield ['3C','l'];
    //         yield ['4D','l'];
    //         yield ['5E','o'];
    //         yield ['6F','!'];
    //     } 
    // });

    // size 属性
    console.log(m.size);// 6
    // 判断键值对是否存在
    console.log(m.has('6F'));// true
    // 删除操作
    m.delete('6F');
    console.log(m.has('6F'));// false

    /**
     * 迭代方法
     * 注意：第一个参数是 value，第二个是 key
     */
    m.forEach((v,k) => {
        console.log(k + ':' + v);// 依次打印 依次打印 '1A':'h'、'2B':'e'、'3C':'l'、'4D':'l'、'5E':'o'
    });
    console.log([...m]);// [ ['1A', 'h'],['2B','e'],['3C','l'],['4D','l'],['5E','o'] ]

    /**
     * 迭代器
     */
    for (const k of m.keys()) {
        console.log(k);// 依次打印 1A、2B、3C、4D、5E
    }
    for (const v of m.values()) {
        console.log(v);// 依次打印 h、e、l、l、o
    }
    for (const [k,v] of m.entries()) {// 注意这里是 [k,v]。等同于 'for(const [k,v] of m[Symbol.iterator]())'
        console.log(k + ':' + v);// 依次打印 '1A':'h'、'2B':'e'、'3C':'l'、'4D':'l'、'5E':'o'
    }
    console.log(m.entries === m[Symbol.iterator]);// true

    /**
     * 改变 map 中的 key 规则（与复制变量值、传递参数规则一致）
     */
    let keyO = {id: '1A'};// key 可以是 Object
    let keyBaseType = 11;// key 可以是 Number
    let ma = new Map([
        [keyO, 'h']
        ,[keyBaseType, 'e']
    ]);
    for (let k of ma.keys()) {
        console.log(JSON.stringify(k));// 依次输出 {"id":"1A"}、11
    }
    keyO.id = '2B';
    keyBaseType = 22;
    for (let k of ma.keys()) {
        console.log(JSON.stringify(k));// 依次输出 {"id":"2B"}、11
    }
    console.log([...ma]);// [ [{"id":"2B"},'h'],[11,'e'] ]
    ma.clear();// 清空 map 内容
    console.log([...ma]);// []
}

function testSet() {
    /**
     * 定义/添加集合的三种方法
     */
    // 方法一：数组初始化
    const s = new Set([
        'h','e','l','o','!'
    ])

    // 方法二：add 添加
    // const s = new Set()
    //     .add('h')
    //     .add('e')
    //     .add('l')
    //     .add('o');

    // 方法三：迭代器初始化
    // const s = new Set({
    //     [Symbol.iterator]:function*(){
    //         yield 'h';
    //         yield 'e';
    //         yield 'l';
    //         yield 'o';
    //     }
    // });

    console.log(s.size);// 5
    console.log(s.has('!'));// true
    s.delete('!');
    console.log(s.has('!'));// false
    
    s.forEach(v => {
        console.log(v);// 依次输出 'h'、'e'、'l'、'o'
    });
    console.log([...s]);// ['h', 'e', 'l', 'o']

    // 【与Map不同】s.values、s.keys、s[Symbol.iterator] 是相等的
    console.log(s.values === s[Symbol.iterator]);// true
    console.log(s.keys === s[Symbol.iterator]);// true
    for (const v of s.values()) {
       console.log(v);// 依次输出 'h'、'e'、'l'、'o'
    }
    // 【与Map不同】集合的 entries 中的
    for (const [k,v] of s.entries()) {// const pair of s.entries()
        console.log(k + ':' + v);// 依次输出 'h':'h'、'e':'e'、'l':'l'、'o':'o'
        // console.log(pair);// 依次输出 ['h', 'h']、['e', 'e']、['l', 'l']、['o', 'o']
    }
}

// testObject();
testArray();
// testMap();
// testSet();