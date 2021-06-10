// import Vue from 'vue'
// import Vuex from 'vuex';
import './app.scss';
import Taro from '@tarojs/taro';
// import { userImg } from './image/user-select.png';
import store from './app.store';

const App = {
  store,
  onLaunch() {
    console.log('初始化');
    const systemInfoSync = Taro.getSystemInfoSync();
    let height = systemInfoSync.screenHeight-systemInfoSync.windowHeight-systemInfoSync.statusBarHeight;
    let statusBarHeight = systemInfoSync.statusBarHeight;
    console.log('statusBarHeight',systemInfoSync);
    if(systemInfoSync){
      store.commit('setNavBarHeight',{height,statusBarHeight});
      Taro.setStorage({key:'systemInfoSync',data:{...systemInfoSync}});
    }
    Taro.login({
      success: function (res) {
        console.log('res:', res);
      }
    });
    // Taro.checkSession({
    //   success: function (res) {
    //     console.log(res);
    //     //session_key 未过期，并且在本生命周期一直有效
    //   },
    //   fail: function () {
    //     console.log('fail')
    //     // session_key 已经失效，需要重新执行登录流程
    //     Taro.login() //重新登录
    //   }
    // });
    Taro.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log('用户信息', res);
      }
    })
  },
  onShow() {
    console.log('show');
  },
  // onShareAppMessage(res) {
  //   console.log('res',res);
  //   if (res.from === "button") {
  //     const {share = {}} = res.target.dataset
  //     return {
  //       title:`自定义分享按钮${share.title}`,
  //       path: `/pages/user/index`,
  //       imageUrl: userImg
  //     };
  //   } else {
  //     return {
  //       title: "右上角分享事件",
  //       path: `/pages/user/index`,
  //       imageUrl: userImg
  //     };
  //   }
  // },
  //点击tab切换时
  onTabItemTap(item) {
    console.log('item', item);
  },

  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  }
}

export default App
