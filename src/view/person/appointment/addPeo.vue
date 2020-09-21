<template>
  <div class="addPeo">
    <div class="titleBox">
      <div class="title">出行人{{index + 1}}</div>
      <div class="edit" v-show="!editShow" @click="editShow = true">
        <img src="../../../assets/images/编 辑.png" alt />
      </div>
    </div>
    <div v-show="editShow">
      <van-form
        :scroll-to-error="true"
        class="travelForm"
        ref="form"
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
        <div class="cannel" @click="deleteItem">取消</div>
        <div class="line"></div>
        <div class="confim" @click="editShow = false">确定</div>
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
  props: {
    index: Number,
    checkBySelfs: {
      type: Boolean,
      default: false
    }
  },
  components: {
    "van-form": Form,
    "van-field": Field,
    "van-popup": Popup,
    "van-picker": Picker,
  },
  watch: {
    checkBySelfs: function(newVal) {
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
          this.travelUser.identityCard = "";
        }
      },
      deep: true
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
      editShow: true,
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
        surname: "",
        telphone: "",
        identityType: "",
        identityCard: "",
        ticketType: "",
      },
    };
  },
  methods: {
    // 校验姓名
    checkName(){
      let check = this.$commonUtils.checkName(this.travelUser.surname);
      if (check != "success") {
        Toast(this.$commonUtils.checkName(this.travelUser.surname));
        this.travelUser.surname = "";
      }
    },
    // 校验身份证号
    checkIdNo(){
      if (this.travelUser.identityType == '0') {
        let check = this.$commonUtils.checkIDNo(this.travelUser.identityCard);
        if (check != "success") {
          Toast(this.$commonUtils.checkIDNo(this.travelUser.identityCard));
          this.travelUser.identityCard = "";
        }
      }
    },
    //  校验手机号
    checkPhone(){
      let check = this.$commonUtils.checkPhoneNo(this.travelUser.telphone);
      if (check != "success") {
        Toast(this.$commonUtils.checkPhoneNo(this.travelUser.telphone));
        this.travelUser.telphone = "";
      }
    },
    deleteItem() {
      this.$emit("deleteItem", this.index);
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
      this.identityTypeText = val.text;
      this.identityTypeShow = false;
    },
    ticketTypeConfirm(val) {
      this.travelUser.ticketType = val.key;
      this.ticketTypeText = val.text;
      this.ticketTypeShow = false;
    },
    // 校验失败
    onFailed() {
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
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 8px;
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
  .travelForm {
    width: 100%;
    .van-cell {
      padding-left: 0px;
      padding-right: 0px;
      font-family: MicrosoftYaHei;
      border-bottom: 1px solid #eeeeee;
      color: #333333;
    }
    /deep/ .van-field__control:disabled {
      color: #333;
    }
    .van-cell:not(:last-child)::after {
      border: none;
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
    // border-top: 1px solid #eeeeee;
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