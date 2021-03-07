// 1、时间戳转换为年月日的格式
export const timeFormat = (timestamp) => {
  const time = new Date(timestamp);
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const hours = time.getHours() < 10 ? ('0' + time.getHours()) : time.getHours();
  const minutes = time.getMinutes() < 10 ? ('0' + time.getMinutes()) : time.getMinutes();
  return month + '月'+ date + '日 ' + hours + ':' + minutes;
}
// 2、获取此时的时间戳
new Date().getTime();
/**
 * 3、倒计时定时器每秒钟执行一次，设置
 * @param {Date} 结束时间戳  completeTime表示的是过期时长
 */
function interval(completeTime) {
    if (!completeTime) return { msg: 'error:错误的时间' };
    const stime = Date.parse(new Date().toString());
    const etime = Date.parse(new Date(completeTime).toString());
    const usedTime = etime - stime; //两个时间戳相差的毫秒数
    const days = Math.floor(usedTime / (24 * 3600 * 1000));
    //计算出小时数
    const leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    const hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    const leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    const minutes = Math.floor(leave2 / (60 * 1000));
    //计算相差秒数
    const leave3 = leave2 % (60 * 1000); //计算小时数后剩余的毫秒数
    const second = Math.round(leave3 / 1000);
    const time = days + '天' + hours + '时' + minutes + '分' + second + '秒';

    const obj = {
      days,
      hours: hours >= 10 ? hours : `0${hours}`,
      minutes: minutes >= 10 ? minutes : `0${minutes}`,
      second: second >= 10 ? second : `0${second}`,
      time,
    };
    /** TODO: 倒计到1s会跳到0s而不是下一分钟的60s */
    if (second < 0) {
      return { ...obj, msg: 'error:已过期' };
    }
    return { ...obj, msg: 'success' };
  }
  countdown = () => {
    const completeTime = Date.parse(new Date().toString()) + 600000;
    let num = 9;
    /** 模拟毫秒倒计时(假) */
    const msTimer = setInterval(() => {
      this.setState({ millisecond: num <= 0 ? (num = 9) : num-- });
    }, 100);
    const allTimer = setInterval(() => {
      const timer = utils.meth.interval(completeTime);
      if (timer.msg === 'error:已过期') {
        this.setState({ minutes: '09', second: '59', millisecond: '0' });
        clearInterval(allTimer);  // 开启下一个定时器之前先要清除前一个定时器否则会出现多个定时器并存的情况
        clearInterval(msTimer);
        this.countdown();
        return;
      }
      this.setState({ ...timer });
    }, 1000);
    this.setState({ allTimer, msTimer });
  };

// 4、常见的数组处理方法
// includes
let arr = [1,2,3,4,5,6];
arr.includes(2);   // true
// indexOf
let arr = [2,3,8,4,5,6];
arr.indexOf(6);   // 5 找到返回索引下标，没找到返回-1
// filter
let data = [{id: 1, name: 'hahaha'},{id: 2, name: 'xixixi'},{id: 3, name: 'heiheihei'}];
data.filter(item => item.id === 3);  // [{id: 3, name: 'heiheihei'}]返回符合条件的对象数组
// find  find()方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined
let arr = [12,14,13,14,15,16];
let res = arr.find(element => element > 15);  // res 16
// every 要求每一项都要满足条件
let arr = [12,14,13,14,15,16];
let res = arr.every(element => element > 15);  // res false
// some 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测
let arr = [12,14,13,14,15,16];
let res = arr.some(element => element > 15);  // res true
// findIndex 获取目标对象的数组下标
function targetIndex(id){
  let arr = [1,2,3,4,5,6,7,8];
  return arr.findIndex((item) => item == id);
}
targetIndex(6);  // 5

// 5、轮询 如何利用react中的state来引用该定时器的地址，实现在该函数作用域以外也能清除定时器的目的(类似浅拷贝，保存的是同一个地址)
function polling() {
  const wxPay = setInterval(() => {
    Api.Api_common.paymentStatus({ product_id: this.state.channel_id }).then((res) => {
      if (res.pay_status) {
        clearInterval(wxPay);
      }
    });
  }, 3000);
  this.setState({ wxPay });
}
// componentWillUnmount() {
//   clearInterval(this.state.wxPay);   清除定时器
// }

// 6.常见的字符串处理方法
charAt(index) // 返回指定索引位置处的字符。超出则返回空字符串
slice(start,end)  // [start, end) 返回字符串的片段。【为负则倒着截取】
substring(start,end)  //（不包括end）end参数是可省的，如果没有传入则是从start到结尾
substr(start[包含],length) //返回字符串片段
indexOf('要查找的字符串', startIndex) //返回第一次出现子字符串位置。如果没有找到子字符串则返回-1
lastIndexOf()  //方法返回String对象中字符串最后出现的位置。如果没有匹配到子字符串，则返回-1
search()  //方法返回与查找内容匹配的第一个 字符串 的位置
concat()  //方法拼接字符串
split(separator,limit)  //将一个字符串分割为子字符串，然后将结果作为字符串数组返回
toLowerCase()  //方法返回一个字符串，该字符串中的字母被转换成小写
toUpperCase()  //都转换为大写
replace('要替换的内容','新内容') //用于替换字符串

// 7.Select中的defaultValue只在第一次进入有效，value则是每次都匹配(父组件)

// 8.返回浏览器上一个页面的几种方法
document.referrer  //会存在iOS不兼容的问题，返回无效
history.back();
history.go(-1);

// 9、使用深拷贝实现前端展示UI的更新
function handleEdit(id){
  let index = data.findIndex(item => item.id == id);
  let itemData = JSON.parse(JSON.stringify(data[index]));
  this.$set(data, index, itemData);  //vue中通过$set来实现
}
// react中通过setState来实现
this.state.data[index].page++;
this.state.data[index].status = '报名成功';
this.setState({...state})

// 10、事件队列执行顺序
async function a1 () {
  console.log('a')
  await a2()
  console.log('b')
}
async function a2 () {
  console.log('c')
}
console.log('d')
setTimeout(() => {
  console.log('e')
}, 0)
Promise.resolve().then(() => {
  console.log('f')
})
a1()  //调用a1()是在f之后因此f是在b之前加入到微任务队列中的也就先执行
let promise2 = new Promise((resolve) => {
  resolve('k')
  console.log('g')
})
promise2.then((res) => {
  console.log(res)
  Promise.resolve().then(() => {
      console.log('h')
  })
})
console.log('j')

// 打印结果： d a c g j f b k h e

// 今日头条面试题
async function async1() {
  console.log('async1 start');  //async函数中在await之前的代码是立即执行的，所以会立即输出
  await async2();
  console.log('async1 end'); //加入到microtask中的Promise队列中，接着跳出a1函数来执行后面的代码
}
async function async2() {
  console.log('async2'); //遇到了await时，会将await后面的表达式执行一遍，所以就紧接着输出
}
console.log('script start');
setTimeout(function() {
  console.log('setTimeout');  // 加入到宏任务队列中
}, 0)
async1();
new Promise(function(resolve) {
  console.log('promise1'); // Promise中的函数是立即执行的
  resolve();
}).then(function() {
  console.log('promise2'); // 回调函数会添加到微任务的执行队列中，并且它会在async1 end之后执行
});
console.log('script end');
/*
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
*/

// promise是同步执行的，then回调函数是异步执行的并且会放到微任务队列中
// 微任务的执行优先级比宏任务的优先级高，先执行完微任务队列才会执行宏任务队列，在宏任务中执行到微任务会立即将该微任务放置到微任务队列中，并且它的执行会先于其他的宏任务
// 链接；https://www.jianshu.com/p/62c7d633a879
function fn(){
  console.log(1); 
  setTimeout(() => {
      console.log(2);
      Promise.resolve().then(() => {
          console.log(3)   // 宏任务中执行到的微任务，该微任务会在此宏任务之后的其他宏任务之前执行
      });
  });
  new Promise((resolve, reject) => {
      console.log(4)
      resolve(5)
  }).then((data) => {
      console.log(data);
      Promise.resolve().then(() => {
          console.log(6)
      }).then(() => {
          console.log(7)
          setTimeout(() => {
              console.log(8)
          }, 0);
      });
  })
  setTimeout(() => {
      console.log(9);
  })
  console.log(10);
}
fn();
// 1 4 10 5 6 7 2 3 9 8

// 11、正则匹配：
// 1)、大于0小于10，只允许一位小数： /^((0\.[1-9]{1})|(([1-9]{1})(\.\d{1})?))$/.test( '1.1' )
// 2)、大于0的正整数： /^\+?[1-9]\d*$/.test();
// 3)、大等于0的正整数: /^\+?\d+$/.test('');
// 4)、匹配字符串中的数字获取活动id：params.id.replace(/[^0-9]/g,"")
// \n换行符  \s空白符号  \S任何的非空白字符  \r回车  \d等价于[0-9], \D表示得数字字符等价于[^0-9]
// ^的两种使用：表示开头；放在中括号中表示取反的意思  *表0或者多次  +表示一次或者多次  ？表示0次或者1次

// 12.关于支付完成后禁止回到支付页面A->B->C，在B页面使用replace切换到C页面，那在C页面回退会回到A页面
window.location.replace('要被替换掉的url', '目标url');

//13、可选链操作符( ?. )允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效,在引用为空(null 或者 undefined) 的情况下不会引起错误，
// 并且为undefined的参数，会在传参中将这个字段移除
// 该表达式短路返回值是undefined。与函数调用一起使用时，如果给定的函数不存在，则返回undefined

// 14.浏览器滚动条位置缓存
// 滚动监听
window.addEventListener('scroll', getScrollTop);
// 获取页面滚动距顶距离
const getScrollTop = () => {
  // 或 document.documentElement.clientHeight;
  const userScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  sessionStorage.setItem('scrollTop', userScrollTop.toString());
};
// window.scrollTo 方法滚动指定位置：
const goToUserLastTimeScrollPosition = () => {
  const getLastTimeScrolltop = window.sessionStorage.getItem('scrollTop'); // 记录并回到上次用户滚动到的位置
  if (getLastTimeScrolltop && getLastTimeScrolltop !== null) {
    window.scrollTo(0, parseFloat(getLastTimeScrolltop));
  }
};

// 15.将相同直播间id的多个专栏id合并为数组
for (let i = 0; i < params.length; i++) {
  // 定义一个tempArr临时数组用来判断是否已经存在该直播间id
  if (tempArr.indexOf(params[i].liveroom_id) === -1) {
    newArr.push({
      liveroom_id: params[i].liveroom_id,
      channel_ids: [params[i].channel_id],  //注意这里的[]不能丢失，否则后续执行push方法的时候会报错
    });
    tempArr.push(params[i].liveroom_id);   // 记录新添加进的直播间id
  } else {
    for (let j = 0; j < newArr.length; j++) {
      if (newArr[j].liveroom_id == params[i].liveroom_id) {
        newArr[j].channel_ids.push(params[i].channel_id);
      }
    }
  }
}

// 16.react中引入插件实现复制到粘贴板的功能 text需要复制的文本  onCopy复制完成的回调
<CopyToClipboard text={url} onCopy={() => message.success('复制成功')}>
  <Button type="link">复制</Button>            
</CopyToClipboard>

// 17.fiddler抓包
// 需要保证手机端和电脑端在同一个局域网下，手机端在浏览器中访问IP：端口号下载信任证书，并且安装，使用该ip和端口号设置代理即可被抓包工具拦截
// bpu 接口名  webforms中可以更改前端传参
// bpafter 接口名  可以更改后端返回的数据拦截

// 18.webpack  webpack中的开发环境和生产环境（用户可以正常使用的环境）
// 使用脚手架搭建后，build文件夹会分别自动的生成webpack.base.conf.js（公共配置）、webpack.dev.conf.js（开发环境配置）、webpack.prod.conf.js（生产环境的配置）三个webpack配置文件
// 参考链接：https://www.cnblogs.com/dengyao-blogs/p/11598431.html   https://blog.csdn.net/qq_39246667/article/details/105840318


options: {
  importLoaders: 1  //0=>无；1=>postcss-loader; 2=> postcss-loader,sass-loader
}

// 19.如何将返回的json数据格式转换为树形结构来展示

JSON.stringify(data, null, 2)  // 2表示的是间隔
// 校验是否是合法的json数据
const isJson = (data) => {
    try {
      var obj = JSON.parse(data);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
}

// 20.ant中指定table中的唯一标识
// 照React的规范，所有的组件数组必须绑定key。在Table中，dataSource和columns里的数据值都需要指定key值。对于dataSource默认将每列数据的key属性作为唯一的标识。如果你的数据没有这个属性或者是该key有重复的值，请使用rowKey来指定数据列的主键。若没有指定控制台会报错

// 21.快捷展示当前时间格式
new Date(1608990783217).toLocaleString()   // 2020/12/26 下午9:53:03
toLocaleDateString()  // 显示为年/月/日  
toLocaleTimeString()  // 显示类似下午9:53:03
toLocaleString()  

// 22.git管理
// git remote remove <仓库名>
// git remote add origin <项目仓库地址>

// 23.解决react中使用set设置数据不生效的问题
// react中使用set方法设置更新的数据无效，原因大概是内部的实现原理只是进行了第一层的比较，因此需要通过深拷贝JSON.parse(JSON.stringfy)来开辟新的空间存储数据再set这份新的数据

// 24.for遍历数组修改数组的组成属性集合
// 遍历一个数组只取它的部分属性，并且添加新的字段进行组合，return后会直接返回我们预想的目标数组，同样，如果是只取其中的某一个属性，return这一个属性内容即可

// 25.文本内容解析换行正常显示 white-space: pre-wrap保留空白符序列，但是正常地进行换行
// 后台文本域中设置内容，在h5端需要显示程换行，但是通过正则匹配替换str = str.replaceAll(/\r\n/g,'<br/>')无效

// 26.react.CreateRef()
//ref: https://www.cnblogs.com/lanpang9661/p/12604712.html
textRef = React.createRef();
focus = () => {
  // ref的current属性将能拿到dom节点或组件的实例
  this.textRef.current.focus();
}
<div type='text' ref={this.textRef}></div>
