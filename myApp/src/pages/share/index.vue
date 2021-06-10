<template>
  <!-- <view class="flex"> -->
  <view class="content">
    <image :src="ImgBackGround" class="img-backgroud"></image>
    <!-- :style="{ height: getNavBarHeight.height + 'px', border: 'none' }" -->
    <view class="cus-nav-bar">
      <button
        @tap="navigatorBack"
        class="back-btn"
        :style="{ top: getNavBarHeight.statusBarHeight + 6 + 'px' }"
      ></button>
    </view>
    <view
      class="title"
      :style="{ top: getNavBarHeight.statusBarHeight + 6 + 'px' }"
      ><text>achievement</text></view
    >
    <!-- 头像 -->

    <!-- 主要内容 -->
    <!-- <view class="content-box"> -->
    <view class="content-box">
      <view class="write-box">
        <image class="img-colour" mode="cover" :src="ImgColour"></image>
        <image
          class="user-avatar"
          mode="cover"
          :src="currentUser.avatarUrl"
        ></image>
        <view class="backgroud-box-write backgroud-box-padding-top">
          <view class="margin-bottom">
            <text class="bold-text">数据智能事业部</text>
          </view>
          <view class="margin-bottom">
            <text class="text-color-grey">前端开发工程师</text>
          </view>
          <view class="flex-box margin-top-25">
            <view class="flex-1">
              <text><text class="bold-color">1</text>本</text>
              <text class="text-color-grey">外教领读</text>
            </view>
            <view class="flex-1">
              <text><text class="bold-color">1</text>个</text>
              <text class="text-color-grey">开口</text>
            </view>
            <view class="flex-1">
              <text><text class="bold-color">1</text>次</text>
              <text class="text-color-grey">dggdf</text>
            </view>
          </view>
        </view>
        <!-- 第二个白框内容 -->
        <view class="backgroud-box-write backgroud-box-padding-bottom">
          <image :src="ImgLink" class="img-link img-link-left"></image>
          <image :src="ImgLink" class="img-link img-link-right"></image>
          <view class="flex-box flex-space-between">
            <view>
              <image :src="ImgWord" class="img-word"></image>
            </view>
            <view class="circle-box">
              <!-- <button @tap="createQr">二维码</button> -->
              <!-- <canvas :id="canvasId" :canvas-id="canvasId"></canvas> -->
              <image :src="ImgGh" @tap="previewImage"></image>
            </view>
          </view>
        </view>
      </view>
      <view class="text-center">
        <image :src="IconGood" class="icon-good"></image>
        <text>宝贝的进步需要鼓励</text>
      </view>
      <!-- 底部按钮 -->
      <view class="bottom-box">
        <view class="flex-box">
          <button open-type="share" class="share-friend share-btn"></button>
          <button
            class="share-friend-circle share-btn"
            @tap="shareFriendCircle"
          ></button>
        </view>
      </view>
    </view>
    <!-- </view> -->

    <!-- 绘制海报  v-if="openStatus" -->
    <canvas
      :canvas-id="myCanvas"
      class="canvas-index"
      :style="{
        width: canvasWidths + 'px',
        height: canvasHeights + 'px',
        position: 'fixed',
        top: canvasTops + 'px'
      }"
    ></canvas>
  </view>
  <!-- </view> -->
</template>

<script>
import Taro, { openSetting } from "@tarojs/taro";
import "./index.scss";
import { mapGetters } from "vuex";
// import BackBtn from "../../image/back-btn.png";
import ImgBackGround from "../../image/img_background@2x.png";
import ImgColour from "../../image/img_colour@2x.png";
import ImgLink from "../../image/img_link@2x.png";
import ImgWord from "../../image/img_word@2x.png";
import IconGood from "../../image/ico_good@2x.png";
import BtnShareFriend from "../../image/btn_sharefriend@2x.png";
import BtnFriendCircle from "../../image/btn_friendcircle@2x.png";
import QR from "wxmp-qrcode";
import ImgBackGroundCard from "../../image/img_background@2x_card.png";
import ImgGh from "../../image/gh.jpg";
export default {
  data() {
    return {
      top: 20,
      ImgBackGround,
      ImgColour,
      ImgLink,
      ImgWord,
      IconGood,
      BtnShareFriend,
      BtnFriendCircle,
      canvasId: "canvasId",
      QRdata: "二维码",
      tempFilePath: "",
      canvasWidths: 0,
      canvasHeights: 0,
      canvasTops: 0,
      systemInfoSync: {},
      avatarUrl: "",
      canvasToTempFilePath: "",
      openStatus: false,
      myCanvas: "myCanvas",
      ImgGh
    };
  },
  onLoad() {
    this.getSystemInfo();
  },
  onReady() {
    this.createQr();
    let $this = this;
    Taro.getImageInfo({
      src: this.currentUser.avatarUrl,
      success(res) {
        console.log(res.width);
        console.log("path", res.path);
        $this.avatarUrl = res.path;
      }
    });
  },
  onShareAppMessage(res) {
    console.log("res", res);
    console.log(this.getNavBarHeight);
    // return {
    //   title: "自定义分享按钮",
    //   path: `/pages/index/index`,
    //   imageUrl: ""
    // };
  },
  methods: {
    getSystemInfo: function() {
      let $this = this;
      Taro.getStorage({
        key: "systemInfoSync",
        success: function(res) {
          $this.systemInfoSync = { ...res.data };
          $this.canvasWidths =
            $this.systemInfoSync.screenWidth * $this.systemInfoSync.pixelRatio;
          $this.canvasHeights =
            $this.systemInfoSync.screenHeight * $this.systemInfoSync.pixelRatio;
          $this.canvasTops = -$this.canvasHeights;
        }
      });
    },
    navigatorBack() {
      console.log("back");
      Taro.navigateBack();
    },
    createQr() {
      let canvasId = this.canvasId;
      let QRdata = this.QRdata;
      QR.draw(QRdata, canvasId, () => {
        this.canvasToTempImage(canvasId);
      });
    },
    canvasToTempImage(canvasId) {
      Taro.canvasToTempFilePath({
        canvasId,
        success: function(res) {
          let tempFilePath = res.tempFilePath; // 临时图片地址，可在放入图片src中使用
          this.tempFilePath = tempFilePath;
          console.log("tempFilePath", this.tempFilePath);
        }
      });
    },
    shareFriendCircle() {
      console.log("sfsdf");
      // let openStatus = false;
      // if (!this.openStatus) {
      let promise = new Promise(function(resolve) {
        Taro.getSetting({
          success: function(res) {
            console.log(res);
            if (!res.authSetting["scope.writePhotosAlbum"]) {
              Taro.authorize({
                scope: "scope.writePhotosAlbum",
                success: function() {
                  console.log("drawImage1");
                  // openStatus = true;
                  resolve(true);
                },
                fail: function() {
                  Taro.showToast({
                    title: "未开启相册权限，请前往右上角-设置功能处开启",
                    icon: "none"
                  });
                  resolve(false);
                }
              });
            } else {
              console.log("drawImage2");
              // openStatus = true;
              resolve(true);
            }
          }
        });
      });

      promise.then(res => {
        console.log("promiseRes", res);
        if (res) {
          this.drawImages();
        }
      });
    },
    drawImages() {
      console.log("fsdfds");
      console.log("avatarUrl", this.avatarUrl);
      this.openStatus = true;
      //开始绘制海报
      const ctx = Taro.createCanvasContext(this.myCanvas);
      ctx.setTextAlign("center"); //文字水平居中
      ctx.setFontSize(24);
      // ctx.setLineWidth(10);
      // ctx.setStrokeStyle('#d12');
      // img_background@2x.png  //2倍图 canvas为2倍图
      ctx.drawImage(ImgBackGround, 0, 0, this.canvasWidths, this.canvasHeights);
      let avatarurl_width = 89 * this.systemInfoSync.pixelRatio, //绘制的头像宽度
        avatarurl_heigth = 89 * this.systemInfoSync.pixelRatio, //绘制的头像高度
        avatarurl_x = 143 * this.systemInfoSync.pixelRatio, //绘制的头像在画布上的位置
        avatarurl_y = 83 * this.systemInfoSync.pixelRatio, //绘制的头像在画布上的位置
        text_y = avatarurl_y + avatarurl_heigth + 60,
        half_width_x = this.canvasWidths / 2;
      ctx.save(); // 先保存状态 已便于画完圆再用
      ctx.setFillStyle("#ffffff"); // 文字颜色
      ctx.fillText(this.currentUser.nickName, half_width_x, text_y); // 绘制文字 第二个参数为画布宽度的一半
      ctx.save();
      // 绘制完圆形之后 如若要在此圆形内继续绘制，则需要ctx.clip();
      ctx.beginPath();
      ctx.arc(
        half_width_x,
        avatarurl_heigth / 2 + avatarurl_y + 5 * this.systemInfoSync.pixelRatio,
        avatarurl_width / 2 + 5 * this.systemInfoSync.pixelRatio,
        0,
        Math.PI * 2,
        false
      );
      ctx.setFillStyle("#D7CDFF");
      ctx.fill();
      ctx.clip(); //剪切路径

      ctx.beginPath(); //开始绘制
      //先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
      // avatarurl_width / 2 + avatarurl_x,
      ctx.arc(
        half_width_x,
        avatarurl_heigth / 2 + avatarurl_y + 5 * this.systemInfoSync.pixelRatio,
        avatarurl_width / 2,
        0,
        Math.PI * 2,
        false
      );
      ctx.setFillStyle("#D46678");
      ctx.fill();
      ctx.clip(); //画了圆 再剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
      ctx.drawImage(
        this.avatarUrl,
        half_width_x - avatarurl_width / 2,
        avatarurl_y + 5 * this.systemInfoSync.pixelRatio,
        avatarurl_width,
        avatarurl_heigth
      ); // 推进去图片

      ctx.draw(false, () => {
        console.log("success draw");
        this.openStatus = false;
        Taro.canvasToTempFilePath({
          // x: 0,
          // y: 0,
          // width: this.canvasWidths,
          // height: this.canvasHeights,
          // destHeight: this.canvasHeights,
          // destWidth: this.canvasWidths,
          canvasId: this.myCanvas,
          success: function(res) {
            console.log("canvasToTempFilePath", res);
            this.canvasToTempFilePath = res.tempFilePath;
            Taro.saveImageToPhotosAlbum({
              filePath: this.canvasToTempFilePath,
              success: function() {
                Taro.showToast({
                  title: "图片保存成功，快去分享到朋友圈吧~",
                  icon: "none"
                });
              }
            });
          },
          fail: function(res) {
            console.log("fail", res);
          },
          complete: function() {
            console.log("complete");
          }
        });
      });
    },
    previewImage(e) {
      console.log("e", e);
      var current = e.target.dataset.src;
      Taro.previewImage({
        current: current,
        urls: [current]
      });
    }
  },
  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser",
      getNavBarHeight: "getNavBarHeight"
    })
  }
};
</script>
