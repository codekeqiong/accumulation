export interface Iprops {
    hours: string;
    munite: string;
}
// 等价于下面的这种方式
export type Istate = {
    data: any;
}

// setState之后，会重新跑一次定义的usestate, 未使用state包裹的定义未赋值的元素会重新变成undefined状态

// 如何封装一个类似蚂蚁框架中的message全局提示

// fidder抓包工具的使用

// 页面劫持的实现

1. video标签中非全屏状态下；css设置object-fit：fill；设置默认情况下视频在该区域内全屏显示

2. 空值合并操作符(??): 会过滤null和undefined，其他的比如0，false，''都能正常取值

3. getBoundingClientRect属性的使用，返回该元素的位置属性

4. var rect = elm.getBoundingClientRect(); 

   比如曝光的实现：// rect.top = rect.bottom + rect.height; top和bottom的值是相对于当前视口顶部的距离(注意是视口的顶部不是文档的顶部所以不包含滚动的部分!)    
   var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
       console.log(rect);
       // 展示在屏幕内百分之50以上为曝光
       return !(rect.bottom - selfAdaption(option?.addBottom || 0) < elm.clientHeight / 2 || viewHeight - rect.top - selfAdaption(option?.addTop || 0) < elm.clientHeight / 2);

5. <Input.Group compact></Input.Group>用于设置多个input框的显示样式compact紧凑即相邻的input框不会显示圆角

6. git不忽略文件名称大小写变更: git config core.ignorecase false

7. https://segmentfault.com/a/1190000018428170

8. 垃圾回收机制：1.从全局对象出发，只要不能够直接或者间接被访问到的值，就满足可回收的条件
   2.从当前执行环境以及作用域链上可访问的对象出发，任何可以被访问的对象，都算是可访问对象（考虑闭包）
   常用的方法：(1)标记清除法（从根节点（这里的根节点，指的就是上文提到的全局对象以及当前执行环境以及作用域链上可访问的对象）出发，深度优先遍历所有可以访问到的节点，但是这里有可优化的点是可能会重复标记那需要怎样避免重复标记呢？）、(2)引用计数法（朋友圈互相调用的案例会存在问题，因为互相有调用，那调用次数就不为0但是整个对象设置为null时其实可以回收了）

9. Hook 我们用的函数参数的方式
   increaseCount = () => {
        this.setState((state)=>{return{count: state.count + 1}});
    }如果需要依赖当前state的值来更新下一个值的情况，需要使用函数作为参数，因为函数才能保证取到最新的state

10. https://segmentfault.com/a/1190000021178528
    问题1：setState使用函数参数和对象参数有何区别？
    问题2：为什么state不会保证立即执行，而是会在某个时机批量更新所有的component
    问题3：setStates为什么要设定批量更新机制?
    问题4：批量更新的过程是怎么执行的

11. 防抖与节流的区别：
    防抖：触发后一定时间内不会再次触发，如果一直运行则会一直重置setTimeout延时操作（即 静止超过指定的时间才会触发）
    节流：根据时间进行节流，防止一定时间内多次触发（保证每隔指定时间就会执行一次）节流：静止不会触发，滚动立即触发并且一直滚动会在指定时间点再触发；防抖是会在静止指定时间的时候触发

12. https://blog.csdn.net/yingzizizizizizzz/article/details/77726346

13. 规范问题：组件的私有方法都用 _ 开头，所有事件监听的方法都用 handle 开头。把事件监听方法传给组件的时候，属性名用 on 开头，定义接口首字母要大写