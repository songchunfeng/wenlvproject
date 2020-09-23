<template>
  <div class="registerText">
    <van-nav-bar title="旅行社注册" fixed left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="form">
      <van-form @submit="onSubmit" :show-error-message="false">
        <div class="usic">
          <van-field
            v-model="usci"
            class="bottonLine"
            name="统一社会信用代码"
            label="统一社会信用代码"
            placeholder="统一社会信用代码"
            :rules="[{ required: true, message: '请填写统一社会信用代码' }]"
            @blur="getUsciMsg(usci)"
          >
            <template #left-icon>
              <img src="../../../assets/images/必选.png" alt class="checkSure" />
            </template>
          </van-field>
        </div>
        <van-field
          v-model="companyName"
          class="bottonLine"
          name="公司名称"
          label="公司名称"
          placeholder="公司名称"
          :rules="[{ required: true, message: '请填写公司名称' }]"
        >
          <template #left-icon>
            <img src="../../../assets/images/必选.png" alt class="checkSure" />
          </template>
        </van-field>
        <div class="tour">
          <van-field>
            <template #label>
              <span class="custom-title">工商执照</span>
              <span class="picSpecifi">（图片规格：3M以下，图片清晰）</span>
            </template>
            <template #left-icon>
              <img src="../../../assets/images/必选.png" alt class="checkSure" />
            </template>
          </van-field>
          <div class="uploadMain">
            <div class="upload">
              <van-uploader
                :after-read="afterReadbusiness"
                :max-count="1"
                @delete="fileDeletebusiness"
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
        </div>
        <div class="tour">
          <van-field>
            <template #label>
              <span class="custom-title">旅游许可证</span>
              <span class="picSpecifi">（图片规格：3M以下，图片清晰）</span>
            </template>
            <template #left-icon>
              <img src="../../../assets/images/必选.png" alt class="checkSure" />
            </template>
          </van-field>
          <div class="uploadMain">
            <div class="upload">
              <van-uploader
                :after-read="afterReadtour"
                :max-count="1"
                @delete="fileDeletetour"
                :preview-image="true"
                v-model="list1"
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
        </div>
        <div class="tour">
          <van-field>
            <template #label>
              <span class="custom-title">行程单模板</span>
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
                v-model="list2"
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
        </div>
        <div class="cell">
          <van-field
            v-model="telephone"
            name="联系电话"
            label="联系电话"
            class="bottonLine"
            placeholder="请输入联系电话"
            :rules="[{ required: true,pattern:patternPhone, message: '请输入联系电话' }]"
            @blur="checkPhone"
          >
            <template #left-icon>
              <img src="../../../assets/images/必选.png" alt class="checkSure" />
            </template>
          </van-field>
        </div>
        <div class="btn">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
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
  Uploader,
  Tabbar,
  TabbarItem,
  Dialog,
} from "vant";
export default {
  name: "index.vue",
  components: {
    "van-nav-bar": NavBar,
    "van-form": Form,
    "van-field": Field,
    "van-button": Button,
    "van-uploader": Uploader,
    "van-tabbar": Tabbar,
    "van-tabbar-item": TabbarItem,
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      patternPhone: "", // 手机校验
      companyName: "", //企业名称
      businessLicenseUrl: "", //工商执照
      itineraryTemplateUrl: "", //行程单模板
      telephone: "", //联系电话,
      tourPermissionUrl: "", //旅游许可证
      usci: "", //统一社会信用代码,
      list: [],
      list1: [],
      list2: [],
      icon: {
        active: require("../../../assets/images/首页已选择.png"),
        inactive: require("../../../assets/images/个人 -未选中.png"),
        user: require("../../../assets/images/首页已选择 (2).png"),
        inuser: require("../../../assets/images/个人 -未选中(1).png"),
      },
      activeFoot: 0,
    };
  },
  created() {
    this.patternPhone = this.$constants.REG.tel; // 手机号校验
   
  },
  methods: {
    onSubmit() {
      if (
        this.businessLicenseUrl != "" &&
        this.itineraryTemplateUrl != "" &&
        this.tourPermissionUrl != ""
      ) {
        Toast({
          message: "信息提交中",
          loadingType: "spinner",
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁止点击背景
        });
        let params = {
          businessLicenseUrl: this.businessLicenseUrl,
          companyName: this.companyName,
          itineraryTemplateUrl: this.itineraryTemplateUrl,
          telephone: this.telephone,
          tourPermissionUrl: this.tourPermissionUrl,
          usci: this.usci,
        };
        this.$axios({
          url: "/api/teamInfo/touristAgencyRegister",
          method: "post",
          data: params,
        })
          .then((res) => {
            Toast.clear();
            // console.log(res)
            if (res.code == 20000) {
              Dialog.alert({
                message: "资料已提交审核。\n审核通过后，将以短信形式告知。",
              }).then(() => {
                this.$router.push("/teamRegister");
              });
            } else {
              Toast.clear();
              Toast.fail(res.message);
            }
          })
          .catch((err) => {
            Toast.clear();
            console.log(err);
          });
      }
    },
    onClickLeft() {
      this.$router.push("/teamRegister");
    },
    //工商
    afterReadbusiness(file) {
      var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
      formData.append("file", file.file); //接口需要传的参数
      this.$axios
        .post('/api/picture/getpictureid?msg=""', formData)
        .then((res) => {
          // console.log(res)
          this.businessLicenseUrl = res.data.rows[0];
        })
        .catch((err) => {
          Toast.fail(err);
        });
    },
    fileDeletebusiness() {
      this.businessLicenseUrl = "";
    },
    //旅游
    afterReadtour(file) {
      var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
      formData.append("file", file.file); //接口需要传的参数
      this.$axios
        .post('/api/picture/getpictureid?msg=""', formData)
        .then((res) => {
          // console.log(res)
          this.tourPermissionUrl = res.data.rows[0];
        })
        .catch((err) => {
          Toast.fail(err);
        });
    },
    fileDeletetour() {
      this.tourPermissionUrl = "";
    },
    afterRead(file) {
      var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
      formData.append("file", file.file); //接口需要传的参数
      this.$axios
        .post('/api/picture/getpictureid?msg=""', formData)
        .then((res) => {
          // console.log(res)
          this.itineraryTemplateUrl = res.data.rows[0];
        })
        .catch((err) => {
          Toast.fail(err);
        });
    },
    fileDelete() {
      this.itineraryTemplateUrl = "";
    },
    onOversize() {
      // console.log(file);
      Toast.fail("文件大小不能超过 3M");
    },
    beforeRead(file) {
      if (file.type !== "image/jpeg") {
        Toast("请上传 jpg 格式图片");
        return false;
      }
      return true;
    },
    getUsciMsg(val) {
      let code = this.$commonUtils.socitycode(val);
      if (code != "success") {
        Toast.fail("请检查统一社会信用代码");
        this.usci = "";
      }
    },
    checkPhone(val) {
      let check = this.$commonUtils.checkPhoneNo(this.telephone);
      if (check != "success") {
        Toast(this.$commonUtils.checkPhoneNo(this.telephone));
        this.telephone = "";
      }
    },
  },
};
</script>

<style scoped>
.bottonLine {
  border-bottom: 1px solid #ebedf0;
}
.registerText >>> .van-nav-bar--fixed {
  /* margin-top: 10px; */
  top: 10px;
}
.van-cell:not(:last-child)::after {
  border: none;
}
.registerText >>> .van-tab {
  color: #999999;
  font-size: 16px;
}
.registerText {
  min-height: 100vh;
  background-color: #fff;
  padding: 0px 10px;
}
.registerText >>> .van-nav-bar .van-icon {
  color: #999999;
}
.registerText >>> .van-cell {
  height: 58px;
  font-size: 15px;
  color: #333333;
  padding: 10px 0px;
  font-family: MicrosoftYaHei;
  /*font-weight: bold;*/
  line-height: 38px;
}
.form {
  margin-top: 40px;
}
.registerText >>> .van-nav-bar__title {
  font-size: 17px;
  font-weight: bold;
  color: #333333;
}
.registerText >>> .van-field__control {
  text-align: right;
  font-weight: 400;
}
/*.registerText >>> .van-field__left-icon{*/
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
}
.tour >>> .van-cell:not(:last-child)::after {
  border: none;
}
.uploadMain {
  /*width: 100%;*/
  padding-left: 10px;
  padding-right: 10px;
  border-bottom: 0.02667rem solid #ebedf0;
  padding-bottom: 19px;
  box-sizing: border-box;
}
.upload {
  /*padding-left: 26px;*/
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
.tour >>> .van-uploader__preview-image {
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
.btn {
  margin-top: 16px;
  margin-bottom: 80px;
  font-size: 16px;
}
.btn >>> .van-button--normal {
  font-size: 16px;
}
.registerText .cell >>> .van-cell {
  /* height: 76px; */
}
.usic >>> .van-field__label {
  width: auto;
}
</style>
