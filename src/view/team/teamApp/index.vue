<template>
  <div class="appointment">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item style="height: 163px;" v-for="(image, index) in images" :key="index">
        <img style="height: 163px;" :src="image" alt />
      </van-swipe-item>
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
        <div class="titleName">
          出行信息
          <span class="numberMax">(团队预约中的每张门票均需如实填写出行信息)</span>
        </div>
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
          <div class="travelPeoLable">旅行团名称：</div>
          <van-field v-model="teamName" placeholder="请输入旅行团名称" />
        </div>
      </div>
      <div class="teamLine"></div>
      <div class="appTitleBox">
        <span class="appLable">出行人</span>
        <span class="hint">(团队预约需下载附件模板，依照如下格式，标准填写全部出行人信息（含导游个人信息），并操作导入进行登记。)</span>
      </div>
      <div class="teamLine"></div>
      <div class="appTable">
        <van-row class="titleRow" type="flex" justify="space-around">
          <van-col class="titleCol" span="2">姓名</van-col>
          <van-col style="width: 107%;" class="titleCol" span="7">联系电话</van-col>
          <van-col class="titleCol" span="5">有效证件</van-col>
          <van-col class="titleCol" span="5">证件号码</van-col>
          <van-col class="titleCol" span="5">预约票种</van-col>
        </van-row>
        <van-row class="row" type="flex" justify="space-around">
          <van-col class="col" span="4">张三</van-col>
          <van-col style="width: 107%;" class="col" span="5">176xxxx1111</van-col>
          <van-col class="col" span="5">身份证</van-col>
          <van-col class="col" span="5">18位数字</van-col>
          <van-col class="col" span="5">普通票</van-col>
        </van-row>
        <van-row class="row" type="flex" justify="space-around">
          <van-col class="col" span="4">李四</van-col>
          <van-col style="width: 107%;" class="col" span="5">189xxxx1234</van-col>
          <van-col class="col" span="5">护照</van-col>
          <van-col class="col" span="5">E+8</van-col>
          <van-col class="col" span="5">特殊票</van-col>
        </van-row>
      </div>
      <div class="btnBox">
        <a
          class="download"
          href="https://test-qinghai-tour-1254292961.cos.ap-beijing.myqcloud.com/tuanduimoban/%E5%9B%A2%E9%98%9F%E9%A2%84%E7%BA%A6%E5%87%BA%E8%A1%8C%E4%BA%BA%E4%BF%A1%E6%81%AF%E6%A8%A1%E6%9D%BF.xls"
        >附件下载</a>
        <van-uploader :after-read="afterRead" accept=".xls, .xlsx">
          <div class="uploaderBox">
            <div class="uploaderIMG">
              <img src="../../../assets/images/添加.png" alt />
            </div>
            <div class="uploaderText">导入信息文件</div>
          </div>
        </van-uploader>
      </div>
    </div>
    <div class="takeTicket">
      <span class="takeTitle">取票信息</span>
      <span class="hint">(需预留导游的信息，用于预约成功的信息发送至导游手机，导游务必保管好该条短信，至景区后需出示该短信进行订单查询及确认。)</span>
    </div>
    <takeTicket
      :checkBySelfs="doSelfCheck"
      @reportErrorMessage="getErrorMessage"
      @getFormData="getTicketFormDate"
    ></takeTicket>
    <div class="bottomBox">
      <van-checkbox icon-size="14px" v-model="checked">
        <div class="readAgree" @click="readShow = true">我已认真阅读提示信息及注意事项，知晓并同意平台及景区相关规定。</div>
      </van-checkbox>
      <div class="confirm" @click="submit">预约</div>
    </div>
    <van-popup
      :safe-area-inset-bottom="true"
      :overlay="false"
      v-model="readShow"
      :style="{ height: '100%', width: '100%'}"
    >
      <read @close="closeRead"></read>
    </van-popup>
  </div>
</template>

<script>
import {
  Swipe,
  SwipeItem,
  Popup,
  Toast,
  Dialog,
  Checkbox,
  Field,
  Col,
  Row,
  Uploader,
} from "vant";
import dateChose from "../../../util/dateChose";
import read from "../../person/home/readText";
import takeTicket from "../../takeTicket";
export default {
  name: "teamApp",
  components: {
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem,
    "van-popup": Popup,
    "van-checkbox": Checkbox,
    "van-row": Row,
    "van-col": Col,
    "van-field": Field,
    "van-uploader": Uploader,
    [Dialog.Component.name]: Dialog.Component,
    dateChose,
    takeTicket,
    read,
  },
  data() {
    return {
      images: [],
      dateTime: {},
      scenic: {},
      checkTime: "",
      teamName: "", // 团队名
      travelUserVo: [],
      readShow: false,
      checked: false, // 阅读须知
      reserveVo: {}, // 取票人信息
      doSelfCheck: false, // 触发自检
      isChangedAll: true, // 是否有错误项
    };
  },
  created() {
    this.getImg();
    this.scenicInfo();
  },
  methods: {
    // 上传文件
    afterRead(file) {
      var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
      formData.append("file", file.file); //接口需要传的参数
      this.$axios
        .post("/api/travelers/import", formData)
        .then((res) => {
          if (res.code == 20000) {
            Toast.success("上传成功");
            this.travelUserVo = res.data.rows.peopleList;
          } else {
            Toast.fail("上传失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    closeRead() {
      this.readShow = false;
    },
    // 提交
    submit() {
      if (window.sessionStorage.getItem("token")) {
        if (this.checked) {
          if (this.checkTime) {
            if (this.teamName != "") {
              if (this.travelUserVo.length > 0) {
                this.doSelfCheck = true;
                let that = this;
                setTimeout(function () {
                  if (that.isChangedAll) {
                    let params = {
                      identity_card: that.reserveVo.identity_card,
                      identity_type: that.reserveVo.identity_type,
                      name: that.reserveVo.name,
                      telphone: that.reserveVo.telphone,
                      spotid: window.sessionStorage.getItem("scenicId"),
                      tour_time_info: that.checkTime,
                      travelUserVo: that.travelUserVo,
                      teamName:that.teamName
                    };
                    that.toSave(params);
                  } else {
                    Toast.fail("请完善预约信息");
                  }
                }, 100);
              } else {
                Toast.fail("请添加出行人");
              }
            } else {
              Toast.fail("请填写旅行团名称");
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
        message: "信息提交中。。。",
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
          if (res.code == "20000") {
            Toast.clear();
            Dialog.confirm({
              title: "提交成功",
              message: "请前往用户中心—我的预约查看",
            })
              .then(() => {
                this.$router.push("/teamList");
              })
              .catch(() => {
                // on cancel
              });
          } else {
            Toast.clear();
            Toast.fail({
              message: res.message,
            });
          }
        })
        .catch((err) => {
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

    // 获取取票人信息
    getTicketFormDate(obj) {
      this.isChangedAll = true;
      this.doSelfCheck = false;
      this.reserveVo = obj;
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
  padding-bottom: 50px;
  box-sizing: border-box;
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
    padding-bottom: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    .travelInfoTitle {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 15px 0px 15px 21px;
      box-sizing: border-box;
      border-bottom: 1px solid #eeeeee;
      .titleName {
        // width: 69px;
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
        font-weight: 400;
        font-size: 13px;
        font-family: MicrosoftYaHei;
        color: #999999;
        line-height: 18px;
        letter-spacing: 1px;
      }
    }
    .travelInfoTime {
      width: 355px;
      background: #f8f8f8;
      border-radius: 5px;
      margin-top: 15px;
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
        margin-top: 10px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .travelPeoLable {
          width: 140px;
          font-size: 15px;
          font-family: MicrosoftYaHei;
          color: #333333;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        .van-cell {
          margin-top: 2px;
          background-color: #f8f8f8;
          padding: 0px;
        }
        /deep/ .van-field__control {
          color: #999999;
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
    .teamLine {
      margin-top: 18px;
      margin-bottom: 15px;
      width: 95%;
      height: 1px;
      background: #eeeeee;
    }
    .appTitleBox {
      width: 100%;
      padding-left: 10px;
      padding-right: 10px;
      box-sizing: border-box;
      .appLable {
        font-size: 15px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #333333;
        line-height: 20px;
        letter-spacing: 1px;
      }
      .hint {
        font-size: 13px;
        font-family: MicrosoftYaHei;
        color: #999999;
        line-height: 19px;
        letter-spacing: 1px;
      }
    }
    .appTable {
      width: 100%;
      padding-left: 10px;
      padding-right: 10px;
      box-sizing: border-box;
      .titleRow {
        height: 40px;
        background-color: #ecf0f6;
        border-top: 1px solid #e0e0e0;
        border-right: 1px solid #e0e0e0;
        font-size: 10px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #333333;
        line-height: 13px;
      }
      .titleCol {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
      }
      .row {
        height: 40px;
        border-right: 1px solid #e0e0e0;
        font-size: 10px;
        font-family: MicrosoftYaHei;
        color: #333333;
        line-height: 13px;
      }
      .col {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
      }
    }
    .btnBox {
      margin-top: 13px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 10px;
      box-sizing: border-box;
      .download {
        width: 88px;
        height: 30px;
        background: #3983e5;
        border-radius: 24px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #ffffff;
        line-height: 19px;
        letter-spacing: 1px;
        margin-right: 12px;
      }
      .uploaderBox {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 133px;
        height: 30px;
        border-radius: 24px;
        border: 1px solid #3983e5;
        .uploaderIMG {
          width: 12px;
          height: 12px;
          margin-right: 6px;
          img {
            width: 100%;
            height: 100%;
            vertical-align: top;
          }
        }
        .uploaderText {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #3983e5;
          line-height: 19px;
          letter-spacing: 1px;
        }
      }
    }
  }
  .takeTicket {
    background-color: #fff;
    width: 100%;
    margin-top: 10px;
    border-bottom: 1px solid #eeeeee;
    padding: 10px 10px 10px 21px;
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