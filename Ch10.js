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
}

function testFunParam() {
    // 扩展参数
    let arr = [1, 2, 3, 4];
    function getSum() {
        let sum = 0;
        for (let i = 0; i < arguments.length; ++i) {
            sum += arguments[i];
        }
        return sum;
    }
    console.log(getSum(...arr)); // 10

    // 收集参数
    let getSum2 = (firstParam, ...values) => {
        console.log('firstParam:', firstParam);
        return values.reduce((x, y) => x + y, 0);
    };
    console.log(getSum2(99, 1, 2, 3, 4)); // firstParam:99 函数返回: 10
    console.log(getSum2(...arr)); // firstParam:1 函数返回: 9
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
    console.log(obj.getStr('A','B'));// Object:A B (若使用箭头函数则为 Windows:A B)

    // call 直接调用函数。第一个参数是 this 要指向的对象，后面为函数的参数
    console.log(getStr.call(obj,'A','B'));// Object:A B (若使用箭头函数则为 Windows:A B)
    console.log(obj.getStr.call(obj,'A','B'));// 同上

    // apply 直接调用函数。第一个参数是 this 要指向的对象，后面为函数的参数数组
    console.log(getStr.apply(obj,['A','B']));// Object:A B (若使用箭头函数则为 Windows:A B)
    console.log(obj.getStr.apply(obj,['A','B']));// 同上

    // bind 返回函数。第一个参数是 this 要指向的对象，后面为函数的参数，要调用函数需要再次调用
    console.log(getStr.bind(obj,'A','B')());// Object:A B (若使用箭头函数则为 Windows:A B)
    console.log(getStr.bind(obj)('A','B'));// 同上
    console.log(obj.getStr.bind(obj)('A','B'));// 同上
}

function testClosure() {
    /**
     * var 声明的没有块作用域，不会被限制在 for 循环中，所以会取到最后的值
     * let 声明的有块作用域，所以可以正常依次访问(若把 let i 放在循环外，也只会取到最后的值)
     */
    function createFunctions() {
        var result = new Array();
        // for (var i = 0; i < 5; i++) {// 等同于 let i;for (i = 0; i < 5; i++) {
        for (let i = 0; i < 5; i++) {
            result[i] = function() {// 闭包函数（引用了外部函数的变量 i）
                return i;
            };
        }
        // i = 10;// 若添加此语句，则 var 的输出5个10，let仍然不变为0,1,2,3,4
        return result;
    };

    for (const funItem of createFunctions()) {
        console.log(funItem());// 若“for (var i = 0; i < 5; i++)”则依次输出5个5；若“for (let) i = 0; i < 5; i++)”则依次输出0,1,2,3,4
    }


    /**
     * 闭包函数调用时，作用域链
     * 闭包在被函数返回之后，其作用域会一直保存在内存中，直到闭包被销毁。所以一般不使用闭包时，要手动设置为 null
     */
    function createComparisonFunction(propertyName) {
        console.log('propertyName:', propertyName);
        return function (object1, object2) {// 匿名闭包函数（引用了外部函数的 propertyName 变量）
            console.log(`object1:${JSON.stringify(object1)},object2:${JSON.stringify(object2)}`);
            let value1 = object1[propertyName];
            let value2 = object2[propertyName];
            
            if (value1 < value2) {
                return -1;
            } else if (value1 > value2) {
                return 1;
            } else {
                return 0;
            }
        };
    } 
    
    let compare = createComparisonFunction('name');
    let result = compare({ name: 'Nicholas' }, { name: 'Matt' });
    console.log(`result:${result}`);
    compareNames = null;// 不使用闭包时，需要解除对函数的引用，这样就可以释放内存了


    /**
     * 每个函数在被调用时都会自动创建两个特殊变量：this 和 arguments。
     * 内部函数永远不可能直接访问外部函数的 this 和 arguments（因为内部函数也会定义这两个变量名，避免冲突）。
     * 但如果把外部函数的 this 保存到闭包可以访问的变量-局部参数中，则是可以访问。
     * 
     * 内部函数可以访问外部函数的函数参数和局部变量
     */
    window.identity = "Window";
    let object = {
        identity: "Object",

        getIdentityFunc(param1) {
            let a = this
            let b = arguments
            return function () {
                // (匿名)内部函数不可以访问外部函数的arguments, 但可以通过函数参数 param1 访问
                console.log(`getIdentityFunc-${JSON.stringify(arguments)}`);// getIdentityFunc-{}
                console.log(`getIdentityFunc-${param1}`);// getIdentityFunc-hello

                // (匿名)内部函数不可以访问外部函数 getIdentityFunc 的 this(即 object 对象)，所以也无法访问 object 中的 identity，因此上线追溯输出 window 的 identity
                console.log(`getIdentityFunc-${this.identity}`);// getIdentityFunc-Window

                // 把外部函数 this 保存到外部函数的局部变量变量 a 中，则是可以访问
                console.log(`getIdentityFunc-${a.identity}`);// getIdentityFunc-Object

                // 把外部函数 arguments 保存到外部函数的局部变量 b 中，则是可以访问
                console.log(`getIdentityFunc-${JSON.stringify(b)}`);// getIdentityFunc-{"0":"hello"}
                return `getIdentityFunc-${this.identity}`;
            };
        },

        getIdentity() {
            return `getIdentity-${this.identity}`;// 直接返回，不使用内部闭包函数方式可以正常访问外部变量
        },
    };
    console.log(object.getIdentityFunc('hello')()); // getIdentityFunc-Window
    console.log(object.getIdentity()); // getIdentity-Object

    let singleton = function() { 
        // 私有变量和私有函数 
        let allPerson = new Array();
        function privateFunction() {// 好像没有私有函数的场景需求
            return false
        } 
        
        // [模板增强模式]: 适合单例对象需要是某个特定类型的实例，但又必须给它添加额外属性或方法的场景
        // 特权/公有方法和属性
        let Human = {} // 必须是 {} 类型实例，也可以用 new xx
        // 添加额外的属性
        Human.total = 0
        // 添加额外的方法
        Human.addPerson = function(person) {
            allPerson.push(person)
            Human.total++
        },
        Human.getPersonCount = function() {
            return Human.total
        }
        Human.getHuman = function() {
            return allPerson
        }
        return Human

        //  [模板模式]
        // return { 
        //     // 特权/公有方法和属性
        //     total: 0,
        //     addPerson(person) { 
        //         allPerson.push(person)
        //         this.total++
        //     },
        //     getPersonCount() {
        //         return this.total
        //     },
        //     getHuman() {
        //         return allPerson
        //     }
        // };
    }();

    console.log(singleton.getPersonCount())// 0
    console.log(singleton.total)// 0
    singleton.addPerson('Nicholas')
    console.log(singleton.getPersonCount())// 1
    console.log(singleton.total)// 1
    console.log(singleton.getHuman())// ['Nicholas']
    console.log(singleton.allPerson)// undefined 私有变量，无法访问
    console.log(singleton.privateFunction)// undefined 私有方法，无法访问
}

/**
 * 节流函数（可能执行多次）
 * @param {*} fn 
 * @param {*} delay 
 * @returns 
 */
 function throttle(fn, delay) {
    const previous = 0;
    return function() {
        const _this = this;
        const args = arguments;
        const now = new Date();
        if (now - previous > delay) {
            fn.apply(_this, args);
            previous = now;
        }
    }
}

/**
 * 防抖（只执行一次）
 * @param {*} fn 需要防抖的函数 
 * @param {*} delay 毫秒，防抖期限值
 * @returns 
 */
function debounce(fn, delay) {
    let timer = null
    return function() {
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(fn, delay)
    }
}

// testFunArrow();
// testFunParam();
// testFunChangeCall();
testClosure();