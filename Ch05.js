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
    console.log(str1.slice(-5));// world    :-5+长度11 = 6，相当于 str1.slice(6)
    // 截取字符串：第一个参数为起始位置，第二个参数为终止位置（省略代表全部）
    console.log(str1.substring(1, 3));// el
    console.log(str1.substring(-5));// Hello world  :负数都当做 0
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
testMath();

// testTransferArrayString();
