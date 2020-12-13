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
 * @param {Date} 结束时间戳  completeTime表示的是过期时间
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
        this.setState({ minutes: '10', second: '00', millisecond: '0' });
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
data.filter(item => item.id === 3);  // {id: 3, name: 'heiheihei'} 返回符合条件的整这条对象数组
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

// 8.返回浏览器上一个页面的三种方法
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
a1()
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

// 11、正则匹配：
// 1)、大于0小于10，只允许一位小数： /^((0\.[1-9]{1})|(([1-9]{1})(\.\d{1})?))$/.test( '1.1' )
// 2)、大于0的正整数： /^\+?[1-9]\d*$/.test();
// 3)、大等于0的正整数: /^\+?\d+$/.test('');
// 4)、匹配字符串中的数字获取活动id：params.id.replace(/[^0-9]/g,"")

// 12.关于支付完成后禁止回到支付页面A->B->C，在B页面使用replace切换到C页面，那在C页面回退会回到A页面
window.location.replace('要被替换掉的url', '目标url');

//13、可选链操作符( ?. )允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效,在引用为空(null 或者 undefined) 的情况下不会引起错误，
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
<CopyToClipboard text={record.scene_url} onCopy={() => message.success('复制成功')}>
  <Button type="link">复制</Button>            
</CopyToClipboard>

// 17.fiddler抓包
// 需要保证手机端和电脑端在同一个局域网下，手机端在浏览器中访问IP：端口号下载信任证书，并且安装，使用该ip和端口号设置代理即可被抓包工具拦截
// bpu 接口名  webforms中可以更改前端传参
// bpafter 接口名  可以更改后端返回的数据拦截

// 18.webpack
options: {
  importLoaders: 1  //0=>无；1=>postcss-loader; 2=> postcss-loader,sass-loader
}