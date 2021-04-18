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
            enumerable: true,
            configurable: true
        }
    })

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
    console.log(info_des);// {get: ƒ, set: ƒ, enumerable: true, configurable: true}

    console.log(person);// {_name: 'Tom', age: 40, sex: 'male', title: 'CEO', name: <accessor>}
    console.log(person.info);// Tom is 40 years old.
    person.info = 'Jack';// set nName: Jack
    console.log(person);// {_name: 'Jack', age: undefined, sex: undefined, title: 'CEO', name: <accessor>}
}

testObjPropertyFeature();