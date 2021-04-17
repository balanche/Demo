function testDate() {
    const date1 = new Date(Date.UTC(2012, 3, 10, 18, 30, 10));
    const date2 = new Date(2012, 3, 10, 18, 30, 10);
    console.log('date1 = ' + date1 
        + '\ndate2 = ' + date2 
        + '\ntoString = ' + date2.toString()
        + '\nUTC = ' + date2.toUTCString());

    // Date 的相关函数使用
    console.log('toDateString() = ' + date2.toDateString() 
        + '\ntoTimeString() = ' + date2.toTimeString()

        + '\ngetTime() = ' + date2.getTime()
        + '\ngetFullYear() = ' + date2.getFullYear()
        + '\ngetMonth() = ' + date2.getMonth()
        + '\ngetDate() = ' + date2.getDate()
        + '\ngetHours() = ' + date2.getHours()
        + '\ngetMinutes() = ' + date2.getMinutes()
        + '\ngetSeconds() = ' + date2.getSeconds()
        )
}

function testString() {
    const str1 = 'Hello world';
    // 获取字符串长度
    console.log(str1.length);// 11
    // 获取index为参数指定的字符
    console.log(str1.charAt(1));// e
    // 获取index为参数指定的字符的编码
    console.log(str1.charCodeAt(1));// 101
    // 连接参数指定字符串
    console.log(str1.concat('!'));// Hello world!
    console.log(str1 + '!');// Hello world!
    // 截取字符串：第一个参数为起始位置，第二个参数为终止位置
    console.log(str1.slice(1, 3));// el
    // 截取字符串：第一个参数为起始位置，第二个参数为终止位置（省略代表全部）
    console.log(str1.substring(1, 3));// el
    // 截取字符串：第一个参数为起始位置，第二个参数个数（省略代表全部）
    console.log(str1.substr(1, 3));// ell
    // 从第二个参数（包含，省略代表全部）位置向后搜索第一个匹配字符串位置
    console.log(str1.indexOf('l', 4));// 3
    // 从第二个参数（包含，省略代表全部）位置向前搜索第一个匹配字符串位置
    console.log(str1.lastIndexOf('l', 8));// 3
    // 去除前后空格(不影响原字符串)
    const str2 = ' Hello world ';
    console.log(str2.trim());// Hello world
    console.log(str2.trim().length);// 11
    console.log(str2.length);// 13

    // 匹配开始字符串：第一个参数为匹配字符串，第二个参数代表从第几位开始（包含，省略代表全部）
    console.log(str1.startsWith('ell', 1));// true
    // 匹配包含字符串：第一个参数为匹配字符串，第二个参数代表从第几位开始（包含，省略代表全部）
    console.log(str1.includes('ell', 2));// false
    // 匹配结束字符串：第一个参数为匹配字符串，第二个参数代表取前几位（包含，省略代表全部）
    console.log(str1.endsWith('ell', 4));// true
    // 重复参数指定次数
    console.log(str1.repeat(2));//Hello worldHello world
    // 转化成小写
    console.log(str1.toLowerCase());//hello world
    // 转化成大写
    console.log(str1.toUpperCase());//HELLO WORLD
    // 将给定字符编码转化成 string
    console.log(String.fromCharCode(101));// e
    // 使用参数分隔字符串，转化成数组
    console.log(str1.split(' '));// ['Hello', 'world']

    /**
     * 前追加（若符合） 
     * 第一个参数若小于等于字符串，则直接输出原来字符串;
     * 第一个参数若大于字符串，则用第二个参数字符串填充在前面（省略代表空格）
     */
    console.log(str1.padStart(9,'.'));// Hello world
    console.log(str1.padStart(15,'.'));//....Hello world

    /**
     * 后追加（若符合） 
     * 第一个参数若小于等于字符串，则直接输出原来字符串;
     * 第一个参数若大于字符串，则用第二个参数字符串填充在后面（省略代表空格）
     */
    console.log(str1.padEnd(9,'.'));// Hello world
    console.log(str1.padEnd(15,'.'));// Hello world....

    /**
     * 迭代器
     * 字符串的原型中暴露了一个 @@iterator 方法，表示可以迭代字符串的每个字符
     */
    const arrStr = [...str1];//arrStr 是数组
    console.log(arrStr);// ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']

    for (const item of str1) {
        console.log(item);// 依次输出 'h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd'
    }
}

function testMath() {
    // 获取数组中最大值
    const arr = [3,54,32,16];
    console.log(Math.max.apply(Math, arr));// 54

    /**
     * 获取指定范围随机整数
     * Math.floor(Math.random() * 可能总数 + 第一个可能的值)
     */
    console.log(Math.floor(Math.random() * 50 + 30));// 获取从 30-80 间随机整数
    // console.log(window.crypto.getRandomValues(new Int8Array(1)))
}

function testObject() {
    /**
     * 其他：key 值为变量，使用 []
     * 因为对象属性可以通过点来访问，也可以通过方括号来表示
     */
    let n = 'userName';
    let CEO = {
        [n]: 'Tom',
        sex: 'male'
    }
    console.log(JSON.stringify(CEO));// {"userName":"Tom","sex":"male"}
    console.log(CEO.userName);// Tom
    console.log(CEO[n]);// Tom
    console.log('\n');
}

function testArray() {
    /**
     * Array.from 用法：适用任何可以迭代的结构
     * 第一个参数：任何可迭代的结构
     * 第二个参数：相当于 map 后处理，增强新数组的值
     * 第三个参数：用于指定映射函 数中 this 的值。但这个重写的 this 值在箭头函数中不适用
     */
    // 字符串。同 [...str]
    const str = 'hello world';
    console.log(Array.from(str));// ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']
    // 数组。浅复制
    const arr = ['h','e','l','l','o'];
    const copyArr = Array.from(arr);
    console.log(arr);// ['h', 'e', 'l', 'l', 'o']
    console.log('arr === copyArr //' +(arr === copyArr));// false
    // set
    const s = new Set().add('h').add('e');
    console.log(Array.from(s));// ['h', 'e']
    // Map
    const m = new Map().set('A', 'h').set('B', 'e')
    console.log(Array.from(m));// ['A', 'h'],['B', 'e']
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
        console.log(i + ':' + item);// 依次打印 0:36、1:54、2:32
        return item > 32;
    }));// every-false

    console.log('some-' + 
        arr1.some((item,i,a)=> {
        console.log(i + ':' + item);// 依次打印 0:36
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
    // const arr = ['h','e','l','l','o'];
    const arr2 = [',','w'];
    console.log(arr.concat(arr2));// ['h', 'e', 'l', 'l', 'o', ',', 'w']
    arr2[Symbol.isConcatSpreadable] = false;
    console.log(arr.concat(arr2));// ['h', 'e', 'l', 'l', 'o', [',', 'w']]
    
    console.log(arr.slice(0,3));// ['h', 'e', 'l']

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
}

function testMap() {
    /**
     * 定义/添加键值对的三种方法
     */
    // 方法一：嵌套数组初始化
    const m = new Map([
        ['A','h'],
        ['B','e'],
        ['C','l'],
        ['D','l'],
        ['E','o'],
        ['F','!']
    ]);

    // 方法二：set 添加
    // const m = new Map()
    //     .set('A','h')
    //     .set('B','e')
    //     .set('C','l')
    //     .set('D','l')
    //     .set('E','o')

    // 方法三：迭代器初始化
    // const m = new Map({
    //     [Symbol.iterator]: function*() {
    //         yield ['1A','h'];
    //         yield ['2B','e'];
    //         yield ['3C','l'];
    //         yield ['4D','l'];
    //         yield ['5E','o'];
    //     } 
    // });

    // size 属性
    console.log(m.size);// 5
    // 判断键值对是否存在
    console.log(m.has('F'));// true
    // 删除操作
    m.delete('F');
    console.log(m.has('F'));// false

    /**
     * 迭代方法
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
    let keyO = {id: '1A'}
    let keyBaseType = 11;
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
    console.log([...ma]);// [ [{"id":"1A"},'h'],[11,'e'] ]
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

    // 【与Map不同】s.values、s.keys、s[Symbol.iterator 是相等的
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


function testTransferArrayString() {
    const arr1 = ['hello'];
    const arr2 = ['h','e','l','l','o'];
    const str1 = 'hello';
    const str2 = 'h,e,l,l,o';
    // 一组参数 'h','e','l','l','o'
    console.log(arr2);// ['h', 'e', 'l', 'l', 'o']
    console.log(arr1);// ['hello']
    console.log(str1);// hello
    console.log(str2);// h,e,l,l,o
    console.log('\n');
 
    // arr2>arr1
    // str1>arr1
    console.log([str1]);// ['hello']
    // str2>arr1
    // 参数>arr1

    // arr1>arr2
    console.log(Array.from(arr1[0]));// ['h', 'e', 'l', 'l', 'o']
    console.log([...arr1[0]]);// ['h', 'e', 'l', 'l', 'o']
    // str1>arr2
    console.log(Array.from(str1));// ['h', 'e', 'l', 'l', 'o']
    console.log([...str1]);
    // str2>arr2
    console.log(str2.split(','));// ['h', 'e', 'l', 'l', 'o']
    // 参数>arr2
    console.log(Array.of('h','e','l','l','o'));// ['h', 'e', 'l', 'l', 'o']
    
    // arr1>str1
    console.log(arr1.join());// hello
    console.log(arr1.toString());// hello
    // arr2>str1
    // str2>str1
    // 参数>str1
 
    // arr1>str2
    // arr2>str2
    console.log(arr2.join());// h,e,l,l,o
    console.log(arr2.toString());// h,e,l,l,o
    // str1>str2
    // 参数>str2
}

// testDate();
// testString();
// testMath();
// testObject();
// testArray();
// testMap();
testSet();

// testTransferArrayString();
