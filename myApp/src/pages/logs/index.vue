<template>
  <view class="index">
    <text>{{ text }}</text>
    <view class="components-page">
      <icon size="60" type="success"  />
      <icon size="60" type="info" />
      <icon size="60" type="warn" color="#ccc" />
      <icon size="60" type="warn" />
      <icon size="60" type="waiting" />
      <icon size="20" type="success_no_circle" />
      <icon size="20" type="warn" />
      <icon size="20" type="success" />
      <icon size="20" type="download" />
      <icon size="20" type="clear" color="red" />
      <icon size="20" type="search" />
    </view>
     <button size="mini"  @tap="gotoPage">按钮</button>
    <swiper
      class="test-h"
      indicator-color="#999"
      indicator-active-color="#333"
      vertical
      circular
      indicator-dots
      autoplay
    >
      <swiper-item>
        <view class="demo-text-1">1</view>
      </swiper-item>
      <swiper-item>
        <view class="demo-text-2">2</view>
      </swiper-item>
      <swiper-item>
        <view class="demo-text-3">3</view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import Taro from '@tarojs/taro';
export default {
  data() {
    return {
      text: "logs"
    };
  },
  methods:{
    gotoPage(){
        console.log('fdgfdg');
        Taro.switchTab({ url: '/pages/index/index' });
    }
  }
};
</script>
