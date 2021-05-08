/**
 * 对象属性特性
 */
function testObjPropertyFeature() {
    const person = {
        // sex: 'male',
        // title: 'CEO',
        _name: 'Tom'
    }
    person.sex = 'male';

    Object.defineProperties(person, {
        // 定义 数据类型属性
        title: {value: 'CEO'},
        age: {value: 40, writable: false, enumerable: false, configurable: false},
        // 定义 访问类型属性
        info:  {
            get: function() {
                // return this._name + " is " + this.age + ' years old.';
                return `${this._name} is ${this.age} years old.`;
            },
            set: function(nName) {
                console.log('set nName: ' + nName);
                this._name = nName;
                this.age = undefined;
                this.sex = undefined;
            },
            enumerable: false,
            configurable: false
        }
    });

    // 直接定义的属性是 数据属性，默认 writable、enumerable、configurable 都为 true
    const _name_des = Object.getOwnPropertyDescriptor(person, '_name');
    console.log(_name_des);// {value: 'Tom', writable: true, enumerable: true, configurable: true}

    const sex_des = Object.getOwnPropertyDescriptor(person, 'sex');
    console.log(sex_des);// {value: 'male', writable: true, enumerable: true, configurable: true}

    // 用 defineProperty、defineProperties 定义是 writable、enumerable、configurable 都为 false
    const title_des = Object.getOwnPropertyDescriptor(person, 'title');
    console.log(title_des);// {value: 'CEO', writable: false, enumerable: false, configurable: false}

    // 数据属性只能通过 defineProperty、defineProperties 来定义
    const info_des = Object.getOwnPropertyDescriptor(person, 'info');
    console.log(info_des);// {get: ƒ, set: ƒ, enumerable: false, configurable: false}

    console.log(person);// {_name: 'Tom', age: 40, sex: 'male', title: 'CEO', name: <accessor>}
    console.log(person.info);// Tom is 40 years old.
    person.info = 'Jack';// set nName: Jack
    console.log(person);// {_name: 'Jack', age: undefined, sex: undefined, title: 'CEO', name: <accessor>}
}

function testObject() {
    /**
     * Object.assign(desObj, srcObj)
     * 遵守与传参、复制一样的规则：引用类型复制的是变量的引用地址，所以改变引用类型的内容会跟随改变；原始值复制的是变量的副本，两者不会联动改变
     */
    let srcObj = {
        name: 'Tom',
        sex: 'male',

        leader: {
            name: 'Jack',
            sex: 'male'
        } 
    };

    let desObj = {
        sex: 'unknown'
    };

    let resultObj = Object.assign(desObj, srcObj);
    console.log(desObj);// {name: 'Tom', sex: 'male', leader: {name: 'Jack', sex: 'male'}}
    console.log(desObj == resultObj);// true
    console.log(desObj == srcObj);// false

    desObj.name = 'Peter';
    desObj.leader.name = 'MJ.Jack';
    console.log(srcObj);// {name: 'Tom', sex: 'male', leader: {name: 'MJ.Jack', sex: 'male'}}
    console.log(desObj);// {name: 'Peter', sex: 'male', leader: {name: 'MJ.Jack', sex: 'male'}}
    console.log(desObj.leader === srcObj.leader);// true

    /**
     * Object.is(obj1, obj2)
     */
    console.log(Object.is(NaN, NaN)); // true

    /**
     * 增强的对象语法
     */
    // 属性值缩写
    let name = 'Tom';
    // let CEO = { // 原来
    //     name: name,
    //     sex: 'male'
    // }
    let CEO = { // 缩写
        name,
        sex: 'male'
    }
    console.log(CEO);// {name: 'Tom', sex: 'male'}
    
    // 可计算属性
    let n = 'name';
    // let CEO2 = {sex: 'male'}// 原来
    // CEO2[n] = 'Tom';
    let CEO2 = {
        [n]: 'Tom',
        sex: 'male'
    }
    console.log(CEO2);// {name: 'Tom', sex: 'male'}
    
    // 简写方法名: 另外，对于 get 和 set 也是可以使用
    // let CEO3 = {// 原来
    //     name: 'Tom',
    //     introduct: function(greetStr) {
    //         console.log(greetStr + '! My name is ' + this.name);
    //     }
    // }
    let CEO3 = {
        name: 'Tom',
        introduct(greetStr) {
            console.log(greetStr + '! My name is ' + this.name);
        },
        set userName(n) {
            this.name = n;
        }
    }
    CEO3.introduct('Hello');// Hello! My name is Tom
    CEO3.userName = 'Jack';
    console.log(CEO3);// {_name: 'Jack', introduct: ƒ}
}

function testObjDestruction() {
    /**
     * 对象解构基本规则
     */
     let person = {
        name: 'Tom',
        sex: 'male',
        title: 'CEO',
        introduct: function(greetStr) {
            console.log(greetStr + '! My name is ' + this.name);
        },
        leader: {
            name: 'Jack',
            sex: 'male'
        } 
        // ,age: 40
    }
    let {title: pTitle, sex, leader:pLeader, age:pAge=18} = person;
    console.log(pTitle);// CEO
    // 如果变量名和属性一样，可以省略，如 sex
    console.log(sex);// male
    // 在非外层嵌套如果没有匹配，则为 undefined
    console.log(pLeader);// undefined
    // 可以在解构时，定义默认值
    console.log(pAge);// 18

    /**
     * 如果是给事先声明的变量赋值，则赋值表达式必须包含在一对括号中
     * 在外层属性没有定义的情况下不能使用嵌套解构
     */
    let p1 = {};
    ({
        name: p1.name,
        sex: p1.sex,
        title: p1.title,
        introduct: p1.introduct,
        leader: p1.leader

        // 【错误！】在外层属性没有定义的情况下不能使用嵌套解构：如下，在 p1 中没有定义 p1.leader，所以 p1.leader.name 会报TypeError
        // leader: {
        //     name: p1.leader.name
        // }
    } = person)
    console.log(p1);// {name: 'Tom', sex: 'male', title: 'CEO', introduct: ƒ, leader: {name: 'Jack', sex: 'male'}}
    console.log(p1.leader.name);// Jack
    p1.introduct('Hello');//Hello! My name is Tom

    /**
     * 对参数的解构赋值不会影响 arguments 对象
     */
    function printPerson(v1, {name: pName1}, v2) {
        console.log(arguments);
    }
    printPerson('param1', person, 'parma2');// // [parma1, {name: 'Tom', sex: 'male', title: 'CEO', introduct: ƒ, leader: {…}}, parma2]
}

function testObjComprehend() {
    /**
     * 理解原型对象
     */
    function Person() {};
    Person.prototype.name = "Nicholas";
    Person.prototype.age = 29;
    Person.prototype.job = "Software Engineer";
    Person.prototype.sayName = function() {
      console.log(this.name);
    };

    console.log(typeof Person.prototype);// Object
    console.log(Person.prototype);// {name: 'Nicholas', age: 29, job: 'Software Engineer', sayName: ƒ,constructor: ƒ Person(){}}
    console.log(Person.prototype.constructor === Person);// true

    // 实例通过__proto__链接到原型对象,它实际上指向隐藏特性[[Prototype]]，可以通过 Object.getPrototypeOf(person1) 获取
    let person1 = new Person(),
        person2 = new Person();
    console.log(Person.prototype.isPrototypeOf(person1));// true
    console.log(person1.__proto__ == Person.prototype);// true
    console.log(Object.getPrototypeOf(person1) == Person.prototype);// true

    /**
     * instantObj.hasOwnProperty(propertyNameStr)：判断 propertyNameStr 属性是否在 instantObj 实例中的
     * propertyNameStr in instantObj：判断对象是否能够访问 propertyNameStr 属性（不区分是实例中的还是原型中的）
     * Object.getOwnPropertyDescriptor(obj, propertyNameStr)：若 obj 是实例，则只能够获取 obj 实例的属性。若 obj 是原型对象，则获取的是原型对象的属性
     * Object.getOwnPropertyNames(instantObj))：获取所有的属性
     * Object.keys(instantObj)：获取可以枚举的属性
     * Object.entries(instantObj)：获取可以枚举的的属性键值对
     */ 
    person1.name = 'Peter';
    console.log(person1.name);// Peter  访问的是实例中的，实例中的会覆盖原型对象中的
    console.log(person1.hasOwnProperty('name'));// true
    console.log('name' in person1);// true

    console.log(person2.name);// Nicholas   访问的是原型对象中的
    console.log(person2.hasOwnProperty('name'));// false
    console.log('name' in person2);// true

    // 可以通过以下函数判断属性是否在原型中。（在 in 中而不在 hasOwnProperty 中）
    function hasPrototypeProperty(obj, name) {
        return !obj.hasOwnProperty(name) && (name in obj);
    }

    console.log(Object.getOwnPropertyDescriptor(person1, 'name'));// {value: 'Peter', writable: true, enumerable: true, configurable: true}
    console.log(Object.getOwnPropertyDescriptor(person2, 'name'));// undefined
    console.log(Object.getOwnPropertyDescriptor(Person.prototype, 'name'));// {value: 'Nicholas', writable: true, enumerable: true, configurable: true}
    
    console.log(Object.getOwnPropertyNames(person1));// ['name']
    console.log(Object.getOwnPropertyNames(Person.prototype));//  ['constructor', 'name', 'age', 'job', 'sayName']

    console.log(Object.keys(person1));// ['name']
    console.log(Object.keys(Person.prototype));// ['name', 'age', 'job', 'sayName']

    for (const [k,v] of Object.entries(person1)) {
        console.log(k + '---' + v);// name---Peter
    }
}

/**
 * 定义对象（标准方法）： 注意 ES6 后定义用类用 class，不再采用此方式
 * 实例中单独使用的放在实例对象定义外，公共使用的放在 prototype 中，并且只定义一次
 */
function testObjCreate() {
    function Person(nameParam) {
        console.log('Person() nameParam = ' + nameParam);
        this.name = nameParam;
        this.sex = 'male',
        this.alias = ['Human','People'];
        this.leader = {
            name: 'Jack',
            sex: 'male'
        }

        if(typeof this.introduct != 'function') {
            Person.prototype.introduct = function() {
                console.log(this.name + ' is ' + this.alias);
            }
        }
    }

    let p1 = new Person('Peter');
    p1.sex = 'female';
    p1.alias.push('Student');
    p1.leader.name = 'Kevin';
    p1.introduct();// Peter is Human,People,Student
    console.log(JSON.stringify(p1));// {"name":"Peter","sex":"female","alias":["Human","People","Student"],"leader":{"name":"Kevin","sex":"male"}}

    let p2 = new Person('Tom');
    p2.introduct();// Tom is Human,People
    console.log(JSON.stringify(p2));// {"name":"Tom","sex":"male","alias":["Human","People"],"leader":{"name":"Jack","sex":"male"}}

    console.log(p1.introduct == p2.introduct);// true
}

function testObjInherit() {
    /**
     * 寄生组合继承
     */
    function inheritPrototype(sonCls, parentCls) {
        let newPrototype = Object(parentCls.prototype);
        newPrototype.constructor = parentCls;
        sonCls.prototype = newPrototype;
    }

    function Person(nameParam) {
        console.log('Person() nameParam = ' + nameParam);
        this.name = nameParam;
        this.sex = 'male',
        this.alias = ['Human','People'];
        this.leader = {
            name: 'Jack',
            sex: 'male'
        }
    }
    Person.prototype.introduct = function() {
        console.log(this.name + ' is ' + this.alias);
    }

    function Student(nameParam, gradeParam) {
        Person.call(this, nameParam);
        this.grade = gradeParam;
        this.class = 'Class 1';
        this.teachers = ['A','B'];
    } 
    // Student.prototype = new Person();// Person() nameParam = undefined
    // Student.prototype.constructor = Person;
    inheritPrototype(Student, Person);

    let st1 = new Student('Peter', 'Grade 8');// Person() nameParam = Peter
    console.log(st1.hasOwnProperty('sex'));// true
    console.log(st1.hasOwnProperty('class'));// true
    console.log(st1.hasOwnProperty('teachers'));// true
    st1.sex = 'female';
    st1.alias.push('Student');
    st1.leader.name = 'Kevin';
    st1.introduct();// Peter is Human,People,Student
    st1.class = 'Class 2';
    st1.teachers.push('C');
    console.log(JSON.stringify(st1));// {"name":"Peter","sex":"female","alias":["Human","People","Student"],"leader":{"name":"Kevin","sex":"male"},"grade":"Grade 8","class":"Class 2","teachers":["A","B","C"]}
    console.log(Student.prototype);// {}
    for (const [k,v] of Object.entries(st1)) {
        /**
         * true true name:Peter
         * true true sex:female
         * true true alias:Human,People,Student
         * true true leader:[object Object]
         * true true grade:Grade 8
         * true true class:Class 2
         * true true teachers:A,B,C
         */
        console.log((k in st1) + ' ' + st1.hasOwnProperty(k) + ' ' + k + ':' + v );
    } 
    for (const [k,v] of Object.entries(Person.prototype)) {
        /**
         * true false introduct:function() {
         *          console.log(this.name + ' is ' + this.alias);
         *      }
         */
        console.log((k in st1) + ' ' + st1.hasOwnProperty(k) + ' ' + k + ':' + v );
    }

    let st2 = new Student('Tom', 'Grade 9');// Person() nameParam = Tom
    st2.introduct();// Tom is Human,People
    console.log(JSON.stringify(st2));// {"name":"Tom","sex":"male","alias":["Human","People"],"leader":{"name":"Jack","sex":"male"},"grade":"Grade 9","class":"Class 1","teachers":["A","B"]}
    for (const [k,v] of Object.entries(st2)) {
        /**
         * true true name:Tom
         * true true sex:male
         * true true alias:Human,People
         * true true leader:[object Object]
         * true true grade:Grade 9
         * true true class:Class 1
         * true true teachers:A,B
         */
        console.log((k in st2) + ' ' + st2.hasOwnProperty(k) + ' ' + k + ':' + v );
    } 
    for (const [k,v] of Object.entries(Person.prototype)) {
        /**
         * true false introduct:function() {
         *          console.log(this.name + ' is ' + this.alias);
         *      }
         */
        console.log((k in st2) + ' ' + st2.hasOwnProperty(k) + ' ' + k + ':' + v );
    }

    console.log(st1.name == st2.name);// false
    console.log(st1.alias == st2.alias);// false
    console.log(st1.leader == st2.leader);// false
    console.log(st1.grade == st2.grade);// false
    console.log(st1.class == st2.class);// false
    console.log(st1.teachers == st2.teachers);// false
    console.log(st1.introduct == st2.introduct);// true
}

function testClassAndInherit() {
    /**
     * 类定义
     */
    class Person {
        // 构造方法
        constructor(nameParam) {
            console.log('Person() constructor nameParam = ' + nameParam);
            // 实例成员（实例 同名优先级 top1）
            this.name = nameParam;
            this.sex = 'male',
            this.alias = ['Human','People'];
            this.leader = {
                name: 'Jack',
                sex: 'male'
            };
            this.infoName = 'Constructor';

            // 实例方法（实例 同名优先级 top1）
            this.info = function() {
                console.log('info():Constructor Person() ' + this.name + ' is ' + this.alias);
            }
        }

        // 原型方法（实例 同名优先级 top2）
        introduct() {
            console.log('introduct():Prototype Person() ' + this.name + ' is ' + this.alias);
        }
        info() {
            console.log('info():Prototype Person() ' + this.name + ' is ' + this.alias);
        }

        // 静态类方法（只能类调用）
        static info() {
            console.log('info():Class Person() ' + this.sex + ' is ' + this.infoName);
        }
    }

    // 不建议使用（因为理论上成员都是实例的独有的）：原型成员（实例 同名优先级 top2）
    Person.prototype.infoName = 'Prototype';
    // 不建议使用（因为理论上成员都是实例的独有的）：静态类成员（只能类调用）
    Person.infoName = 'Person';

    /**
     * 类的实例调用
     */
    let p1 = new Person('Peter');
    p1.sex = 'female';
    p1.alias.push('Student');
    p1.leader.name = 'Kevin';
    p1.introduct();// introduct():Prototype Peter is Human,People,Student
    console.log(JSON.stringify(p1));// {"name":"Peter","sex":"female","alias":["Human","People","Student"],"leader":{"name":"Kevin","sex":"male"},"infoName":"Constructor"}

    let p2 = new Person('Tom');
    p2.introduct();// introduct():Prototype Tom is Human,People
    console.log(JSON.stringify(p2));// {"name":"Tom","sex":"male","alias":["Human","People"],"leader":{"name":"Jack","sex":"male"},"infoName":"Constructor"}

    console.log(p1.introduct == p2.introduct);// true

    // 类的实例可以调用实例和原型的成员和方法，实例中的成员和方法优先级高于原型中的。但是实例不可以调用静态类成员和方法，只能由类调用
    console.log(p1.infoName);// Constructor
    p1.info();// info():Constructor Person() Peter is Human,People,Student
    console.log(Person.infoName);// Person
    Person.info();// info():Class Person() undefined is Person

    /**
     * 继承
     */
    class Student extends Person {
        constructor(nameParam, gradeParam) {
            // 调用 super([params])会调用父类构造函数（即 super([params]) 等价于 super.constructor([params])），并将返回的实例赋值给 this，所返回的实例是子类实例
            super(nameParam);
            this.grade = gradeParam;
            this.class = 'Class 1';
            this.teachers = ['A','B'];
        }
    }

    let st1 = new Student('Peter', 'Grade 8');// Person() constructor nameParam = Peter
    console.log(st1.hasOwnProperty('sex'));// true
    console.log(st1.hasOwnProperty('class'));// true
    console.log(st1.hasOwnProperty('teachers'));// true
    st1.sex = 'female';
    st1.alias.push('Student');
    st1.leader.name = 'Kevin';
    // 子类都会通过原型链访问到类和原型上定义的方法
    st1.introduct();// introduct():Prototype Person() Peter is Human,People,Student
    st1.class = 'Class 2';
    st1.teachers.push('C');
    console.log(JSON.stringify(st1));// "name":"Peter","sex":"female","alias":["Human","People","Student"],"leader":{"name":"Kevin","sex":"male"},"infoName":"Constructor","grade":"Grade 8","class":"Class 2","teachers":["A","B","C"]}
    console.log(Student.prototype);// Person {constructor: ƒ}
    for (const [k,v] of Object.entries(st1)) {
        /**
         * true true name:Peter
         * true true sex:female
         * true true alias:Human,People,Student
         * true true leader:[object Object]
         * true true infoName:Constructor
         * true true info:function() {
         *        console.log('info():Constructor Person() ' + this.name + ' is ' + this.alias);
         *    }
         * true true grade:Grade 8
         * true true class:Class 2
         * true true teachers:A,B,C
         */
        console.log((k in st1) + ' ' + st1.hasOwnProperty(k) + ' ' + k + ':' + v );
    } 
    for (const [k,v] of Object.entries(Person.prototype)) {
        /**
         * true true infoName:Prototype
         */
        console.log((k in st1) + ' ' + st1.hasOwnProperty(k) + ' ' + k + ':' + v );
    }
}

// testObjPropertyFeature();
// testObject();
// testObjDestruction();
// testObjComprehend();
// testObjCreate();
// testObjInherit();
testClassAndInherit();