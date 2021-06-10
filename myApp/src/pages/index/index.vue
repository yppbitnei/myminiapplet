<template>
  <view class="index">
    <text>{{ msg }}</text>
    <button @tap="getEnv">获取当前环境{{ env }}</button>
    <button @tap="getSystemInfo">获取当前系统信息</button>
    <button @tap="getUserProfile">获取当前用户信息,出现弹窗</button>
    <button @tap="getUserInfo">获取用户信息</button>
    <button @tap="getCurrentUserInfo">获取存在store中的用户信息</button>
    <button @tap="getLogin">获取是否登录</button>
    <button @tap="getSetting">获取当前设置(授权相册)</button>
    <button open-type="share">分享</button>
    <button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">
      获取手机号(需拿到sessionKey)
    </button>
  </view>
</template>

<script>
import "./index.scss";
import Taro from "@tarojs/taro";
import {userImg} from '../../image/user.png';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      msg: "常用方法测试",
      isShow: false,
      env: ""
    };
  },
  //tabbar切换监听函数
  onTabItemTap(item) {
    console.log("item", item);
  },
  //分享 在要分享的页面js中定义onShareAppMessage
  onShareAppMessage(res) {
    console.log("res", res);
    return {
      title: "自定义分享按钮",
      path: `/pages/index/index`,
      imageUrl: ''
    };
  },
  //分享朋友圈 一般为静态内容页面，如若有交互操作 则无效
  onShareTimeline() {
    return {
      title: "分享"
    };
  },
  computed:{
    ...mapGetters([
      'getCurrentUser'
    ])
  },
  methods: {
    getEnv() {
      // console.log(Taro.getEnv());
      this.env = Taro.getEnv();
    },
    getSystemInfo() {
      Taro.getSystemInfo({
        success: function(res) {
          console.log(res);
        }
      });
    },
    getUserInfo() {
      // Taro.getUserInfo({
      //   success: function(res) {
      //     var userInfo = res.userInfo;
      //     var nickName = userInfo.nickName;
      //     var avatarUrl = userInfo.avatarUrl;
      //     var gender = userInfo.gender; //性别 0：未知、1：男、2：女
      //     var province = userInfo.province;
      //     var city = userInfo.city;
      //     var country = userInfo.country;
      //     console.log("getUserInfo", res);
      //   }
      // });
      // console.log(this.$store.getters.getCurrentUser());
    },
    //授权
    getUserProfile() {
      Taro.getUserProfile({
        desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: res => {
          console.log("用户信息", res.userInfo);
          this.$store.commit('setCurrentUser',{...res.userInfo});
          // Taro.switchTab({ url: "/pages/user/index" });
        }
      });
    },
    getCurrentUserInfo(){
       let data = this.getCurrentUser;
       console.log('storeData',data.city);
    },
    getLogin() {
      Taro.login({
        success: function(res) {
          console.log("res:", res);
          // let data = auth.code2Session();
          // console.log(data);
          Taro.checkSession({
            success: function(res) {
              console.log("未过期", res);
              //session_key 未过期，并且在本生命周期一直有效
            },
            fail: function() {
              // session_key 已经失效，需要重新执行登录流程
              Taro.login(); //重新登录
            }
          });
        }
      });
    },
    getSetting() {
      Taro.getSetting({
        success: function(res) {
          console.log("getSetting", res);
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            Taro.authorize({
              scope: "scope.writePhotosAlbum",
              success: function() {
                console.log("success");
                Taro.saveImageToPhotosAlbum();
              },
              fail: function(res) {
                console.log("failAuth", res);
                if (res?.errMsg && res.errMsg === "authorize:fail auth deny") {
                  //当拒绝后不弹出提示框
                  return;
                }
                Taro.showModal({
                  title: "提示",
                  content:
                    "用户拒绝授权访问本地相册将导致无法保存！如需继续操作，请点击确定前往开启授权。",
                  success: function(res) {
                    if (res.confirm) {
                      //点击确定后前往授权设置页面
                      Taro.openSetting();
                    }
                  }
                });
              }
            });
          }
        }
      });
    },
    openSetting() {
      console.log("ddd");
    },

    //获取手机号
    getPhoneNumber(e) {
      console.log(e.detail.errMsg);
      console.log(e.detail.iv);
      console.log(e.detail.encryptedData);
      
    }
  }
};
</script>

<style>
.index {
  color: #008000;
}
</style>
