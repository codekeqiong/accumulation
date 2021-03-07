// js将一对开放的花括号视为代码块，语法规定代码块语句不能出现在赋值语句的左侧，添加小括号可以将其转化为一个表达式从而实现解构过程
let demo = {
  type: 'indentify',
  name: 'foo'
}
function outputinfo(value){
  console.log(value);  // {type: "indentify", name: "foo"}
  console.log(value === demo);  // true
}
({type, name} = demo)  // 不加小括号包裹表达式会报错，添加后返回type => "indentify", name => "foo"
console.log(type, name);
outputinfo({type, name} = demo) 
// 若指定的局部变量不在该对象中，那么这个局部变量就会返回undefined，还可以类似默认参数值给局部变量设置默认的值，那么没有在该对象中的变量就会取默认值返回
let {type, name, extra} = demo;
console.log(extra)   // undefined
let {type, name, extra='default'} = demo;
console.log(extra)   // default

// 非同名变量的解构赋值，也可以使用默认参数值
let demo = {
  type: 'indentify',
  name: 'foo'
}
let {type: newtype, name: newname} = demo;  // 读取type的属性并将其值存储到变量newtype中，这与传统的对象字面量的语法不同，需要注意
console.log(newtype);  // 'indentify'
console.log(newname);  // 'foo'

// 支持嵌套并且嵌套内层也支持使用不同的局部变量名
let node = {
  name: 'aaa',
  local: {
    start: {
      line: 1,
      column: 2
    },
    end: {
      line: 3,
      column: 4
    }
  }
}
let {local: {start: {line}}} = node;
console.log(line);  // 1
let {local: {start: localstart}} = node;
console.log(localstart.column);  // 2

// 数组解构（数组本身不会发生改变）通过值在数组中的位置进行选取，未显示声明的元素会被直接忽略
// 可以省略元素，只取目标位置的数据
let colors = ['red', 'green', 'orange', 'grey'];
let [fristcolor, , ,lastcolor, defaultcolor='white'] = colors;  // 逗号前面的元素表示占位符,可以使用默认值
console.log(fristcolor, lastcolor, defaultcolor);  // red grey white

// 解构赋值：数组的解构赋值与对象不同的点是不需要使用小括号进行包裹表达式
let colors = ['red', 'green', 'orange', 'grey'];
[firstcolor, secondcolor] = colors; 
console.log(firstcolor, secondcolor) // red green

// 实现变量值得互换
[a, b] = [b, a]// 左侧是解构模式，右侧是为交换创建的临时数组字面量
// 嵌套数组解构
let colors = ['red', ['green', 'orange'], 'blue'];
let [firstcolor,[secondcolor]] = colors;
console.log(firstcolor, secondcolor);  // red green
// 不定元素
let colors = ['red', 'green', 'orange', 'blue'];
let [firstcolor,...restcolors] = colors;
console.log(firstcolor, restcolors);  // red  ['green', 'orange', 'blue']
// ES5中开发者们会使用concat方法来实现一个数组的复制，该方法原本是用于连接两个数组的，在调用的时候不传入参数则会返回当前数组的副本
// ES6中我们完全可以使用不定语法实现复制的功能（注：不定元素只能放在最后一个参数的位置否则会报错）

// 混合解构（混合了对象和数组的对象）当我们想从JSON中提取信息的时候不需要再对其进行遍历
let node = {
  name: 'aaa',
  local: {
    start: {
      line: 1,
      column: 2
    },
    end: {
      line: 3,
      column: 4
    }
  },
  testArr: [21,32,63]
}
let {
  local: {start}, 
  testArr: [arr]
} = node;
console.log(start.line, arr);  // 1 21
// 解构参数
function setCookie(name, value, options){  // option可选对象
  options = options || {};
  let secure = options.secure,
      path = options.path,
      domain = options.domain,
      expires = options.expires;
  console.log(secure,expires)
}
setCookie("type", "js", {
  secure: true,
  expires: 60000
})
// 解构参数默认值
function setCookie(name, value,{secure, path, domain, expires} = {}){}
setCookie("type", "js");  // 设置默认为{}那么不传入第三个参数的时候也不会报错
// 解构参数
const setCookieDefault = {  // 设置默认的参数名，这样写的好处是需要修改默认值的时候，改变这里就可以全部同步改变
  secure = false,
  path = "/",
  domain = "example.com",
  expires: new Date(Date.now()+3600000)
}
function setCookie(name, value,{secure, path, domain, expires} = setCookieDefault){}