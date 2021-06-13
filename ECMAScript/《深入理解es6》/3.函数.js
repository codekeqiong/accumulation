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
obj.myfun.call(null); // 我是全局对象test,传入null或者是undefined，this的指向就会变成全局对象window
// 注：call、apply、bind三者之间的区别；前两者都可以自动执行，后者需要手动调用，另外apply只接受两个参数且第二个参数是一个数组而其他的两个则可以传入无数个参数

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