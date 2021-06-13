// 引言  所有对象的属性名都必须是字符串类型且在对象中都是唯一的
var map = Object.create(null),   //该对象是一个原型为null的对象，不继承任何属性
    key1 = {},
    key2 = {};
map[5] = 'foo';
map[key1] = 'test';
console.log(map[5]);   // 'foo'
console.log(map['5']);   // 'foo'   属性的键名是数值型的会被自动转换成字符串，所以map[5]和map['5']引用的是同一个属性
console.log(map[key2]);   // 'test'   key1和key2会被转换成对象默认的[object Object],所以map[key1]和map[key2]都是指向的同一个属性，这种错误很难发现

map.count=1;
if(map.count){
  // 这里存在模棱两可的含义，判断的是map中是否含有count这个属性还是判断对象中的count隐式转换后是否为true？？？
}
// 解决方案：in运算符 它不仅会读取是否在当前对象中存在还会检索是否在原型的对象中，因此只有在对象的原型为null的时候使用才比较稳妥

// Set集合是一种无重复元素的有序列表，可以快速访问其中的数据，更有效地追踪各种离散值，它不会对所存值进行强制转换，唯一例外是+0和-0被认为是相等的；添加多个对象彼此之间也是保持相互独立的
// size属性可以获取当前集合中元素的数量; 
// add()方法可以向集合中添加元素, 重复调用传入相同的值那么后续的调用会被忽略
// has()方法检测该集合中是否存在某个值，返回true/false
// delete()移除Set集合中的某一个元素
// clear() 移除集合中的所有元素
let set = new Set(),
key1 = {},
key2 = {};
set.add(5);
set.add(key1);
set.add(key2);
set.add('5');
set.add(5);   // 重复的调用被忽略，不计入set的长度
console.log(set.size);  // 4

let set = new Set([1,2,3,4,1,3,2,6]);
console.log(typeof set, set);  // object  {1,2,3,4,6}

// Set集合中的forEach(value, key, owerset);遍历的结果是value和key相等，owerset就是set
// 展开运算符将Set集合转换为数组(可迭代对象均可使用)
// Weak Set集合存储对象的弱引用；适用于只需要跟踪对象引用
// 两者的主要区别在于设置引用为null之后，弱引用会被js引擎移除;另外它不能用于for-of循环，不暴露任何迭代器、不支持forEach()方法，不支持size属性,clear()方法

// map集合经常被用于缓存频繁取用的数据（许多键值对的有序列表）对象中会将属性名强制转换成字符串类型
// set()方法传入键值对进行设置；get()方法传入键名获取对应的键值，不存在会返回undefined
// 同样Map也支持has(key),delete(key),clear(),还有size属性
// Map集合的forEach(value,key, ownerMap)
let map = new Map([['name','june'],['age','18']]);
map.forEach(function(value, key, ownerMap){
  console.log(key +' '+ value);
  console.log(map === ownerMap);
})
// 打印结果：
// name june
// true
// age 18
// true
// Weak Map是弱引用Set集合，无序列表，列表的键值必须是非null的对象；用对象作为集合的键名
let map = new WeakMap();
// Weak Map支持set()/get()，不支持枚举、forEach()、size属性，也不支持clear()
// 想用非对象作为键名，那么Map是唯一的选择