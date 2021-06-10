<template>
  <view v-if="!currentUser || !currentUser.nickName">
    <button @tap="getUserProfile">
      获取头像昵称
    </button>
  </view>
  <view class="user-view" v-else>
    <image
      class="user-avatar"
      mode="cover"
      :src="currentUser.avatarUrl"
    ></image>
    <text>{{ currentUser.nickName }}</text>
    <view>
      <button @tap="goSharePage">跳转分享页面</button>
    </view>
  </view>
</template>

<script>
import { userImg } from "../../image/user.png";
import { mapGetters } from "vuex";
import "./index.scss";
import Taro from "@tarojs/taro";
export default {
  data() {
    return {
      text: "我的"
    };
  },
  onTabItemTap(item) {
    console.log("item我的", item);
    console.log(this.currentUser);
    if (!this.currentUser || !this.currentUser.nickName) {
      this.getUserProfile();
    }
  },

  //右上角菜单处发送给朋友
  onShareAppMessage(res) {
    console.log("res1", res);
    return {
      title: "自定义分享按钮",
      path: `/pages/index/index`,
      imageUrl: userImg
    };
  },
  //右上角菜单分享到朋友圈
  onShareTimeline() {
    return {
      title: "dfdfsd"
    };
  },
  //收藏
  onAddToFavorites() {},
  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser"
    })
  },
  methods: {
    getUserProfile() {
      Taro.getUserProfile({
        desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: res => {
          console.log("用户信息", res.userInfo);
          this.$store.commit("setCurrentUser", { ...res.userInfo });
        },
        fail: res => {
          this.$store.commit("setCurrentUser", {});
        }
      });
    },
    goSharePage() {
      Taro.navigateTo({url:"/pages/share/index"});
    }
  }
};
</script>
