<template>
  <div class="appointment">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img style="width: 100%" :src="image" alt />
      </van-swipe-item>
    </van-swipe>
    <div class="scenicInfo">
      <div class="scenicName">{{ scenic.spotName }}</div>
      <div class="openTime">
        开放时间：{{ scenic.businessHour }} (最晚入园时间：{{
          scenic.latestTime
        }})
      </div>
      <div class="scenicAddress">景区地址：{{ scenic.spotAddress }}</div>
    </div>
    <div class="dateChose">
      <dateChose :dateTime="dateTime" @checkDay="checkDay"></dateChose>
    </div>
    <div class="travelInfoBox">
      <div class="travelInfoTitle">
        <div class="titleName">
          出行信息
          <span class="numberMax"
            >(同一用户同一预约日期限购1份，每单最多可预约5张门票)</span
          >
        </div>
        <!-- <div class="numberMax">(同一用户同一预约日期限购1份，每单最多可预约5张门票)</div> -->
      </div>
      <div class="travelInfoTime">
        <div class="appTime">
          <div class="appTimeLable">预约时间：</div>
          <div class="appTimeCon">{{ checkTime }}</div>
        </div>
        <div class="checkTime">
          <div class="checkTimeLable">验票时间：</div>
          <div class="checkTimeCon" v-if="checkTime == ''"></div>
          <div class="checkTimeCon" v-if="checkTime != ''">
            {{ checkTiTime(checkTime) }}
          </div>
        </div>
        <div class="travelPeo">
          <div class="travelPeoLable">出行人：</div>
          <div class="travelPeoCon">{{ comPeoName }}</div>
          <!-- <div class="travelPeoCon">张三、张三、张三、张三、张三、张三、张三</div> -->
        </div>
        <div class="checkPeoBox">
          <div class="comPeo" @click="checkComPeoShow">添加常用出行人</div>
          <div class="line"></div>
          <div class="addPeo" @click="addTravelPeo">新增出行人</div>
        </div>
      </div>

      <div
        class="travelPeoList"
        v-for="(item, index) in addPeo"
        :key="item.key"
      >
        <addPeo
          ref="addChild"
          :index="index"
          :checkBySelfs="doSelfCheck"
          @reportErrorMessage="getErrorMessage"
          @deleteItem="deleteItem"
          @getFormData="getUserFormDate"
        />
      </div>
    </div>
    <div class="takeBox">
      <div class="travelInfoTitle">
        <div class="titleName">
          取票信息
          <span class="numberMax"
            >(需预留1位出行人的信息，用于现场兑换门票)</span
          >
        </div>
        <!-- <div class="numberMax">(同一用户同一预约日期限购1份，每单最多可预约5张门票)</div> -->
      </div>
      <takeTicket
        :checkBySelfs="doSelfCheck"
        @reportErrorMessage="getErrorMessage"
        @getFormData="getTicketFormDate"
      ></takeTicket>
    </div>

    <div class="bottomBox">
      <van-checkbox icon-size="14px" v-model="checked">
        <div class="readAgree" @click="readShow = true">
          我已认真阅读提示信息及注意事项，知晓并同意平台及景区相关规定。
        </div>
      </van-checkbox>
      <div class="confirm" @click="submit">预约</div>
    </div>
    <van-popup
      position="bottom"
      v-model="comPopShow"
      :style="{ width: '100%' }"
    >
      <commonPeo
        :addPeo="addPeo"
        :comPeoList="comPeoList"
        @close="closeCommonPeo"
        @checkComPeo="checkComPeo"
      ></commonPeo>
    </van-popup>
    <van-popup
      :safe-area-inset-bottom="true"
      :overlay="false"
      v-model="readShow"
      :style="{ height: '100%', width: '100%' }"
    >
      <read class="read" @close="closeRead"></read>
    </van-popup>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Popup, Toast, Dialog, Checkbox } from "vant";
import dateChose from "../../../util/dateChose";
import commonPeo from "./commonPeo";
import addPeo from "./addPeo";
import read from "../home/readText";
import takeTicket from "../../takeTicket";
export default {
  name: "appointment",
  components: {
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem,
    "van-popup": Popup,
    "van-checkbox": Checkbox,
    [Dialog.Component.name]: Dialog.Component,
    dateChose,
    commonPeo,
    addPeo,
    takeTicket,
    read,
  },
  watch: {
    addPeo: {
      handler: function (newVal, oldVal) {
        if (newVal) {
          let arr = [];
          for (let i = 0; i < newVal.length; i++) {
            if (newVal[i].data.surname != undefined) {
              arr.push(newVal[i].data.surname);
            }
          }
          if (this.comPeo.length != 0) {
            for (let i = 0; i < this.comPeo.length; i++) {
              arr.push(this.comPeo[i].surname);
            }
          }
          this.comPeoName = arr.join("、");
        }
      },
      deep: true,
    },
    comPeo: {
      handler: function (newVal, oldVal) {
        if (newVal) {
          let arr = [];
          for (let i = 0; i < newVal.length; i++) {
            if (newVal[i].surname != undefined) {
              arr.push(newVal[i].surname);
            }
          }
          if (this.addPeo.length != 0) {
            for (let i = 0; i < this.addPeo.length; i++) {
              arr.push(this.addPeo[i].data.surname);
            }
          }
          this.comPeoName = arr.join("、");
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      images: [],
      dateTime: {},
      comPopShow: false,
      scenic: {},
      checkTime: "",
      readShow: false,
      checked: false, // 阅读须知
      comPeoList: [], // 常用出行人列表
      comPeo: [], // 常用出行人
      addPeo: [], // 新增出行人
      reserveVo: {}, // 取票人信息
      comPeoName: "",
      doSelfCheck: false, // 触发自检
      isChangedAll: true, // 是否有错误项
      tcmAts: "",
    };
  },
  created() {
    this.getImg();
    this.scenicInfo();
    this.getComPeoList();
  },
  methods: {
    //验票时间
    checkTiTime(val) {
      let arr = val.split(" ");
      let str = arr[1];
      let content = arr[0];
      if (str == "上午") {
        this.tcmAts = content + " " + this.scenic.amTcmAts;
        return content + " " + this.scenic.amTcmAts;
      } else {
        this.tcmAts = content + " " + this.scenic.amTcmAts;
        return content + " " + this.scenic.pmTcmAts;
      }
    },
    closeRead() {
      this.readShow = false;
    },
    // 提交
    submit() {
      if (window.sessionStorage.getItem("token")) {
        if (this.checked) {
          if (this.checkTime) {
            if (this.comPeo.length + this.addPeo.length > 0) {
              let checkConfirm = false;
              if (this.$refs.addChild) {
                for (let i = 0; i < this.$refs.addChild.length; i++) {
                  if (this.$refs.addChild[i].editShow) {
                    checkConfirm = true;
                  }
                }
              }

              if (checkConfirm) {
                Dialog({ message: "请确认出行人信息" });
              } else {
                this.doSelfCheck = true;
                let that = this;
                setTimeout(function () {
                  if (that.isChangedAll) {
                    let currentAddPeo = that.addPeo; // 被保人信息，含有key字段
                    let targetAddPeo = []; // 去除key字段的新增的人
                    currentAddPeo.map((item) => {
                      targetAddPeo.push(item.data);
                    });
                    let travelUserVo = [];
                    travelUserVo.push(...targetAddPeo);
                    travelUserVo.push(...that.comPeo);
                    let check = false;
                    for (var i = 0; i < travelUserVo.length - 1; i++) {
                      for (var j = i + 1; j < travelUserVo.length; j++) {
                        if (
                          travelUserVo[i].identityCard ===
                          travelUserVo[j].identityCard
                        ) {
                          check = true;
                        }
                      }
                    }
                    console.log(check);
                    if (check) {
                      Dialog({ message: "请勿重复填写出行人信息" });
                    } else {
                      let params = {
                        identity_card: that.reserveVo.identity_card,
                        identity_type: that.reserveVo.identity_type,
                        name: that.reserveVo.name,
                        telphone: that.reserveVo.telphone,
                        spotid: window.sessionStorage.getItem("scenicId"),
                        tour_time_info: that.checkTime,
                        travelUserVo: travelUserVo,
                        tcmAts: that.tcmAts,
                      };
                      console.log(params);
                      that.toSave(params);
                    }
                  } else {
                    Toast.fail("请完善预约信息");
                  }
                }, 100);
              }
            } else {
              Toast.fail("请添加出行人");
            }
          } else {
            Toast.fail("请选择预约日期");
          }
        } else {
          Toast.fail("请先阅读景区相关规定");
        }
      } else {
        Dialog({ message: "您还未登录请先登录" });
      }
    },
    toSave(params) {
      Toast({
        message: "信息提交中",
        loadingType: "spinner",
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁止点击背景
      });
      this.$axios({
        url: "/api/user-reserve/savereserve",
        method: "post",
        data: params,
        headers: {
          Authorization: window.sessionStorage.getItem("token"),
        },
      })
        .then((res) => {
          console.log("123", res);
          if (res.code == "20000") {
            Toast.clear();
            Dialog.alert({
              title: "提交成功",
              message: "请前往“用户中心-我的预约”查看“预约详情”",
            }).then(() => {
              this.$router.push("/preList");
            });
          } else {
            Toast.clear();
            Dialog({ message: res.message });
          }
        })
        .catch((err) => {
          Toast.clear();
          console.log(err);
        });
    },
    getErrorMessage() {
      this.isChangedAll = false;
    },
    // 获取轮播图
    getImg() {
      let id = window.sessionStorage.getItem("scenicId");

      this.$axios({
        url: "/api/spot/getapppicture",
        method: "get",
        params: {
          spotid: id,
        },
      })
        .then((res) => {
          let arr = res.data.rows;
          arr.map((item) => {
            this.images.push(item.app_urls);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取出行人信息
    getUserFormDate(obj) {
      this.isChangedAll = true;
      this.doSelfCheck = false;
      this.addPeo[obj.index].data = obj.formData;
    },
    // 获取取票人信息
    getTicketFormDate(obj) {
      this.isChangedAll = true;
      this.doSelfCheck = false;
      this.reserveVo = obj;
    },
    // 关闭常用出行人
    closeCommonPeo() {
      this.comPopShow = false;
    },
    // 选择常用出行人
    checkComPeo(arr) {
      this.comPeo = arr;
      // let brr = [];
      // for (let i = 0; i < arr.length; i++) {
      //   brr.push(arr[i].surname);
      // }
      // this.comPeoName = brr.join("、");
      this.comPopShow = false;
    },
    // 打开常用出行人
    checkComPeoShow() {
      if (window.sessionStorage.getItem("token")) {
        if (this.comPeoList.length === 0) {
          Dialog({ message: "您还未添加常用出行人" });
        } else {
          this.comPopShow = true;
        }
      } else {
        Dialog({ message: "您还未登录请先登录" });
      }
    },
    // 新增出行人
    addTravelPeo() {
      this.doSelfCheck = false;
      if (this.addPeo.length + this.comPeo.length == 5) {
        Dialog({ message: "最多填写5个出行人" });
      } else {
        let obj = {
          key: new Date().getTime(),
          data: {},
        };
        this.addPeo.push(obj);
      }
    },
    // 删除出行人
    deleteItem(index) {
      this.isChangedAll = true;
      this.addPeo = this.addPeo.filter(function (item, i) {
        return i != index;
      });
    },
    scenicInfo() {
      let id = window.sessionStorage.getItem("scenicId");
      this.$axios({
        url: `/api/spot/get/${id}`,
        method: "get",
      })
        .then((res) => {
          this.scenic = res.data.rows;
          this.getTime();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTime() {
      let id = window.sessionStorage.getItem("scenicId");
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
    // 获取常用人列表
    getComPeoList() {
      if (window.sessionStorage.getItem("token")) {
        this.$axios({
          url: "/api/user-identity-info/getuserinfo",
          method: "get",
          headers: {
            Authorization: window.sessionStorage.getItem("token"),
          },
        })
          .then((res) => {
            if (!res.data.rows) {
              this.comPeoList = [];
            } else {
              this.comPeoList = res.data.rows;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 选择日期
    checkDay(day) {
      this.checkTime = day;
    },
  },
};
</script>

<style lang="less" scoped>
.appointment {
  width: 100%;
  background-color: #f9f9f9;
  padding-bottom: 80px;
  box-sizing: border-box;
  /deep/ .van-nav-bar--fixed {
    margin-top: 10px;
    top: 10px;
  }
  .van-swipe {
    background-color: #fff;
  }
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
  .travelInfoTitle {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 15px 0px 15px 21px;
    box-sizing: border-box;
    border-bottom: 1px solid #eeeeee;
    .titleName {
      font-size: 15px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #333333;
      line-height: 20px;
      letter-spacing: 1px;
      margin-right: 8px;
      position: relative;
      &::after {
        content: "";
        width: 4px;
        height: 16px;
        background: #3983e5;
        border-radius: 3px;
        position: absolute;
        left: -11px;
        top: 2px;
      }
    }
    .numberMax {
      font-size: 13px;
      font-family: MicrosoftYaHei;
      color: #999999;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 1px;
    }
  }
  .travelInfoBox {
    width: 100%;
    background-color: #fff;
    margin-top: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .travelInfoTime {
      width: 355px;
      min-height: 175px;
      background: #f8f8f8;
      border-radius: 5px;
      margin-top: 15px;
      margin-bottom: 15px;
      padding: 15px 10px 15px 10px;
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
        margin-top: 15px;
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
        margin-top: 15px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .travelPeoLable {
          min-width: 70px;
          font-size: 15px;
          font-family: MicrosoftYaHei;
          color: #333333;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        .travelPeoCon {
          font-size: 15px;
          font-family: MicrosoftYaHei;
          color: #999999;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
      }
      .checkPeoBox {
        width: 100%;
        border-top: 1px solid #eeeeee;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 12px;
        box-sizing: border-box;
        margin-top: 15px;
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
    .travelPeoList {
      width: 100%;
      margin-top: 10px;
    }
  }
  .takeBox {
    width: 100%;
    margin-top: 10px;
    background-color: #fff;
  }
  .takeTicketBox {
    background-color: #fff;
    width: 100%;
    // margin-top: 10px;
    border-bottom: 1px solid #eeeeee;
    // padding: 10px 10px 10px 21px;
    box-sizing: border-box;
    .takeTitle {
      font-size: 15px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #333333;
      line-height: 20px;
      letter-spacing: 1px;
      position: relative;
      &::after {
        content: "";
        width: 4px;
        height: 16px;
        background: #3983e5;
        border-radius: 3px;
        position: absolute;
        left: -11px;
        top: 2px;
      }
    }
    .hint {
      font-size: 13px;
      font-family: MicrosoftYaHei;
      color: #999999;
      line-height: 19px;
      letter-spacing: 1px;
    }
  }
  .bottomBox {
    margin-top: 10px;
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    .readAgree {
      // width: 93%;
      font-size: 13px;
      font-family: MicrosoftYaHei;
      color: #3983e5;
      line-height: 19px;
      letter-spacing: 1px;
    }
    .confirm {
      margin-top: 18px;
      width: 355px;
      height: 44px;
      background: #3983e5;
      border-radius: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 23px;
      letter-spacing: 1px;
    }
  }
}
</style>
