<template>
  <div class="takeTicketBox">
    <van-form
      :scroll-to-error="true"
      class="takeTicketForm"
      ref="form"
      @failed="onFailed"
      :show-error-message="false"
    >
      <van-field
        name="surname"
        label="姓名"
        v-model="reserveVo.name"
        @blur="checkName"
        input-align="right"
        placeholder="请输入姓名"
        :rules="[{ required: true,pattern:patternName, message: '请填写姓名' }]"
      >
        <template #left-icon>
          <img src="../assets/images/必选.png" alt style="width:8px;height:8px" />
        </template>
      </van-field>
      <van-field
        name="telphone"
        label="联系电话"
        input-align="right"
        v-model="reserveVo.telphone"
        @blur="checkPhone"
          placeholder="请输入联系电话"
          :rules="[{ required: true,pattern:patternPhone, message: '请输入联系电话' }]"
        >
        <template #left-icon>
          <img src="../assets/images/必选.png" alt style="width:8px;height:8px" />
        </template>
      </van-field>

      <van-field
        name="identityType"
        label="有效证件"
        input-align="right"
        right-icon="arrow"
        @click="identityTypeShow = true"
        readonly
        v-model="identityTypeText"
        placeholder="请选择有效证件"
        :rules="[{ required: true, message: '请选择有效证件' }]"
      >
        <template #left-icon>
          <img src="../assets/images/必选.png" alt style="width:8px;height:8px" />
        </template>
      </van-field>
      <van-field
        name="identityCard"
        label="证件号码"
        input-align="right"
        :disabled="!reserveVo.identity_type"
        v-model="reserveVo.identity_card"
        placeholder="请输入证件号码"
        @blur="checkIdNo"
        :rules="[{ required: true, message: '请输入证件号码' }]"
      >
        <template #left-icon>
          <img src="../assets/images/必选.png" alt style="width:8px;height:8px" />
        </template>
      </van-field>
    </van-form>
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
  </div>
</template>

<script>
import { Dialog, Toast, Field, Form, Picker, Popup } from "vant";
export default {
  name: "takeTicket",
  components: {
    "van-form": Form,
    "van-field": Field,
    "van-popup": Popup,
    "van-picker": Picker,
  },
  props: {
    checkBySelfs: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      patternPhone: "", // 手机校验
      patternName: "", // 名字校验
      reserveVo: {
        name: "",
        telphone: "",
        identity_type: "",
        identity_card: "",
      },
      identityTypeShow: false,
      identityTypeText: "",
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
    };
  },
  watch: {
    checkBySelfs: function(newVal) {
      if (newVal) {
        this.checkBySelf();
      }
    },
    reserveVo: {
      handler(newVal) {
        if (newVal) {
          this.outputFormData(newVal);
        }
      },
      deep: true,
    },
    "reserveVo.identity_type": {
      handler(newVal) {
        if (newVal) {
          this.reserveVo.identity_card = "";
        }
      },
      deep: true
    },
  },
  created() {
    this.patternPhone = this.$constants.REG.tel; // 手机号校验
    this.patternName = this.$constants.REG.realName; // 姓名校验
  },
  methods: {
    // 校验姓名
    checkName(){
      let check = this.$commonUtils.checkName(this.reserveVo.name);
      if (check != "success") {
        Toast(this.$commonUtils.checkName(this.reserveVo.name));
        this.reserveVo.name = "";
      }
    },
    // 校验身份证号
    checkIdNo(){
      if (this.reserveVo.identity_type == '0') {
        let check = this.$commonUtils.checkIDNo(this.reserveVo.identity_card);
        if (check != "success") {
          Toast(this.$commonUtils.checkIDNo(this.reserveVo.identity_card));
          this.reserveVo.identity_card = "";
        }
      }
    },
    //  校验手机号
    checkPhone(){
      let check = this.$commonUtils.checkPhoneNo(this.reserveVo.telphone);
      if (check != "success") {
        Toast(this.$commonUtils.checkPhoneNo(this.reserveVo.telphone));
        this.reserveVo.telphone = "";
      }
    },
    identityTypeConfirm(val) {
      this.reserveVo.identity_type = val.key;
      this.identityTypeText = val.text;
      this.identityTypeShow = false;
    },
    outputFormData(val) {
      this.$emit("getFormData", this.reserveVo);
    },
    onCancel() {
      this.identityTypeShow = false;
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
.takeTicketBox {
  width: 100%;
  box-sizing: border-box;
  padding-right: 10px;
  padding-left: 10px;
  background-color: #fff;
  .takeTicketForm {
    width: 100%;
    .van-cell {
      padding-left: 0px;
      padding-right: 0px;
      font-family: MicrosoftYaHei;
      color: #333333;
      border-bottom: 1px solid #eeeeee;
    }
    // /deep/ .van-field__control:disabled {
    //   color: #333333!important;
    // }
    .van-cell:not(:last-child)::after {
      border: none;
    }
    
  }
}
</style>
