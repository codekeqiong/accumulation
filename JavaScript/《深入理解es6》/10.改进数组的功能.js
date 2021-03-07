/** Array.of() 不管传入什么类型的数据，都能正确识别为数组的值*/ 
let item = new Array('2');  // [2]
let item = new Array(2);  // 会被解析为长度为2的空数组[undefined, undefined]
let item = new Array(1, '2');  // [1, '2']
// 解决传入一个数字会被误解析为数组长度的问题ES6引入该方法Array.of()方法
let item = Array.of(2);   // [2] 正常解析为数组长度为1，并且值为2

/** Array.from(可迭代对象或类数组对象， 映射转换函数，映射函数的this值) */ 
// 以往将类数组转换为数组的方法：1.for循环+push方法将类数组中的数据复制到数组中  2.使用Array.prototype.slice.call(arrayLike)
Array.from()

/** find()返回查找的值/findIndex()返回查找值的索引 */ 

/** 如果只是想要查找与某个值匹配的元素，则更好的选择是：indexOf()和lastIndexOf() */ 
// 定型数组：将任何数字转换为一个包含数字比特的数组
/** fill(要填充的内容,开始索引(包含),结束索引(不包含))填充   赋值的是指定的值*/ 
let numbers=[1,2,3,4,5,6];
numbers.fill('w');  // ["w", "w", "w", "w", "w", "w"]
numbers.fill('w', 2);   // [1, 2, "w", "w", "w", "w"] 没有传结束索引的匹配则默认是数组的长度
numbers.fill('w', 2, 5);   // [1, 2, "w", "w", "w", 6]  不包含结束索引
/** copyWithin(开始填充值得索引位置，开始复制值得索引位置, 不包含的结束索引用于指定停止复制值的位置)  赋值的是数组中元素的值*/ 
let numbers=[1,2,3,4,5,6];
numbers.copyWithin(3, 0);   // [1, 2, 3, 1, 2, 3]
numbers.copyWithin(3, 0, 1);  // [1,2,3,1,5,6]