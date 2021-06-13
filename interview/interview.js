// 6. 请实现方法满足: execute 对应的id按顺序打印（注：尝试只修改start函数体）
//  输出结果参考:
//  id 0
//  id 1
//  id 2
//  id 3
//  id 4
function start(id) {
  setTimeout(() => {
    execute(id).catch(console.error);
  }, id * 500);
}
// 面试题:
for (let i = 0; i < 5; i++) {
  start(i);
}
function sleep() {
  const duration = Math.floor(Math.random() * 500);
  return new Promise(resolve => setTimeout(resolve, duration));
}
function execute(id) {
  return sleep().then(() => {
    console.log('id', id);
  });
}


function start(id) {
  setTimeout(() => execute(id).catch(console.error), id);
}
// 面试题更改:
for (let i = 0; i < 5; i++) {
  start(i);
}
function randoms(num, max, min) {
  return Array.from({ length: num }).map(() => Math.ceil(Math.random() * (max - min) + min));
}
function sleep() {
  const duration = randoms(1, 10000000, 1);
  return new Promise(resolve => setTimeout(resolve, duration));
}
function execute(id) {
  return sleep().then(() => {
    console.log('id', id);
  });
}