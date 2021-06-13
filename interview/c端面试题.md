1.给定一个div，只修改div样式，如何用css实现在 “上下左右距离” 各占页面的10%（注：上下距离为高度页面高度的百分之10%，左右距离为页面宽度的百分之10%）
<style>
    body {  padding: 0;   margin: 0;  }
    div {
        
    }
</style>
<body>
<div></div>
</body>

2.当我们new一个实例的过程中发生了什么，可以简单实现一下吗？

3.怎么实现一个方法add使得add(2)(3).sum()=5  ，add(2,3).sum()=5实现同等效果，注(add函数传参不一定是两个)。

4.给定任意大于0的数字(例如1234)，怎么得到其回文数另一半？（解释："回文数"，即数字的反转，譬如1234反转为4321，可说明12344321是回文数)。

5.如下代码的打印结果是？为什么？
setTimeout(() => {console.log(1)}, 0)
console.log(2)
const promise2 = new Promise((resolve) => {
    	console.log(3)
	  	resolve(3)
})
promise2.then((res) => {
    console.log(4)
})

7.请实现方法满足: execute 对应的id按顺序打印（注：尝试只修改start函数体）
//  输出结果参考:
//  id 0
//  id 1
//  id 2
//  id 3
//  id 4

function start(id) {
  // execute(id).catch(console.error);

}

// 以下代码请勿更改:
for (let i = 0; i < 5; i++) {
  start(i);
}
function randoms(num, max, min) {
  return Array.from({ length: num }).map(() => Math.ceil(Math.random() * (max - min) + min));
}
function sleep() {
  return new Promise(resolve => setTimeout(resolve, randoms(1, 1000, 1)[0]));
}
function execute(id) {
  return sleep().then(() => console.log('id', id));
}

8.【附加题】实现一个简单的发布订阅类？