<template>
  <div class="appointment">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <div class="scenicInfo">
      <div class="scenicName">{{scenic.spotName}}</div>
      <div class="openTime">开放时间：{{scenic.businessHour}}</div>
      <div class="scenicAddress">景区地址：{{scenic.spotAddress}}</div>
    </div>
    <div class="dateChose">
      <dateChose :dateTime="dateTime" @checkDay="checkDay"></dateChose>
    </div>
    <div class="travelInfoBox">
      <div class="travelInfoTitle">
        <div class="line"></div>
        <div class="titleName">出行信息</div>
        <div class="numberMax">(最多填写5个出行人)</div>
      </div>
      <div class="travelInfoTime">
        <div class="appTime">
          <div class="appTimeLable">预约时间：</div>
          <div class="appTimeCon">{{checkTime}}</div>
        </div>
        <div class="checkTime">
          <div class="checkTimeLable">验票时间：</div>
          <div class="checkTimeCon">{{checkTime}}</div>
        </div>
        <div class="travelPeo">
          <div class="travelPeoLable">出行人：</div>
          <div class="travelPeoCon">张三、张三、张三、张三、张三</div>
        </div>
        <div class="checkPeoBox">
          <div class="comPeo" @click="comPopShow = true">添加常用出行人</div>
          <div class="line"></div>
          <div class="addPeo">新增出行人</div>
        </div>
      </div>
    </div>
    <van-popup v-model="comPopShow" :style="{ height: '50%', width: '60%'}">
      <commonPeo></commonPeo>
    </van-popup>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Popup } from "vant";
import dateChose from "../../../util/dateChose";
import commonPeo from "./commonPeo";
export default {
  name: "appointment",
  components: {
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem,
    "van-popup": Popup,
    dateChose,
    commonPeo,
  },
  data() {
    return {
      images: [],
      dateTime: {},
      comPopShow: false,
      scenic: {},
      checkTime: "",
    };
  },
  created() {
    this.scenicInfo();
  },
  methods: {
    scenicInfo() {
      let id = window.sessionStorage.getItem('scenicId')
      this.$axios({
        url:`/api/spot/get/${id}`,
        method:'get',
      }).then(res => {
        console.log(res);
        this.scenic = res.data.rows
        this.getTime();
      }).catch(err => {
        console.log(err);
      })
    },
    getTime() {
      let id = window.sessionStorage.getItem('scenicId')
      this.$axios({
        url: "/api/spot-stock/bigupdateById",
        method: "put",
        data: {
          spotId: id,
          startTime: this.$commonUtils.changeFullTime(new Date()),
        },
      })
        .then((res) => {
          this.dateTime = res.data.rows;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 选择日期
    checkDay(day) {
      this.checkTime = day;
    },
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
  background-color: #f9f9f9;
  .scenicInfo {
    width: 100%;
    height: 98px;
    padding: 10px;
    background-color: #fff;
    box-sizing: border-box;
    .scenicName {
      font-size: 15px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #333333;
      line-height: 20px;
    }
    .openTime {
      margin-top: 12px;
      font-size: 12px;
      font-family: MicrosoftYaHei;
      color: #666666;
      line-height: 16px;
    }
    .scenicAddress {
      margin-top: 7px;
      font-size: 12px;
      font-family: MicrosoftYaHei;
      color: #666666;
      line-height: 16px;
    }
  }
  .dateChose {
    margin-top: 10px;
    width: 100%;
    height: 140px;
    background: #ffffff;
    padding: 15px 10px 15px 10px;
    box-sizing: border-box;
  }
  .travelInfoBox {
    width: 100%;
    background-color: #fff;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    .travelInfoTitle {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 15px 0px 15px 10px;
      box-sizing: border-box;
      border-bottom: 1px solid #eeeeee;
      .line {
        width: 4px;
        height: 16px;
        background: #3983e5;
        border-radius: 3px;
        margin-right: 8px;
      }
      .titleName {
        font-size: 15px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #333333;
        line-height: 20px;
        letter-spacing: 1px;
        margin-right: 8px;
      }
      .numberMax {
        font-size: 13px;
        font-family: MicrosoftYaHei;
        color: #999999;
        line-height: 18px;
        letter-spacing: 1px;
      }
    }
    .travelInfoTime {
      width: 355px;
      height: 175px;
      background: #f8f8f8;
      border-radius: 5px;
      margin-top: 15px;
      padding: 8px 10px 8px 10px;
      box-sizing: border-box;
      .appTime {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .appTimeLable {
          font-size: 15px;
          font-family: MicrosoftYaHei;
          color: #333333;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .appTimeCon {
          font-size: 15px;
          font-family: MicrosoftYaHei;
          color: #999999;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .checkTime {
        margin-top: 9px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .checkTimeLable {
          font-size: 15px;
          font-family: MicrosoftYaHei;
          color: #333333;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .checkTimeCon {
          font-size: 15px;
          font-family: MicrosoftYaHei;
          color: #999999;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .travelPeo {
        margin-top: 9px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .travelPeoLable {
          font-size: 15px;
          font-family: MicrosoftYaHei;
          color: #333333;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .travelPeoCon {
          font-size: 15px;
          font-family: MicrosoftYaHei;
          color: #999999;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .checkPeoBox {
        width: 100%;
        border-top: 1px solid #eeeeee;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 5px;
        box-sizing: border-box;
        margin-top: 10px;
        .comPeo {
          font-size: 15px;
          font-family: MicrosoftYaHei;
          color: #3983e5;
          line-height: 20px;
          letter-spacing: 1px;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 0.02667rem;
        }
        .line {
          width: 1px;
          height: 28px;
          background: #eeeeee;
        }
        .addPeo {
          font-size: 15px;
          font-family: MicrosoftYaHei;
          color: #3983e5;
          line-height: 20px;
          letter-spacing: 1px;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 0.02667rem;
        }
      }
    }
  }
}
</style>