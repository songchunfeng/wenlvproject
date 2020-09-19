<template>
  <div class="addPeo">
    <div class="titleBox">
      <div class="title">出行人{{index + 1}}</div>
      <div class="operationBtn">
        <div class="delete" v-show="!editShow" @click="deleteItem">
          <img src="../../../assets/images/删 除.png" alt />
        </div>
        <div class="edit" v-show="!editShow" @click="editShow = true">
          <img src="../../../assets/images/编 辑.png" alt />
        </div>
      </div>
    </div>
    <div v-show="editShow">
      <van-form
        :scroll-to-error="true"
        class="travelForm"
        ref="form"
        @submit="confirm"
        @failed="onFailed"
        :show-error-message="false"
      >
        <van-field
          name="surname"
          label="姓名"
          v-model="travelUser.surname"
          @blur="checkName"
          input-align="right"
          placeholder="请输入姓名"
          :rules="[{ required: true,pattern:patternName, message: '请填写姓名' }]"
        >
          <template #left-icon>
            <img src="../../../assets/images/必选.png" alt style="width:8px;height:8px" />
          </template>
        </van-field>
        <van-field
          name="telphone"
          label="联系电话"
          input-align="right"
          v-model="travelUser.telphone"
          @blur="checkPhone"
          placeholder="请输入联系电话"
          :rules="[{ required: true,pattern:patternPhone, message: '请输入联系电话' }]"
        >
          <template #left-icon>
            <img src="../../../assets/images/必选.png" alt style="width:8px;height:8px" />
          </template>
        </van-field>

        <van-field
          name="identityType"
          label="有效证件"
          input-align="right"
          @click="identityTypeShow = true"
          disabled
          v-model="identityTypeText"
          placeholder="请选择有效证件"
          :rules="[{ required: true, message: '请选择有效证件' }]"
        >
          <template #left-icon>
            <img src="../../../assets/images/必选.png" alt style="width:8px;height:8px" />
          </template>
        </van-field>
        <van-field
          name="identityCard"
          label="证件号码"
          input-align="right"
          :disabled="!travelUser.identityType"
          v-model="travelUser.identityCard"
          placeholder="请输入证件号码"
          @blur="checkIdNo"
          :rules="[{ required: true, message: '请输入证件号码' }]"
        >
          <template #left-icon>
            <img src="../../../assets/images/必选.png" alt style="width:8px;height:8px" />
          </template>
        </van-field>

        <van-field
          name="ticketType"
          label="预约票种"
          input-align="right"
          @click="ticketTypeShow = true"
          disabled
          v-model="ticketTypeText"
          placeholder="请选择预约票种"
          :rules="[{ required: true, message: '请选择预约票种' }]"
        >
          <template #left-icon>
            <img src="../../../assets/images/必选.png" alt style="width:8px;height:8px" />
          </template>
        </van-field>
      </van-form>
      <div class="bottomBtn">
        <div class="cannel" @click="cancelEidt">取消</div>
        <div class="line"></div>
        <div class="confim" @click="checkBySelf">确定</div>
      </div>
    </div>
    <div v-show="!editShow">
      <div class="travelCell">
        <div class="travelCellLable">姓名</div>
        <div class="travelCellValue">{{travelUser.surname}}</div>
      </div>
      <div class="travelCell">
        <div class="travelCellLable">联系电话</div>
        <div class="travelCellValue">{{travelUser.telphone}}</div>
      </div>
      <div class="travelCell">
        <div class="travelCellLable">有效证件</div>
        <div class="travelCellValue">{{identityTypeText}}</div>
      </div>
      <div class="travelCell">
        <div class="travelCellLable">证件号码</div>
        <div class="travelCellValue">{{travelUser.identityCard}}</div>
      </div>
      <div class="travelCell">
        <div class="travelCellLable">预约票种</div>
        <div class="travelCellValue">{{ticketTypeText}}</div>
      </div>
    </div>

    <!-- 证件类型 -->
    <van-popup v-model="identityTypeShow" position="bottom">
      <van-picker
        :columns="identityTypeList"
        title="证件类型"
        show-toolbar
        @confirm="identityTypeConfirm"
        @cancel="onCancel"
      ></van-picker>
    </van-popup>
    <!-- 预约票种 -->
    <van-popup v-model="ticketTypeShow" position="bottom">
      <van-picker
        :columns="ticketTypeList"
        title="预约票种"
        show-toolbar
        @confirm="ticketTypeConfirm"
        @cancel="onCancel"
      ></van-picker>
    </van-popup>
  </div>
</template>

<script>
import { Dialog, Toast, Field, Form, Picker, Popup } from "vant";
export default {
  name: "addTravel",
  props: {
    index: Number,
    
  },
  components: {
    "van-form": Form,
    "van-field": Field,
    "van-popup": Popup,
    "van-picker": Picker,
  },
  watch: {
    checkBySelfs: function (newVal) {
      if (newVal) {
        this.checkBySelf();
      }
    },
    travelUser: {
      handler(newVal) {
        if (newVal) {
          this.outputFormData(newVal);
        }
      },
      deep: true,
    },
    "travelUser.identityType": {
      handler(newVal) {
        if (newVal) {
          console.log("identityType", newVal);
          this.travelUser.identityCard = "";
          if (newVal == "0") {
            this.identityTypeText = "居民身份证";
          }
          if (newVal == "1") {
            this.identityTypeText = "护照";
          }
        }
      },
      deep: true,
    },
    "travelUser.ticketType": {
      handler(newVal) {
        if (newVal) {
          console.log("ticketType", newVal);
          if (newVal == "0") {
            this.ticketTypeText = "普通票";
          }
          if (newVal == "1") {
            this.ticketTypeText = "特殊票";
          }
        }
      },
      deep: true,
    },
  },
  created() {
    this.patternPhone = this.$constants.REG.tel; // 手机号校验
    this.patternName = this.$constants.REG.realName; // 姓名校验
  },
  data() {
    return {
      patternPhone: "", // 手机校验
      patternName: "", // 名字校验
      editShow: false,
      identityTypeShow: false,
      ticketTypeShow: false,
      identityTypeText: "",
      ticketTypeText: "",
      identityTypeList: [
        {
          text: "居民身份证",
          key: "0",
        },
        {
          text: "护照",
          key: "1",
        },
      ],
      ticketTypeList: [
        {
          text: "普通票",
          key: "0",
        },
        {
          text: "特殊票",
          key: "1",
        },
      ],
      travelUser: {
        id: "",
        surname: "",
        telphone: "",
        identityType: "",
        identityCard: "",
        ticketType: "",
      },
    };
  },
  methods: {
    // 确定
    confirm() {
        console.log('con');
      this.$axios({
        url: "/api/user-identity-info/appsaveuserinfo",
        method: "post",
        headers: {
          Authorization: window.sessionStorage.getItem("token"),
        },
        data: {
          id: this.travelUser.id,
          identityCard: this.travelUser.identityCard,
          identityType: this.travelUser.identityType,
          surname: this.travelUser.surname,
          telphone: this.travelUser.telphone,
          ticketType: this.travelUser.ticketType,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.code == 20000) {
            this.$emit("getListAfresh");
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
    // 校验姓名
    checkName() {
      let check = this.$commonUtils.checkName(this.travelUser.surname);
      if (check != "success") {
        Toast(this.$commonUtils.checkName(this.travelUser.surname));
        this.travelUser.surname = "";
      }
    },
    // 校验身份证号
    checkIdNo() {
      if (this.travelUser.identityType == "0") {
        let check = this.$commonUtils.checkIDNo(this.travelUser.identityCard);
        if (check != "success") {
          Toast(this.$commonUtils.checkIDNo(this.travelUser.identityCard));
          this.travelUser.identityCard = "";
        }
      }
    },
    //  校验手机号
    checkPhone() {
      let check = this.$commonUtils.checkPhoneNo(this.travelUser.telphone);
      if (check != "success") {
        Toast(this.$commonUtils.checkPhoneNo(this.travelUser.telphone));
        this.travelUser.telphone = "";
      }
    },
    // 删除
    deleteItem() {
      if (this.travelUser.id == "") {
        this.$emit("deleteItem", this.index);
      } else {
        this.$axios({
          url: "/api/user-identity-info/remove",
          method: "DELETE",
          headers: {
            Authorization: window.sessionStorage.getItem("token"),
          },
          params: {
            id: this.travelUser.id,
          },
        })
          .then((res) => {
            console.log(res);
            if (res.code == 20000) {
              this.$emit("getListAfresh");
            } else {
              Toast.fail({
                message: res.message,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 取消
    cancelEidt() {
      if (this.travelUser.id == "") {
        this.$emit("deleteItem", this.index);
      } else {
        this.$emit("getListAfresh");
      }
    },
    outputFormData(val) {
      let obj = {
        index: this.index,
        formData: this.travelUser,
      };
      this.$emit("getFormData", obj);
    },
    onCancel() {
      this.identityTypeShow = false;
      this.ticketTypeShow = false;
    },
    identityTypeConfirm(val) {
      this.travelUser.identityType = val.key;
      this.identityTypeShow = false;
    },
    ticketTypeConfirm(val) {
      this.travelUser.ticketType = val.key;
      this.ticketTypeShow = false;
    },
    // 校验失败
    onFailed(error) {
      console.log(error);
      let arr = [];
      for (let i = 0; i < error.errors.length; i++) {
        arr.push(error.errors[i].message);
      }
      Toast.fail({ message: arr[0] });
      this.$emit("reportErrorMessage");
    },
    // 自检
    checkBySelf() {
      this.$refs.form.submit();
    },
  },
};
</script>

<style lang="less" scoped>
.addPeo {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  padding-bottom: 0px;
  .titleBox {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 10px;
    box-sizing: border-box;
    .title {
      font-size: 15px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #333333;
      line-height: 20px;
      letter-spacing: 1px;
    }
    .operationBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      .delete {
        width: 13px;
        height: 14px;
        margin-right: 6px;
        img {
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
      }
      .edit {
        width: 13px;
        height: 13px;
        img {
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
      }
    }
  }
  .travelForm {
    width: 100%;
    .van-cell {
      padding-left: 0px;
      padding-right: 0px;
      font-family: MicrosoftYaHei;
      color: #333333;
    }
    /deep/ .van-field__control:disabled {
      color: #333;
    }
  }
  .bottomBtn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    box-sizing: border-box;
    border-bottom: 1px solid #eeeeee;
    border-top: 1px solid #eeeeee;
    .line {
      width: 1px;
      height: 12px;
      background: #eeeeee;
    }
    .cannel {
      flex: 1;
      font-size: 15px;
      font-family: MicrosoftYaHei;
      color: #999999;
      line-height: 20px;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .confim {
      flex: 1;
      font-size: 15px;
      font-family: MicrosoftYaHei;
      color: #3983e5;
      line-height: 20px;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .travelCell {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0px 10px 0px;
    box-sizing: border-box;
    .travelCellLable {
      font-size: 15px;
      font-family: MicrosoftYaHei;
      color: #333333;
      line-height: 20px;
      letter-spacing: 1px;
    }
    .travelCellValue {
      font-size: 15px;
      font-family: MicrosoftYaHei;
      color: #999999;
      line-height: 20px;
      letter-spacing: 1px;
    }
  }
}
</style>