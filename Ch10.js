function testFunArrow() {
    // 函数表达式
    // let sum = function(a) {
    //     return a + 10;
    // };

    // 箭头函数
    // let sum = (a) => {
    //     return a + 10;
    // };

    // 省略参数括号()和函数体括号{}的箭头函数
    let sum = a => a + 10;
    console.log(sum(20));// 30

    // 函数内部 this 指针
    constValue = 10;
    let obj = {
        constValue: 20
    };
    let sum1 = function(a) {
        return a + this.constValue;
    }
    // let sum1 = (a)=> {
    //     return a + this.constValue;// 箭头函数内 this 会保留定义该函数时的上下文。所以此处 this.constValue 会固定为 10
    // };

    console.log(sum1(20));// 30

    obj.sum1 = sum1;
    console.log(obj.sum1(20));// 40 (若使用箭头函数 sum1 则为 30)
}

function testFunParam() {
    // 扩展参数
    let arr = [1,2,3,4];
    function getSum() {
        let sum = 0;
        for (let i = 0; i < arguments.length; ++i) {
            sum += arguments[i];
        }
        return sum;
    };
    console.log(getSum(...arr));// 10

    // 收集参数
    let getSum2 = (firstParam, ...values) => {
        console.log(firstParam);
        return values.reduce((x, y) => x + y, 0);
  }
  console.log(getSum2(99,1,2,3,4));// firstParam:99 函数返回: 10

  console.log(getSum2(...arr));// firstParam:1 函数返回: 9
}

function testFunChangeCall() {
    // 函数内部 this 指针
    constValue = 'Windows';
    let obj = {
        constValue: 'Object'
    };
    let getStr = function(a,b) {
        return this.constValue + ':' + a + ' ' + b;
    }
    // let getStr = (a,b)=> {
    //     return this.constValue + ':' + a + ' ' + b;// 箭头函数内 this 会保留定义该函数时的上下文。所以此处 this.constValue 会固定为 Windows
    // };

    console.log(getStr('A','B'));// Windows:A B

    obj.getStr = getStr;
    console.log(obj.getStr('A','B'));// Object:A B (若使用箭头函数 sum1 则为 Windows:A B)

    // call 直接调用函数。第一个参数是 this 要指向的对象，后面为函数的参数
    console.log(getStr.call(obj,'A','B'));// Object:A B
    // apply 直接调用函数。第一个参数是 this 要指向的对象，后面为函数的参数数组
    console.log(getStr.apply(obj,['A','B']));// Object:A B
    // bind 返回函数。第一个参数是 this 要指向的对象，后面为函数的参数，要调用函数需要再次调用
    console.log(getStr.bind(obj,'A','B')());// Object:A B
    console.log(getStr.bind(obj)('A','B'));// Object:A B
}

function testClosure() {
    /**
     * var 声明的没有块作用域，不会被限制在 for 循环中，所以会取到最后的值
     * let 声明的有块作用域，所以可以正常依次访问
     */
    function createFunctions() {
        var result = new Array();
        for (var i = 0; i < 5; i++) {
        // for (let i = 0; i < 5; i++) {
            result[i] = function() {// 闭包
                return i;
            };
        }
        // i = 10;// 若添加此语句，则 var 的输出5个10，let仍然不变为0,1,2,3,4
        return result;
    };

    for (const funItem of createFunctions()) {
        console.log(funItem());// 若“for (var i = 0; i < 5; i++)”则依次输出5个5；若“for (let) i = 0; i < 5; i++)”则依次输出0,1,2,3,4
    }
}

// testFunArrow();
// testFunParam();
// testFunChangeCall();
testClosure();