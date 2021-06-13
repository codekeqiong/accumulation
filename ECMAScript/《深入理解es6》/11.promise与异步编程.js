js引擎是单线程的事件循环
事件模型
回调模型
// promise相比事件和回调的优势：
// 事件在遇到错误时不会主动触发，回调函数必须要每次都检查错误参数
错误优先的回调风格

let promise = new Promise((resolve, reject) => {
  console.log('promise');
})
promise.then(function(contents){
  console.log('成功的回调函数')
}, function(err){
  console.log('失败的回调函数')
})

promise.catch(() => { console.log('回调失败') })   // 等价于
promise.then(null, function(err){ console.log('回调失败') })

// promise是同步的，then()和catch()是异步的，完成处理程序和拒绝处理程序总是在执行器完成后被添加到任务队列的末尾

// promise的三种状态: pedding、fulfilled、rejected

// 如果一个promise处于已处理状态，在这之后添加到任务队列中的处理程序仍将执行
promise中的执行顺序