export function wxLaunch(info) {
  const btn = document.getElementById(info.eleId); //获取元素
  const script = document.createElement('script'); // 创建script内容插槽 避免template标签冲突
  script.type = 'text/wxtag-template'; // 使用script插槽 必须定义这个type
  script.text = info.content; // 自定义的html字符串内容
  const html = `<wx-open-launch-weapp key=${info.eleId} id="launch-btn" username="${info.appid}" path="${info.url}">${script.outerHTML}</wx-open-launch-weapp>`;
  if (!html || !script.outerHTML) return;
  btn.innerHTML = html; // html字符串赋值

  // 点击按钮 正常跳转触发
  btn.addEventListener('launch', function (e) {
    console.log('success');
  });

  // 点击跳转 抛出异常
  btn.addEventListener('error', function (e) {
    console.log('fail', e.detail);
    alert(`跳转异常 - ${e.detail}`);
  });
}

// 判断是否是微信环境
export function isWeixin() {
  let ua = navigator.userAgent.toLowerCase();
  if (/Micromessenger/i.test(ua)) {
    return true;
  } else {
    return false;
  }
}

// 判断微信的版本号(是否支持H5跳转小程序)
export function wxVersion() {
  let wxInfo = navigator.userAgent.match(/MicroMessenger\/([\d.]+)/i); // 微信浏览器信息
  if (wxInfo) {
    let version = wxInfo[1].split('.');
    // 判断版本在7.0.12及以上的版本才可使用<wx-open-launch-weapp></wx-open-launch-weapp>
    if (Number(version?.[0]) >= 7) {
      if (Number(version?.[0]) > 7) {
        return true;
      } else {
        if (Number(version?.[1]) > 0) {
          return true;
        } else {
          if (Number(version?.[2]) >= 12) {
            return true;
          }
        }
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export const isIphone = () => {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    //判断iPhone|iPad|iPod|iOS
    return true;
  }
  return false;
};