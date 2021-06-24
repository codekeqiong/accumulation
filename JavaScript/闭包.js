闭包的特点
// 函数嵌套函数
// 外部可以访问到函数内部的局部变量，可以避免使用全局变量防止全局变量污染
// 参数和变量长期占用内存而不被释放不被回收，滥用闭包会造成内存泄漏
// 每次外部函数执行的时候，外部函数的引用地址不同，都会重新创建一个新的地址

// 大佬语录：闭包找到的是同一地址中父级函数中对应变量最终的值

// 闭包的理解实践一  https://www.cnblogs.com/xxcanghai/p/4991870.html
function fun(n, o) {
  console.log(n);
  // console.log('第一层',n, o)  调试代码
  return {
    fun: function (m) {
      //   console.log('内层', m, n)  调试代码
      return fun(m, n);  // 此处返回的函数fun是最外层的函数fun而不是对象中定义的函数fun
    }
  };
}

var a = fun(0); a.fun(1); a.fun(2); a.fun(3);
var b = fun(0).fun(1).fun(2).fun(3);
var c = fun(0).fun(1); c.fun(2); c.fun(3);
//问:三行a,b,c的输出分别是什么？

// 需要理解清楚的是每次调用闭包的n是哪次函数调用返回的值;a闭包的永远是第一次执行后的0，所以后面返回的n都是0；而b中闭包的n都是上次执行后的n;c则是第二次执行后的n
// 因此只要确定清楚闭包的n即可正确识别代码执行结果

// 分析：这三个fun函数之间是什么关系呢？
// 第一个fun是标准的具名函数声明，返回值是一个对象字面量表达式
// 第二个fun是匿名函数表达式，该属性中存放的是一个新创建的匿名函数表达式
// 第三个fun其实就是最外层的fun

// 函数作用域链的问题：使用var定义的函数表达式，可以在函数表达式内访问到；而对象内部定义的函数表达式不能在对象的外部访问。
var o = {
  fn: function () {
    console.log(fn);
  }
};
o.fn();  // 报错 不能访问，因为对象属性fn只在对象内部定义

var fn = function () {
  console.log(fn);  // 函数内部也可以正常访问，因为var会将函数的声明放在全局，在函数内部访问不到就继续往函数作用域的上层查找
};
fn();



// 引申：js函数的分类，具名函数和匿名函数
// 创建函数的方式有哪些？
// 方式一：声明具名函数
function myfun() { };

// 方式二：匿名函数表达式
var test = function () { };

// 方式三：具名函数表达式 注：具名函数表达式的函数名只能在创建函数内部使用；外部调用myfun()会报错myfun is not defined
var test2 = function myfun() { };

// 方式四：Function构造函数的方式, 此处创建的是匿名函数
new Function("console.log(11)")

  // 方式五：自执行函数
  (function () { console.log(123) })();


// 闭包实践二
function fnnn() {
  var arr = [];
  for (var i = 0; i < 5; i++) {  // 使用let来定义变量i也会正常返回
    arr[i] = function () {
      return i;
    }
    // 使用立即执行函数传入布局变量i则不会再继续往全局去查找i，也会正确打印
    // (function (i) {
    //   arr[i] = function () {
    //     return i;
    //   }
    // })(i)
  }
  return arr;
}
var list = fnnn();  // fnnn中的for循环使用var定义，此行代码执行后i全部为5；若使用let则可按预期结果执行
for (var i = 0, len = list.length; i < len; i++) {
  console.log(list[i]());  // 此时不管传入的i是多少都会返回闭包的5
}

// 闭包的经典例子
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 200);
}
// 解析js是单线程，setTimeout要等到线程空闲的时候才能执行此时for循环已经执行结束，此时全局环境中的i为5，setTimeout函数中没有自己的i就会往上层找，接受到参数是通过闭包访问到的全局变量，因此输出结果是五个5
// 那我们要如何正确输出我们期望的结果呢？
for (var i = 0; i < 5; i++) {
  (function (i) {
    setTimeout(() => {
      console.log(i);
    }, 200);
  })(i)  // 向上搜索i时，找到立即执行函数的局部变量i ，就会停止向上查找了
}

// 实践三
function addCount() {
  var j = 1;
  console.log(++j);
}
addCount();  // 2
addCount();  // 2
// 怎样实现每执行一次函数调用自增1呢？使用闭包
function addCount() {
  var j = 1;
  return function () {
    console.log(++j);
  }
}
var count = addCount();
count();  // 2
count();  // 3
count();  // 4

// 注意事项：在函数内部定义没有使用var则会默认提升为全局变量而非函数内的局部变量
function fn1() {
  var n = 1;
}
fn1();
console.log(n);   // n is not defined
// 而
function fn1() {
  n = 1;  // 实际上声明的是一个全局变量
}
fn1();
console.log(n);  // 1

//闭包实践四：
var name = "The Window";
var object = {
  name: "My Object",
  getNameFunc: function () {
    return function () {
      return this.name;
    };
  }
};
console.log(object.getNameFunc()());  // The Window
// this对象是在运行时基于函数的执行环境绑定的，在全局函数中this等于window，而当函数被作为某个对象的方法调用时，this等于那个对象。不过，匿名函数的执行环境具有全局性
// 通过把外部作用域中的this对象保存在一个闭包能够访问到的变量里，就可以让闭包访问到该对象了
var name = "The Window";
var object = {
  name: "My Object",
  getNameFunc: function () {
    var that = this;
    return function () {
      return that.name;
    };
  }
};
console.log(object.getNameFunc()());   // My Object


// 闭包实践五
function outerFun() {
  var a = 0;  // 函数内部使用了var关键字 维护a的作用域在outFun()内部
  console.log(a);
}
var a = 4;
outerFun();
console.log(a);
// 打印结果：0 4

function outerFun() {
  a = 0;  // 当执行a=0时,因为没有使用var关键字,因此赋值操作会沿着作用域链到var a=4;  并改变其值
  console.log(a);
}
var a = 4;
outerFun();
console.log(a);
// 打印结果：0 0

// 函数的作用域是在定义这个函数的时候就已经确定了的而不是在执行的时候确定的

// GC回收：如果一个对象不再被引用那么js的垃圾回收机制就会回收