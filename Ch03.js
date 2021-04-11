function testConst() {
    const URLPath = 'www.baidu.com';
    // URLPath = 'www.taobao.com' // TypeError
    const Person = {};
    Person.name = 'Tom';
    Person.age = 18;
    Person.name = 'Jack';
    console.log(JSON.stringify(Person) + '\n');// {"name":"Jack","age":18}
}

function testDataType() {
    /**
     * typeof
     */
    var msg1;
    console.log('typeof msg1 //' + typeof msg1);
    console.log('typeof msg2 //' + typeof msg2);

    console.log('typeof null //' + typeof null);

    var person = {};
    console.log('typeof person //' + typeof person);

    console.log('typeof testConst //' + typeof testConst);

    console.log('typeof NaN = ' + typeof NaN);
    console.log('typeof Infinity //' + typeof Infinity);
    console.log('typeof -Infinity //' + typeof -Infinity);
    console.log('\n');

    /**
     * info1: 定义了，未初始化的变量与 undefined 字面量完全相等
     */
    console.log('msg1 === undefined //' + (msg1 === undefined));
    console.log('\n');

    /**
     * info2: undefined 是派生自 null 的，所以两者弱相等的，但非强相等
     */
    console.log('null == undefined //' + (null == undefined));
    console.log('null === undefined //' + (null === undefined));
    console.log('\n');

    /**
     * Boolean(xx)、Number(xx)、parseInt(xx,xx)、parseFloat(xx)
     */
    const DATA_ARRAY = [
            undefined,null,
            true,false,
            0,NaN,123,123.456,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,
            '', '10','010','0X10','10abc10'
    ]
    DATA_ARRAY.forEach(element => {
        console.log('Boolean(' + element + ')\t//' + Boolean(element));
    });
    console.log('\n');
    DATA_ARRAY.forEach(element => {
        console.log('Number(' + element + ')\t//' + Number(element));
    });
    console.log('\n');
    DATA_ARRAY.forEach(element => {
        console.log('parseInt(' + element + ', 10)\t//' + parseInt(element, 10));
    });
    console.log('\n');
    DATA_ARRAY.forEach(element => {
        console.log('parseFloat(' + element + ')\t//' + parseFloat(element));
    });
    console.log('\n');
    
    /**
     * 字符串插值
     */
    let value = 5;
    let exponent = 'second';
    // 以前，字符串插值是这样实现的: 
    let interpolatedString = value + ' to the ' + exponent + ' power is ' + (value * value);
    // 现在，可以用模板字面量这样实现:
    let interpolatedTemplateLiteral = `${ value } to the ${ exponent } power is ${ value * value }`;
    console.log(interpolatedString); // 5 to the second power is 25 
    console.log(interpolatedTemplateLiteral); // 5 to the second power is 25
    console.log('\n'); 

    /**
     * 模板字面量标签函数
     */
    let a = 6,
        b = 9
    function zipTap(strings, ...expressions) {
        // 其中第一个数组原生 '' 表示的是 ${ a } 前面无数据。最后一个元素表示${ a + b }后无数据，若 zipTap`hello${ a } + ${ b } = ${ a + b }world`;则返回数据结果为：['hello', ' + ', ' = ', 'world']
        console.log(strings);// ['', ' + ', ' = ', '']
        expressions.map((e) => {
            console.log(e)// 依次输出 6，9，15
        });

        return strings[0] +
             expressions.map((e, i) => `${e}${strings[i + 1]}`)
                        .join('');
    }
    let zipTapResult = zipTap`${ a } + ${ b } = ${ a + b }`;
    console.log(zipTapResult);// 6 + 9 = 15
    console.log('\n');

    /**
     * Symbol
     */
    let msg3 = Symbol('foo');
    let msg4 = Symbol('foo');
    console.log(msg3 == msg4);  // false

    let msg5 = Symbol.for('foo');
    let msg6 = Symbol.for('foo');
    console.log(msg5 === msg6); // true
    console.log(msg3 === msg5); // false
}

testConst();
testDataType();