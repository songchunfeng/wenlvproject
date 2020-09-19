<!--出行人处理-->
<template>
  <div class="travelRecord">
    <div class="travelList" v-for="(item,index) in addPeo" :key="item.key">
      <addPeo
        ref="add"
        :index="index"
        @reportErrorMessage="getErrorMessage"
        @deleteItem="deleteItem"
        @getFormData="getUserFormDate"
        @getListAfresh="getListAfresh"
        class="addItem"
      />
    </div>

    <div class="addBtn" @click="addTravel">
      <div class="addBtnImg">
        <img src="../../../assets/images/添加.png" alt />
      </div>
      <div class="addBtnText">新增常用出行人</div>
    </div>
  </div>
</template>

<script>
import { Dialog, Toast, Field, Form, Picker, Popup } from "vant";
import addPeo from "./addPeo";
export default {
  name: "travelRecord",
  components: {
    "van-form": Form,
    "van-field": Field,
    "van-popup": Popup,
    "van-picker": Picker,
    addPeo,
  },
  data() {
    return {
      addPeo: [], // 新增出行人
      doSelfCheck: false, // 触发自检
      isChangedAll: true, // 是否有错误项
    };
  },
  created() {
    this.getTravel();
  },
  methods: {
    // 获取出行人
    getTravel() {
      this.addPeo = [];
      this.$axios({
        url: "/api/user-identity-info/getuserinfo",
        method: "get",
        headers: {
          Authorization: window.sessionStorage.getItem("token"),
        },
      })
        .then((res) => {
          console.log(res);
          if (res.code == 20000) {
            if (res.data.rows.length != 0) {
              let arr = res.data.rows;
              for (let i = 0; i < arr.length; i++) {
                // let obj = {
                //   key: new Date().getTime(),
                //   data: {},
                // };
                let obj = {};
                this.addPeo.push(obj);
              }
              console.log("huoqu");
              this.$nextTick(() => {
                console.log(arr);
                for (let i = 0; i < arr.length; i++) {
                  this.$refs.add[i].travelUser.id = arr[i].id;
                  this.$refs.add[i].travelUser.surname = arr[i].surname;
                  this.$refs.add[i].travelUser.telphone = arr[i].telphone;
                  this.$refs.add[i].travelUser.identityType =
                    arr[i].identityType;
                  this.$refs.add[i].travelUser.identityCard =
                    arr[i].identityCard;
                  this.$refs.add[i].travelUser.ticketType = arr[i].ticketType;
                  if (arr[i].identityType == "0") {
                    this.$refs.add[i].identityTypeText = "居民身份证";
                  }
                  if (arr[i].identityType == "1") {
                    this.$refs.add[i].identityTypeText = "护照";
                  }
                  if (arr[i].ticketType == "0") {
                    this.$refs.add[i].ticketTypeText = "普通票";
                  }
                  if (arr[i].ticketType == "1") {
                    this.$refs.add[i].ticketTypeText = "特殊票";
                  }
                }
              });
              console.log(3);
            }
          } else {
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
    // 新增
    addTravel() {
      this.doSelfCheck = false;
      //   let obj = {
      //     key: new Date().getTime(),
      //     data: {},
      //   };
      let obj = {};
      this.addPeo.push(obj);
      this.$nextTick(() => {
        this.$refs.add[this.addPeo.length - 1].editShow = true;
      });
    },
    // 获取出行人信息
    getUserFormDate(obj) {
      this.isChangedAll = true;
      this.doSelfCheck = false;
      this.addPeo[obj.index].data = obj.formData;
    },
    // 删除出行人
    deleteItem(index) {
      this.isChangedAll = true;
      this.addPeo = this.addPeo.filter(function (item, i) {
        return i != index;
      });
    },
    // 取消
    getListAfresh() {
      this.getTravel();
    },
  },
};
</script>

<style scoped lang="less">
.travelRecord {
  width: 100%;
  background-color: #f9f9f9;
  overflow: hidden;
  padding-bottom: 55px;
  box-sizing: border-box;
  .travelList {
    width: 100%;
    .addItem {
      background-color: #fff;
      margin-top: 10px;
    }
  }
  .addBtn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // margin-top: 10px;
    padding: 10px;
    box-sizing: border-box;
    background-color: #fff;
    .addBtnImg {
      width: 13px;
      height: 13px;
      margin-right: 6px;
      img {
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
    }
    .addBtnText {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      color: #3983e5;
      line-height: 22px;
      letter-spacing: 1px;
    }
  }
}
</style>
