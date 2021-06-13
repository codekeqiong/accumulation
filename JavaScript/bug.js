// 1. 解决报错信息：[HMR] Waiting for update signal from WDS...
// 解读：Hot Module Replacement：模块热更新  Webpack dev Server：webpack的开发环境服务器（本地服务器）
// 解决这个提示的方法：依赖包--webpack--hot--log.js 注释掉下面代码即可

// 2.接口返回response显示： fail load data 原因是接口请求数据的时候如果进入判断跳转到别的页面，那么会终止当前接口的请求

// 3.使用微信的API设置分享给好友的链接配置前要先引入微信的sdk

// 4.标准时间转换为时间戳的兼容问题：ios不支持短横杠连接年月日支持用斜杠连接
new Date("2021/4/10 11:59:59").getTime()
new Date("2021-4-10 11:59:59").getTime()

// 5.优化搜索框的显示样式: <Input.Group compact></Input.Group>