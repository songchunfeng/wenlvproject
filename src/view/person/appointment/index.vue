<template>
  <div class="appointment">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <div class="scenicInfo">
        <div class="scenicName">【青海湖景区】二郎剑景区</div>
        <div class="openTime">开放时间：08:00-18:00（最晚入园时间：16:00）</div>
        <div class="scenicAddress">景区地址：海南藏族自治州共和县109国道旁</div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
export default {
  name: "appointment",
  components: {
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem,
  },
  data() {
    return {
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg",
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  .appointment {
      width: 100%;
      background-color: #F9F9F9;
      .scenicInfo {
          width: 100%;
          height: 98px;
          .scenicName {
              
          }
      }
  }
</style>