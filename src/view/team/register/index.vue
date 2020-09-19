<template>
  <div class="register">
    <van-nav-bar title="团队用户注册" fixed left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="form">
      <van-form @submit="onSubmit" :show-error-message="false">
        <van-field
          v-model=" reallyName"
          name="真实姓名"
          label="真实姓名"
          placeholder="请填写真实姓名"
          :rules="[{ required: true, message: '请填写真实姓名' }]"
          @blur="checkName(reallyName)"
        >
          <template #left-icon>
            <img src="../../../assets/images/必选.png" alt class="checkSure" />
          </template>
        </van-field>
        <van-field
          v-model="telephone"
          name="联系电话"
          label="联系电话"
          placeholder="联系电话"
          :rules="[{ required: true, message: '请填写联系电话' }]"
          @blur="telBlur"
        >
          <template #left-icon>
            <img src="../../../assets/images/必选.png" alt class="checkSure" />
          </template>
        </van-field>
        <van-field
          v-model="passWord"
          type="password"
          name="登录密码"
          label="登录密码"
          placeholder="登录密码"
          :rules="[{ required: true, message: '请填写登录密码' }]"
          @blur="checkpassword(passWord)"
        >
          <template #left-icon>
            <img src="../../../assets/images/必选.png" alt class="checkSure" />
          </template>
        </van-field>
        <van-field
          v-model="surepassword"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true, message: '请填写确认密码' }]"
          @blur="checkpassword(surepassword)"
        >
          <template #left-icon>
            <img src="../../../assets/images/必选.png" alt class="checkSure" />
          </template>
        </van-field>
        <van-field
          v-model="identityCardCode"
          name="身份证号"
          label="身份证号"
          placeholder="身份证号"
          :rules="[{ required: true, message: '请填写身份证号' }]"
          @blur="checkIDNo(identityCardCode)"
        >
          <template #left-icon>
            <img src="../../../assets/images/必选.png" alt class="checkSure" />
          </template>
        </van-field>
        <van-field
          v-model="tourGuideCode"
          name="导游证号"
          label="导游证号"
          placeholder="导游证号"
          :rules="[{ required: true, message: '请填写导游证号' }]"
          @blur="checkTourGuide(tourGuideCode)"
        >
          <template #left-icon>
            <img src="../../../assets/images/必选.png" alt class="checkSure" />
          </template>
        </van-field>
        <div class="tour">
          <van-field class="customField">
            <template #label>
              <span class="custom-title">导游证</span>
              <span class="picSpecifi">（图片规格：3M以下，图片清晰）</span>
            </template>
            <template #left-icon>
              <img src="../../../assets/images/必选.png" alt class="checkSure" />
            </template>
          </van-field>
          <div class="uploadMain">
            <div class="upload">
              <van-uploader
                :after-read="afterRead"
                :max-count="1"
                @delete="fileDelete"
                :preview-image="true"
                v-model="list"
                :max-size="3* 1024 * 1024"
                @oversize="onOversize"
                :before-read="beforeRead"
                accept="image/*"
              >
                <template #default>
                  <img src="../../../assets/images/plus.png" alt class="uploadImg" />
                  <div class="uploadfs">上传图片</div>
                </template>
              </van-uploader>
            </div>
          </div>
          <div class="customLine"></div>
        </div>
        <!--<div class="teamType">-->
        <van-field value="旅行社" readonly>
          <template #label>
            <span class="custom-title">团队类型</span>
          </template>
          <template #left-icon>
            <img src="../../../assets/images/必选.png" alt class="checkSure" />
          </template>
          <template #right-icon>
            <van-icon name="arrow" />
          </template>
        </van-field>
        <!--</div>-->
        <div class="cell">
          <van-field
            v-model="usci"
            class="customField"
            name="公司社会统一信用代码"
            label="公司社会统一信用代码"
            placeholder="请输入信用代码"
            @blur="getUsciMsg(usci)"
            :rules="[{ required: true, message: '请填写公司社会统一信用代码' }]"
          >
            <template #left-icon>
              <img src="../../../assets/images/必选.png" alt class="checkSure" />
            </template>
          </van-field>
          <div class="toVertify" v-show="show">
            <img src="../../../assets/images/提醒.png" alt />
            <span>
              未查询到该公司信息，点击此处跳转认证
              <span style="color: #3983E5;" @click="toTourGuide">跳转认证</span>
            </span>
          </div>
          <div class="toVertify" v-show="!show">
            <img src="../../../assets/images/完成.png" alt />
            <span>已认证</span>
          </div>
        </div>
        <div class="sign">
          <van-checkbox v-model="checked" icon-size="14px">
            我已阅读并同意
            <span style="color:#3983E5" @click="readShow=true">《大美青海景区门票预约平台注册协议》</span>
          </van-checkbox>
        </div>
        <div class="btn">
          <van-button round block type="info" native-type="submit">注册</van-button>
        </div>
      </van-form>
    </div>
    <van-popup
      :safe-area-inset-bottom="true"
      :overlay="false"
      position="right"
      v-model="readShow"
      :style="{ height: '100%', width: '100%'}"
    >
      <read @close="closeRead"></read>
    </van-popup>
      <van-tabbar v-model="activeFoot" route>
          <van-tabbar-item to="/preList">
              <span>首页</span>
              <template #icon="props">
                  <img :src="props.active ? icon.active : icon.inactive" />
              </template>
          </van-tabbar-item>
          <van-tabbar-item icon="search" to="/perUser">
              <span>用户中心</span>
              <template #icon="props">
                  <img :src="props.active ? icon.user : icon.inuser" />
              </template>
          </van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>
import {
  NavBar,
  Form,
  Field,
  Button,
  Toast,
  Checkbox,
  Uploader,
  Popup,
  Icon,
  Tabbar,
    TabbarItem
} from "vant";
import read from "../../person/register/registerText";
export default {
  name: "index.vue",
  components: {
    "van-nav-bar": NavBar,
    "van-icon": Icon,
    "van-checkbox": Checkbox,
    "van-form": Form,
    "van-field": Field,
    "van-button": Button,
    "van-uploader": Uploader,
    "van-popup": Popup,
      "van-tabbar": Tabbar,
      "van-tabbar-item": TabbarItem,
    read,
  },
  data() {
    return {
      identityCardCode: "",
      passWord: "",
      reallyName: "",
      surepassword: "",
      telephone: "",
      tourGuideCode: "",
      usci: "", //信用代码
      tourGuideUrl: "", //图片
      checked: true,
      show: true,
      list: [],
      readShow: false,
        icon: {
            active: require("../../../assets/images/首页已选择.png"),
            inactive: require("../../../assets/images/个人 -未选中.png"),
            user: require("../../../assets/images/首页已选择 (2).png"),
            inuser: require("../../../assets/images/个人 -未选中(1).png"),
        },
        activeFoot:0,
    };
  },
  methods: {
    onSubmit() {
      if (
        this.tourGuideUrl != "" &&
        this.checked == true &&
        this.passWord === this.surepassword &&
        this.passWord != "" &&
        this.surepassword != ""
      ) {
        let params = {
          identityCardCode: this.identityCardCode,
          passWord: this.passWord,
          reallyName: this.reallyName,
          teamType: 0,
          telephone: this.telephone,
          tourGuideCode: this.tourGuideCode,
          tourGuideUrl: this.tourGuideUrl,
          usci: this.usci,
          type:1,
        };
        this.$axios({
          url: "/api/teamInfo/teamUserRegister",
          method: "post",
          data: params,
        })
          .then((res) => {
            // console.log(res)
            if (res.code == 20000) {
              Toast.success(res.message);
            } else {
              Toast.fail(res.message);
            }
          })
          .catch((err) => {
            Toast.fail(err);
          });
      } else if (this.passWord !== this.surepassword) {
        Toast.fail("两次密码输入不一致");
      } else if (this.passWord == "" || this.surepassword == "") {
        Toast.fail("请确认密码");
      } else if (this.checked == false) {
        Toast.fail("请先阅读平台注册协议并同意");
      } else {
        Toast.fail("请上传旅游证照片");
      }
    },
    //获取信用代码信息
    getUsciMsg(val) {
      let code = this.$commonUtils.socitycode(val);

      if (code != "success") {
        Toast.fail("请检查统一社会信用代码");
      } else {
        let params = { usci: val };
        this.$axios({
          url: "/api/teamInfo/findCompanyName",
          method: "get",
          params: params,
        })
          .then((res) => {
            console.log(res);
            if (res.code == 20000) {
              this.show = false;
            } else {
              this.show = true;
            }
          })
          .catch((err) => {
            Toast.fail(err);
          });
      }
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
      formData.append("file", file.file); //接口需要传的参数
      this.$axios
        .post('/api/picture/getpictureid?msg=""', formData)
        .then((res) => {
          // console.log(res)
          this.tourGuideUrl = res.data.rows[0];
        })
        .catch((err) => {
          Toast.fail(err);
        });
    },
    onOversize() {
      // console.log(file);
      Toast.fail("文件大小不能超过 3M");
    },
    fileDelete() {
      this.tourGuideUrl = "";
    },
    beforeRead(file) {
      if (file.type !== "image/jpeg") {
        Toast("请上传 jpg 格式图片");
        return false;
      }
      return true;
    },
    onClickLeft() {
      this.$router.push("/teamUser");
    },
    //跳转旅行社
    toTourGuide() {
      this.$router.push("/tourRegister");
    },
    //失焦校验
    telBlur() {
      let code = this.$commonUtils.checkPhoneNo(this.telephone);
      if (code != "success") {
        Toast.fail("手机号输入有误，请重新输入");
      } else {
        this.$axios
          .get("/api/user/findUser?telphone=" + this.telephone + "?type=1")
          .then((res) => {
            if (res.code !== 20000) {
              Toast.fail(res.message);
            }
          })
          .catch((err) => {
            Toast.fail(err);
          });
      }
    },
    checkpassword(val) {
      let code = this.$commonUtils.checkPassword(val);
      if (code == "fail") {
        Toast.fail("请输入六位以上数字字母组合");
      }
    },
    checkIDNo(val) {
      let code = this.$commonUtils.checkIDNo(val);
      if (code != "success") {
        Toast.fail(code);
        this.identityCardCode = "";
      }
    },
    checkName(val) {
      let code = this.$commonUtils.checkName(val);
      if (code != "success") {
        Toast.fail(code);
        this.reallyName = "";
      }
    },
    checkTourGuide(val) {
      let code = this.$commonUtils.tourist(val);
      if (code != "success") {
        Toast.fail("请检查导游证号");
        this.tourGuideCode = "";
      }
    },
    closeRead() {
      this.readShow = false;
    },
  },
};
</script>

<style scoped>
    .register >>>  .van-nav-bar--fixed {
        margin-top: 10px;
        top: 10px;
    }
.customLine {
  width: 100%;
  height: 1px;
  background-color: #ebedf0;
}
.van-cell:not(:last-child)::after {
  position: absolute;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
  right: 0;
  bottom: 0;
  left: 0.42667rem;
  border-bottom: none;
  -webkit-transform: scaleY(0.5);
  -ms-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.form {
  width: 100%;
  margin-top: 40px;
}
.register {
  min-height: 100vh;
  background-color: #fff;
  padding: 0px 10px;
}
.register >>> .van-tab {
  color: #999999;
  font-size: 16px;
}
.register >>> .van-cell {
  height: 58px;
  font-size: 15px;
  color: #333333;
  font-family: MicrosoftYaHei;
  /*font-weight: bold;*/
  line-height: 38px;
}
.van-cell {
  border-bottom: 1px solid#ebedf0;
}
.customField {
    border-bottom: none;
}
.tour .van-cell:nth-child(7) {
  border-bottom: none;
}
.register >>> .van-nav-bar__title {
  font-size: 17px;
  font-weight: bold;
  color: #333333;
}
.register >>> .van-field__control {
  text-align: right;
  font-weight: 400;
}
/*.register >>> .van-field__left-icon{*/
/*margin-right: 15px;*/
/*}*/
.checkSure {
  width: 8px;
  height: 8px;
}
.picSpecifi {
  color: #999999;
  font-weight: 400;
}
.tour {
  background-color: #fff;
}
.tour >>> .van-field__label {
  width: 100%;
  /*padding-left: 10px;*/
}
.tour >>> .van-cell:not(:last-child)::after {
  border: none;
}
.cell >>> .van-cell:not(:last-child)::after {
  border: none;
}
.uploadMain {
  /*width: 100%;*/
  padding-left: 10px;
  padding-right: 10px;
  /*border-bottom: 1px solid #ebedf0;*/
  padding-bottom: 19px;
  box-sizing: border-box;
}
.upload {
  padding-left: 26px;
  width: 78px;
  height: 78px;
}
.uploadfs {
  font-size: 11px;
  color: #999999;
}
.uploadImg {
  width: 18px;
  height: 18px;
}
.upload >>> .van-uploader__wrapper {
  border: 1px dashed rgba(0, 0, 0, 0.15);
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.04);
  width: 78px;
  height: 78px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.upload >>> .van-uploader__input-wrapper {
  text-align: center;
}
.cell {
  height: 78px;
  background-color: #fff;
}

.cell >>> .van-field__label {
  width: auto;
}
.toVertify img {
  width: 12px;
  height: 12px;
  vertical-align: center;
  margin-left: 26px;
  margin-right: 5px;
}
.toVertify {
  font-size: 12px;
  color: #999999;
}
.btn {
  margin-top: 16px;
  margin-bottom: 80px;
  font-size: 16px;
}
.btn >>> .van-button--normal {
  font-size: 16px;
}
.sign {
  margin-top: 31px;
  /*padding-left: 10px;*/
}
.sign >>> .van-checkbox__label {
  font-size: 13px;
}
.register >>> .van-nav-bar .van-icon {
  color: #999999;
}
.upload >>> .van-uploader__preview-image {
  border-radius: 3px;
  margin-top: 8px;
  background: rgba(0, 0, 0, 0.04);
  width: 78px;
  height: 78px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/*.teamType .van-cell::before{*/
/*border: 1px solid #ebedf0;*/
/*}*/
</style>
