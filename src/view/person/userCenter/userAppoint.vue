<!--个人预约-->
<template>
  <div class="userAppoint">
    <div class="chooseStatus" id="chooseStatus">
      <div @click="changeIcon" :class="show ? 'fsActive' : ''">
        {{nowStatus}}
        <i class="i_img" v-show="!show"></i>
        <i class="i_imgActive" v-show="show"></i>
      </div>
      <div class="statusList" v-show="show">
        <DropMenu @getStatus="getStatus"></DropMenu>
      </div>
    </div>
    <div class="main">
      <div class="msgnull" v-if="showVanList">您还没有预约信息</div>
      <div class="content" v-if="!showVanList">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="true"
          finished-text="没有更多了"
          @load="getList"
        >
          <div
            v-for="(item,index) in list"
            :key="index"
            style="background-color: #fff;margin-bottom: 10px"
          >
            <div class="listHead">
              <span>{{item.spotName}}</span>
              <span>{{getTicket(item.ticket)}}</span>
            </div>
            <div class="headContent">
              <van-cell title="订单编号:" :value="item.id" />
              <van-cell title="创建时间:" :value="item.gmtCreate" />
              <van-cell title="预约时间:" :value="item.tourTimeInfo" />
              <van-cell title="验票时间:" :value="item.tcmAts" />
              <van-cell title="预约凭证:" :value="item.voucher" />
              <van-cell title="联系人:" :value="item.linkName" />
              <van-cell title="联系电话:" :value="item.telphone" />
              <van-cell title="证件号码:" :value="item.identityCard" />
              <van-cell title="普通票:" :value="item.ordinaryNum+'张'" />
              <van-cell title="特殊票:" :value="item.specialNum+'张'" />
            </div>
            <div class="person" v-show="showpersonList && i==index">
              <div v-for="(ite,ind) in personList" :key="ind">
                <div class="listHeadPerson">
                  <span>出行人{{ind+1}}</span>
                </div>
                <van-cell title="姓名:" :value="ite.surname" />
                <van-cell title="联系电话:" :value="ite.telphone" />
                <van-cell title="证件号码:" :value="ite.identityCard" />
                <van-cell title="预约景点:" :value="item.spotName" />
                <van-cell title="预约票种:" :value="getTicketType(ite.ticketType)" />
                <van-cell title="预约时间:" :value="item.tourTimeInfo" />
              </div>
            </div>
            <div class="date" v-show="!footerShow && i==index">
              <div class="dateChose">
                <dateChose :dateTime="dateTime" @checkDay="checkDay"></dateChose>
              </div>
              <div class="dateBtn">
                <div class="exit" @click="editTime(item.id)">确定</div>
                <div class="quitreserve" @click="footerShow=true">取消</div>
              </div>
            </div>
            <div class="content-footer" v-show="footerShow">
              <div class="lookAll" v-show="showList || i!=index" @click="lookAll(item,index)">
                查看详情
                <img src="../../../assets/images/展开.png" alt />
              </div>
              <div class="lookAll" v-show="showpack && i==index" @click="pack(index)">
                收起
                <img src="../../../assets/images/展开-灰.png" alt />
              </div>
              <div class="btn">
                <div class="exit" v-if="item.ticket ==  0" @click="getTime(item.spotId,index)">改签</div>
                <div
                  class="quitreserve"
                  @click="quit(item)"
                  v-if="item.ticket ==  0 || item.ticket==2"
                >退订</div>
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import { Cell, List, Toast, Dialog } from "vant";
import DropMenu from "./dropMenu";
import DateChose from "../../../util/dateChose";
export default {
  name: "userAppoint.vue",
  components: {
    DropMenu,
    "van-cell": Cell,
    "van-list": List,
    Toast: Toast,
    [Dialog.Component.name]: Dialog.Component,
    DateChose,
  },
  data() {
    return {
      nowStatus: "全部状态",
      ticket: 6,
      show: false,
      loading: false,
      finished: false,
      list: [],
      showList: true,
      showpack: false,
      showpersonList: false,
      i: "",
      limit: 5,
      page: 1,
      personList: [],
      dateTime: {},
      footerShow: true,
      checkTime: "", //选择预约时间
      showVanList: true,
    };
  },
  methods: {
    text() {
      location.reload();
    },
    changeIcon() {
      this.show = !this.show;
    },
    getStatus(e) {
      this.nowStatus = e.title;
      this.ticket = e.value;
      this.show = false;
      this.list = [];
      this.page = 1;
      this.getList();
    },
    getTicket(item) {
      //0：未验票   1：已验票  2 ：已改签  3：逾期   4 退票   5：退改记录
      let str = "";
      switch (item) {
        case 0:
          str = "未验票";
          break;
        case 1:
          str = "已验票";
          break;
        case 2:
          str = "已改签";
          break;
        case 3:
          str = "逾期作废";
          break;
        case 4:
          str = "退订预约";
          break;
        case 5:
          str = "全部状态";
          break;
      }
      return str;
    },
    getTicketType(val) {
      if (val == 0) {
        return "普通票";
      } else {
        return "特殊票";
      }
    },
    //收起
    pack(index) {
      // this.=true;
      this.showpack = false;
      this.showpersonList = false;
      this.showList = true;
    },
    //展开详情
    lookAll(item, index) {
      this.$axios({
        url: "/api/travelers/getbyvoucher",
        method: "get",
        headers: {
          Authorization: this.$commonUtils.getSessionItem("token"),
        },
        params: { voucher: item.voucher },
      })
        .then((res) => {
          if (res.code == 20000) {
            this.personList = res.data.rows;
            this.i = index;
            this.showList = false;
            this.showpack = true;
            this.showpersonList = true;
          }
        })
        .catch((err) => {
          Toast.fail(err);
        });
    },
    //外层数组
    getTourArea() {
      this.$axios({
        url: "/api/user-reserve/list",
        method: "get",
        headers: {
          Authorization: this.$commonUtils.getSessionItem("token"),
        },
        params: {
          limit: this.limit,
          page: this.page,
          ticket: this.ticket,
        },
      })
        .then((res) => {
          if (res.code == 20000 && res.data.total != 0) {
            this.showVanList = false;
            this.loading = false;
            // this.total = res.data.total;
            const { rows } = res.data;
            this.list.push(...rows);
            if (rows.length) {
              this.page++;
            } else {
              this.finished = true;
            }
          } else if (res.data.total == 0) {
            this.showVanList = true;
          } else {
            Toast.fail(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getList() {
      // this.page++;
      this.getTourArea();
    },
    //退订弹框
    quit(item) {
      Dialog.confirm({
        // title: "提交成功",
        message: "您确定要退订吗？",
      })
        .then(() => {
          this.quitreserve(item);
        })
        .catch(() => {
          // on cancel
        });
    },
    //退订
    quitreserve(item) {
      this.$axios({
        url: "/api/user-reserve/quitreserve",
        method: "get",
        headers: {
          Authorization: this.$commonUtils.getSessionItem("token"),
        },
        params: { reserceId: item.id },
      })
        .then((res) => {
          if (res.code == 20000) {
            Toast.success(res.message);
            this.text();
          } else {
            Toast.fail(res.message);
          }
        })
        .catch((err) => {
          Toast.fail(err);
        });
    },
    changeTime(val) {
      let arr = val.split(" ");
      if (arr[1] == "上午") {
        return arr[0] + "  8:00-12:00";
      } else {
        return arr[0] + "  12:00-18:00";
      }
    },
    //选择日期
    checkDay(day) {
      this.checkTime = day;
    },
    //修改预约时间
    editTime(id) {
      this.$axios({
        url: "/api/user-reserve/getbyreserve",
        method: "get",
        params: { id: id, tour_time_info: this.checkTime },
        headers: {
          Authorization: this.$commonUtils.getSessionItem("token"),
        },
      })
        .then((res) => {
          if (res.code == 20000) {
            Toast.success("改签成功");
            location.reload();
          } else {
            Toast.fail(res.message);
          }
        })
        .catch((err) => {
          Toast.fail(err);
        });
    },
    //改签
    getTime(id, index) {
      this.i = index;
      this.footerShow = false;
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
  },
  mounted() {
    // this.getList()
    this.getTourArea();
  },
};
</script>

<style scoped>
.userAppoint {
  /*min-height: vh;*/
  background: #f9f9f9;
}
.userAppoint >>> .van-cell {
  /*height: 30px;*/
  padding: 3px 10px;
}
.userAppoint >>> .van-cell:not(:last-child)::after {
  border: none;
}
.chooseStatus {
  position: relative;
  height: 36px;
  font-size: 13px;
  font-family: MicrosoftYaHei;
  color: #999999;
  text-align: right;
  padding-right: 10px;
  line-height: 36px;
}
.date {
  height: auto;
  padding-bottom: 10px;
}
.dateChose {
  margin-top: 10px;
  width: 100%;
  height: 140px;
  background: #ffffff;
  padding: 15px 10px 0px 10px;
  box-sizing: border-box;
  border-top: 1px solid #eeeeee;
}
.i_img {
  width: 15px;
  height: 8px;
  display: inline-block;
  background-image: url("../../../assets/images/showUp.png");
  background-size: 100% 100%;
  background-position: 0px;
}
.i_imgActive {
  width: 15px;
  height: 8px;
  display: inline-block;
  background-image: url("../../../assets/images/展开-灰.png");
  background-size: 100% 100%;
  background-position: 0px;
}
.fsActive {
  color: #3983e5;
}
.listHead {
  box-sizing: border-box;
  height: 39px;
  padding-top: 10px;
  width: 100%;
  font-size: 16px;
  line-height: 39px;
  color: #333333;
  font-weight: bold;
  /*border-top: 1px solid #eeeeee;*/
  background-color: #fff;
  padding-left: 10px;
}
.listHead span:first-child {
  /* padding-left: 10px; */
}
.listHead span:last-child {
  float: right;
  margin-right: 10px;
  color: #3983e5;
  font-size: 14px;
  font-weight: 400;
}
.listHeadPerson {
  box-sizing: border-box;
  padding-top: 10px;
  border-top: 1px solid #eeeeee;
  height: 39px;
  width: 100%;
  font-size: 15px;
  /*line-height: 39px;*/
  color: #333333;
  font-weight: bold;
  padding-left: 10px;
  /*padding-bottom: 10px;*/
  /*border-bottom: 1px solid #eeeeee;*/
  background-color: #fff;
}
.statusList {
  z-index: 100;
  background-color: #000000;
  position: absolute;
  right: 0;
}
.statusList .status {
  width: 101px;
  height: 39px;
  background: rgba(153, 153, 153, 0.9);
  text-align: center;
  color: #fff;
  padding-left: 9px;
  padding-right: 9px;
}
.main {
  /*padding: 0px 10px;*/
  box-sizing: border-box;
  margin-bottom: 60px;
}
.content {
  width: 100%;
}
.content >>> .van-cell {
  color: #999999;
}
.content >>> .van-cell__title,
.van-cell__value {
  flex: inherit;
  font-size: 15px;
  margin-right: 10px;
}
.content-footer {
  height: 44px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid #eeeeee;
}
.lookAll {
  color: #3983e5;
  font-size: 14px;
  width: 40%;
  padding-left: 5px;
}
.lookAll img {
  margin-left: 5px;
  width: 15px;
  height: 8px;
}
.btn {
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.exit {
  width: 60px;
  height: 30px;
  background: #3983e5;
  border-radius: 24px;
  line-height: 30px;
  font-size: 15px;
  font-family: MicrosoftYaHei;
  color: #ffffff;
  text-align: center;
  margin-right: 10px;
}
.quitreserve {
  width: 60px;
  height: 30px;
  background: #eeeeee;
  border-radius: 24px;
  font-size: 15px;
  font-family: MicrosoftYaHei;
  color: #999999;
  text-align: center;
  line-height: 30px;
}

.dateBtn {
  margin-bottom: 10px;
  padding-right: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.msgnull {
  width: 100%;
  line-height: 50vh;
  color: #999999;
  text-align: center;
  font-size: 16px;
}
</style>
