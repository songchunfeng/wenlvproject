<template>
  <div class="dateChoseBox">
    <van-row class="week" type="flex" justify="space-around">
      <van-col></van-col>
      <van-col class="text" v-for="(item,index) in dateTime.week" :key="index">{{item}}</van-col>
    </van-row>
    <van-row type="flex" justify="space-between">
      <van-col class="morning-aftermoon">
        <div class="time morning">
          <span>上</span>
          <span>午</span>
        </div>
        <div class="time">
          <span>下</span>
          <span>午</span>
        </div>
      </van-col>
      <van-col>
        <van-row  class="day" type="flex" justify="space-between">
          <van-col  v-for="(item,index) in dateTime.dayAm" :key="index+'a'">
            <div v-if="item.state == 0" :class="checkIndex == (index+'a')?'check':'dateItem' " @click="check((index+'a'),item.day)">
              <div class="date">{{getDate(item.day)}}</div>
              <div class="status">可预约</div>
            </div>
            <div v-else class="uncheck">
              <div class="date">{{getDate(item.day)}}</div>
              <div class="status">不可预约</div>
            </div>
          </van-col>
        </van-row>
        <van-row class="day" type="flex" justify="space-between">
          <van-col v-for="(item,index) in dateTime.dayPm" :key="index+'p'">
            <div v-if="item.state == 0" :class="checkIndex == (index+'p')?'check':'dateItem' " @click="check((index+'p'),item.day)">
              <div class="date">{{getDate(item.day)}}</div>
              <div class="status">可预约</div>
            </div>
            <div v-else class="uncheck">
              <div class="date">{{getDate(item.day)}}</div>
              <div class="status">不可预约</div>
            </div>
          </van-col>
        </van-row>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { Col, Row } from "vant";
export default {
  name: "dateChose",
  components: {
    "van-row": Row,
    "van-col": Col,
  },
  props: ["dateTime"],
  data() {
    return {
      checkIndex:''
    }
  },
  methods: {
    getDate(date) {
      let str = date.split(" ")[0].split("-");
      let arr = [str[1], str[2]];
      let day = arr.join("/");
      return day;
    },
    check(index,day){
      this.checkIndex = index
      this.$emit('checkDay',day)
    }
  },
  created() {},
};
</script>

<style lang="less" scoped>
.dateChoseBox {
  width: 100%;
  .text {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .week {
    height: 22px;
    background: #ecf0f6;
    font-size: 8px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: #333333;
    line-height: 11px;
    margin-bottom: 4px;
  }
  .morning-aftermoon {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 16px;
    height: 84px;
    background: #ecf0f6;
    padding: 8px 0;
    margin-right: 3px;
    box-sizing: border-box;
    .time {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      font-size: 8px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #333333;
      // line-height: 11px;
    }
    .morning {
      margin-bottom: 5px;
    }
  }
  .day {
    height: 42px;
    width: 339px;
    .time {
      width: 9px;
      height: 21px;
      // letter-spacing:2px;
      background: #ecf0f6;
      font-size: 6px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #333333;
      line-height: 11px;
      span {
        width: 9px;
      }
    }
    .uncheck {
      width: 44px;
      height: 40px;
      background: #f7f7f7;
      border-radius: 2px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      .date {
        font-size: 8px;
        font-family: MicrosoftYaHei;
        color: #999999;
        line-height: 11px;
      }
      .status {
        font-size: 9px;
        font-family: MicrosoftYaHei;
        color: #999999;
        line-height: 12px;
      }
    }
    .check {
      width: 44px;
      height: 40px;
      background: #3983e5;
      border-radius: 2px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      .date {
        font-size: 8px;
        font-family: MicrosoftYaHei;
        color: #ffffff;
        line-height: 11px;
      }
      .status {
        font-size: 9px;
        font-family: MicrosoftYaHei;
        color: #ffffff;
        line-height: 12px;
      }
    }
    .dateItem {
      width: 44px;
      height: 40px;
      background: #f3f8ff;
      border-radius: 2px;
      border: 1px solid #95c3ff;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      .date {
        font-size: 8px;
        font-family: MicrosoftYaHei;
        color: #666666;
        line-height: 11px;
      }
      .status {
        font-size: 9px;
        font-family: MicrosoftYaHei;
        color: #3983e5;
        line-height: 12px;
      }
    }
  }
}
</style>