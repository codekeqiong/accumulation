/**
 * 读书笔记：《深入理解es6》
*/
// es5在非严格模式下命名参数的变化会同步到arguments对象中  p40
// es5的严格模式或者使用默认参数值时命名参数的变化不会同步到arguments对象中
// 默认参数的临时死区
// 无命名参数-不定参数
// object表示被复制属性的源对象，其他参数表示的是被复制(需要使用到)的属性名，扩展运算符只能用于最后一个参数
function pick(object, ...keys){
  let result = Object.create(null);
  for(let i = 0; i< keys.length; i++){
    result[keys[i]] = object[keys[i]];
  }
  return result;
}
let obj = {
  name: 'zhangsan',
  age: 18,
  hobby: 'dance'
}
let info = pick(obj, 'name', 'hobby');
console.log(info.name);  // zhangsan
console.log(info.hobby);   // dance

// 无论是否使用不定参数，arguments总是包含所有传入的参数
let arr = [12,3,45,43,23,36];
Math.max(...arr, 67); 
// 展开运算符可以简化使用数组给函数传参的编码过程，故大多数使用apply()方法的情况下使用展开运算符可能是个更好的方案
var person  = new person('june');
var notAPerson = Person.call(person, 'joan');
// 对于函数本身无法区分是通过new创建得到的实例还是通过调用call/apply方法得到的实例
// 使用instanceof方法来判断一个函数是否含有[[construct]]方法，具有这个方法的函数统称为构造函数，可以提供new来进行实例化
// 为解决这个问题，es6引入了元属性new.target,使用new创建的会返回new操作符的目标，如果使用方法[[call]]则会返回undefined（typeof new.target）

// es6，在非严格模式下可以声明会计函数，但是行为严格模式下的不同，严格模式下只能在当前块内有效，而非严格模式下函数不是提升到代码块的顶部而是提升至外围函数或全局作用域的顶部
// 剪头函数
// 没有this/super/arguments（可以通过命名参数或者不定参数访问函数的参数）/new target绑定{这些都是由外围最近一层非箭头函数决定，如果没有则this指向的是全局对象}；
// 不能通过new关键字调用；没有原型；
// 不可以改变this的绑定(即使使用bind, apply,call)；
var test = '我是全局对象test';
var obj = {
  test: '我是局部变量test',
  myfun: function(){
    console.log(this.test);
  }
}
obj.myfun()  // 我是局部变量test，此时的this指向的是obj对象
obj.myfun.call(null); // 我是全局对象test,传入null后，此时的this被null替换成全局对象

var test = '我是全局对象test';
var obj = {
  test: '我是局部变量test',
  myfun: () => {
    console.log(this.test);
  }
}
obj.myfun()  // 我是局部变量test，此时的this指向的是obj对象
obj.myfun.call(null); // 我是全局对象test,传入null后，此时的this被null替换成全局对象

// 不支持arguments对象；不支持重复的命名参数

// 如果想要返回对象字面量，为了与函数体区分开（花括号中的称为函数体），需要将对象字面量包裹在小括号中
let func = id => ({id: id, name: 'june'})
// 实际相当于是
let func = function(id){
  return {
    id,
    name: 'june'
  }
}

// 严格模式下的es6尾调用优化（帮助保持一个最小的函数调用栈，从而减少内存的使用，避免栈溢出；满足优化条件时引擎会自动进行优化；主要应用场景是递归函数）
// 三个条件：尾调用不访问当前栈帧的变量（函数不是一个闭包）；函数内部尾调用是最后一条语句；尾调用的结果作为函数值返回
// 例如阶乘函数
function factorial(n){
  if(n<=1){
    return 1;
  } else {
    return n*factorial(n-1)
  }
}
// 引入使用函数的尾调用优化
function factorial(n, p=1){
  if(n<=1){
    return 1 * p;
  } else {
    let result = n * p;
    return factorial(n-1, result);
  }
}
// 第四章：扩展对象的功能性
// 属性初始值的简写：name:name => name
var person = {
  name: 'june',
  age: 18,
  sayName: function(){
    console.log(this.name)
  },
  // 对象方法的简写语法(省略冒号和function关键字)
  sayAge(){
    console.log(this.age)
  }
}

// es6中可在对象字面量中使用可计算属性名称，其语法与引用对象实例的可计算属性名称相同，也是使用方括号
// 简言之使用中括号就说明该属性名称是可计算的(可识别为一个变量，否则就当做字符串来解析)，内容将被求值并最终转化为一个字符串

// 新增的方法：0object.is()
// 引入的目的是弥补全等（===）运算符在判断+0 === -0返回为true以及NaN === NaN返回为false的不准确运算
+0 === -0  // true
NaN === NaN  // false
object.is(+0, -0)  // false
object.is(NaN, NaN)  // true

// 混合模式(mixin): object.assign(source, target)，该方法不能复制访问器属性
function mixin(receiver, supplier){
  object.keys(supplier).foreach(item => {
    receiver[item] = supplier[item];  // 这里是浅复制，属性值为对象时只复制对象的引用
  })
  return receiver;
}

//数据属性和访问器属性
Object.getOwnPropertyDescriptor(object, '想要访问的属性名');

// 数据属性：
// [[Configurable]]: 表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。
// [[Enumerable]]: 表示能否通过 for-in 循环返回属性。
// [[Writable]]: 表示能否修改属性的值。
// [[Value]]: 包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值时，把新值保存在这个位置。默认值是 undefined。

// 访问器属性有如下4个特性：
// [[Configurable]]：表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为数据属性。
// [[Enumerable]]：表示能否通过 for-in 循环返回属性。
// [[Get]]：在读取属性时调用的函数。默认值为 undefined。
// [[Set]]：在写入属性时调用的函数。默认值为 undefined。

// 直接通过 Object.defineProperty() 为对象添加属性以及值，这种情况下该对象的writable, enumerable, configurable这3个属性特性的默认值都是 false
// 要修改属性默认的特性，必须使用Object.defineProperty( obj, prop, descriptor)

// 重复属性名的校验
// ES5严格模式下对于一个对象中定义的重复同名属性会在重复的地方报错而在ES6中不管是否是严格模式，不会再校验重复属性报错，而是取后者的值

12.10
// 自有属性枚举的顺序
// es6中规定了对象自有属性的返回顺序，枚举(object.getOwnPropertyNames()、object.keys())时会重新排序组合（数值键在前按照升序排列，字符串键在后按照插入的顺序排列）

// 增强对象原型
// Object.create()方法创建对象时，在创建的时候就已经指定了原型
// Object.getPrototypeOf(),es5中添加的方法，返回指定对象的原型
// Object.setPrototypeOf(需要变更原型的对象，目标原型对象)，es6中添加的方法

let person = {
  getGreeting(){
    return 'hello';
  }
}
let animal = {
  getGreeting(){
    return 'hi';
  }
}
let friend = Object.create(person);
console.log(friend.getGreeting());  // hello
console.log(Object.getPrototypeOf(friend) === person)  // true 注意这里person是原型对象不是'person'
// 改变friend的原型指向
Object.setPrototypeOf(friend, animal);
console.log(friend.getGreeting());  // hi

// 引入super
let person = {
  getGreeting(){
    return 'hello';
  }
}
let animal = {
  getGreeting(){
    return 'hi';
  }
}
let plant = {
  getGreeting(){
    // return Object.getPrototypeOf(this).getGreeting.call(this) + '你好呀';  //注意这里的getGreeting，而不是getGreeting()
    return super.getGreeting() + '你好呀';   // super总是能指向正确的作用域，不会动态改变，也会返回的是hello你好呀
  }
  // 注意，如果这里使用匿名function来定义的一个属性getGreeting，那么在当前上下文中super引用是非法的，使用super调用就会报错
}
let errorPlant = {
  getGreeting: function(){
    return super.getGreeting() + '你好呀'; //
  }
}
Object.setPrototypeOf(plant, person);
console.log(plant.getGreeting());  // hello你好呀

// super解决多重继承的情况下，使用Object.getPrototypeOf()将会出现this指向的动态改变不可控的问题
// super引用不是动态的，它总是能指向正确的对象，当前作用域的this
let grandfather = {
  description(){
    return '我是祖父'
  }
}
let father = {
  description(){
    // 因为this指向的是调用者即children本身而Object.getPrototypeOf(this)又会返回father对象，children调用的时候会报错堆栈内存溢出
    // return Object.getPrototypeOf(this).description.call(this) + 'hello'; 
    // super.description()始终指向的是grandfather的description,打印出 我是祖父hello
    return super.description() + 'hello'; 
  }
}
Object.setPrototypeOf(father, grandfather);
console.log(father.description());  // 我是祖父hello

let children = Object.create(father);
console.log(children.description());

// 方法的定义
let person = {
  // 是方法的条件：有getGreeting()方法，函数赋值给了一个对象
  // 会有一个内部的[[HomeObject]]属性来容纳这个方法的从属的对象
  getGreeting(){
    return 'hello';
  }
}
// 未赋值因而没有明确定义[[HomeObject]]属性，super的所用引用都是通过改属性来确定后续的过程
function notFunc() {
  return 'hi';
}

// 第5章 解构：使数据访问更便捷