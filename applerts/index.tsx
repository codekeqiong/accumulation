// @ts-nocheck
// h5跳转小程序标签设置
import React, { useEffect } from 'react';
import { wxLaunch,  isWeixin, wxVersion } from './jump';
export function page() {
  useEffect(() => {
    // 设置按钮插入的标签为透明背景色
    if (isWeixin() && wxVersion()) {
      let content = `
     <button class="test-btn">点我跳转小程序</button>
     <style>
       .test-btn{
        width: 21.875rem;
        height: 3.0625rem;
        display: block;
        margin: auto;
        background: transparent;
        border-radius: 25px;
        border: none;
        color: #fff;
        font-size: 18px;
       }
     </style>`;

      let launchParams = {
        eleId: 'launch-btn', // 元素id
        url: 'pages/index/index.html', // 跳转小程序的页面路径
        content, // 自定义的插入的button按钮的内容及样式
        appid: 'gh_b444c868fac6', // 要跳转的小程序的源ID,此处以有课小程序的源ID为例
      };
      wxLaunch(launchParams);
    }
  }, []);

  return (
    <div className={style.payBtn} id="launch-btn" style={{ width: '21.875rem', height: '3.0625rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      已解锁会员前往学习
    </div>
  );
}
   