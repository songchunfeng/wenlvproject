<template>
  <div class="login">
    <van-nav-bar title="登录账号" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-tabs v-model="active">
      <van-tab title="密码登录">
        <div class="passlogin">
          <van-form @submit="onSubmit" :show-error-message="false">
            <van-field
              v-model="username"
              placeholder="手机号码"
              :rules="[{ required: true, message: '请填写用户名' }]"
              @blur="telBlur(username)"
            />
            <van-field
              v-model="password"
              type="password"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div class="yzm">
              <van-field
                v-model="code"
                placeholder="验证码"
                :rules="[{ required: true, message: '请填写用户名' }]"
              />
              <img :src="filePath" alt class="codeImg" @click="changecodeImg" />
            </div>
            <div class="btn">
              <van-button round block type="info" native-type="submit">登录</van-button>
            </div>
            <div class="bottomGn clearFix">
              <ul class="bottom clearFix">
                <li @click="forgetPassword">忘记密码</li>
                <li>|</li>
                <li @click="toRegister">注册</li>
              </ul>
            </div>
          </van-form>
        </div>
      </van-tab>
      <van-tab title="短信登录">
        <div class="msgLogin">
          <van-form @submit="onMsgSubmit" :show-error-message="false">
            <van-field
              v-model="msgUserName"
              placeholder="手机号码"
              :rules="[{ required: true, message: '请填写用户名' }]"
              @blur="telBlur(msgUserName)"
            />
            <div class="yzm">
              <van-field
                v-model="imgcode"
                placeholder="验证码"
                :rules="[{ required: true, message: '请填写用户名' }]"
              />
              <img :src="filePath" alt class="codeImg" @click="changecodeImg" />
            </div>
            <div class="yzm">
              <van-field
                v-model="msgcode"
                placeholder="短信验证码"
                :rules="[{ required: true, message: '请填写短信验证码' }]"
              />
              <div class="codeMsg" @click="sendMsg">发送验证码</div>
            </div>
            <div class="btn">
              <van-button round block type="info" native-type="submit">登录</van-button>
            </div>
            <div class="bottomGn clearFix">
              <ul class="bottom clearFix">
                <li @click="forgetPassword">忘记密码</li>
                <li>|</li>
                <li @click="toRegister">注册</li>
              </ul>
            </div>
          </van-form>
        </div>
      </van-tab>
    </van-tabs>
    <van-tabbar v-model="activeFoot" route>
      <van-tabbar-item to="/teamList">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/teamUser">
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
  Tab,
  Tabs,
  Form,
  Field,
  Button,
  Toast,
  Tabbar,
  TabbarItem,
} from "vant";
export default {
  components: {
    "van-nav-bar": NavBar,
    "van-tabs": Tabs,
    "van-tab": Tab,
    "van-form": Form,
    "van-field": Field,
    "van-button": Button,
    Toast: Toast,
    "van-tabbar": Tabbar,
    "van-tabbar-item": TabbarItem,
  },
  data() {
    return {
      active: 0, //tab
      username: "",
      password: "",
      code: "",
      filePath: "",
      msgcode: "", //短信登录
      imgcode: "", //短信登录
      msgUserName: "", //短信登录
      icon: {
        active: require("../../../assets/images/首页已选择.png"),
        inactive: require("../../../assets/images/个人 -未选中.png"),
        user: require("../../../assets/images/首页已选择 (2).png"),
        inuser: require("../../../assets/images/个人 -未选中(1).png"),
      },
      activeFoot: 0,
    };
  },
  methods: {
    //提交表单
    onSubmit() {
      let params = {
        imgCode: this.code,
        loginType: 0,
        type: 1,
        passWord: this.password,
        phoneCode: "",
        userName: this.username,
      };
      this.$axios({
        url: "/api/user/findUser",
        method: "get",
        params: { telphone: this.username, type: 1 },
      })
        .then((res) => {
          if (res.code !== 20001) {
            Toast.fail("此用户未注册，请先注册");
          } else {
            this.$axios({
              url: "/api/user/login",
              method: "post",
              data: params,
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => {
                if (res.code == 20000) {
                  this.$commonUtils.setSessionItem(
                    "token",
                    res.data.Authorization
                  );
                  this.$commonUtils.setSessionItem(
                    "loginMsg",
                    JSON.stringify(res.data.rows)
                  );
                  if (res.data.rows.userType == 1) {
                    this.$router.push("/teamList");
                  } else if (res.data.rows.userType == 0) {
                    this.$router.push("/preList");
                  }
                } else {
                  Toast.fail(res.message);
                  this.changecodeImg();
                  this.code = "";
                }
              })
              .catch((err) => {
                Toast(err);
              });
          }
        })
        .catch((err) => {
          Toast.fail(err);
        });
    },
    //短信登录
    onMsgSubmit() {
      let params = {
        imgCode: this.imgcode,
        loginType: 1,
        type: 1,
        passWord: "",
        phoneCode: this.msgcode,
        userName: this.msgUserName,
      };
      this.$axios({
        url: "/api/user/findUser",
        method: "get",
        params: { telphone: this.msgUserName, type: 1 },
      })
        .then((res) => {
          if (res.code !== 20001) {
            Toast.fail("此用户未注册，请先注册");
          } else {
            this.$axios({
              url: "/api/user/login",
              method: "post",
              data: params,
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => {
                if (res.code == 20000) {
                  this.$commonUtils.setSessionItem(
                    "token",
                    res.data.Authorization
                  );
                  this.$commonUtils.setSessionItem(
                    "loginMsg",
                    JSON.stringify(res.data.rows)
                  );
                  if (res.data.rows.userType == 1) {
                    this.$router.push("/teamList");
                  } else if (res.data.rows.userType == 0) {
                    this.$router.push("/preList");
                  }
                } else {
                  Toast.fail(res.message);
                  this.changecodeImg();
                  this.code = "";
                }
              })
              .catch((err) => {
                Toast(err);
              });
          }
        })
        .catch((err) => {
          Toast.fail(err);
        });
    },
    //获取短信验证码
    sendMsg() {
      if (this.msgUserName != "") {
        let params = {};
        params.telphone = this.msgUserName;
        this.$axios({
          url: "/api/user/sendRegisterSms",
          method: "get",
          params: params,
        })
          .then((res) => {
            if (res.code == 20000) {
              Toast.success("已发送");
            } else {
              Toast.fail(res.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        Toast("请输入手机号");
      }
    },
    telBlur(tel) {
      let code = this.$commonUtils.checkPhoneNo(tel);
      if (code != "success") {
        Toast("手机号输入有误，请重新输入");
      }
    },
    onClickLeft() {
      this.$router.push("/perUser");
    },
    changecodeImg() {
      this.$axios
        .get("/api/defaultKaptcha", { responseType: "arraybuffer" })
        .then((res) => {
          this.filePath =
            "data:image/jpeg;base64," +
            btoa(
              new Uint8Array(res).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
        })
        .catch((err) => {
          Toast(err);
        });
    },
    //忘记密码
    forgetPassword() {
      this.$router.push({ name: "findPassword", query: { type: 1 } });
    },
    toRegister() {
      this.$router.push("/teamRegister");
    },
  },
  mounted() {
    this.changecodeImg();
  },
};
</script>

<style scoped>
.login {
  min-height: 100vh;
  background-color: #ffffff;
}
.login >>> .van-tab--active {
  font-weight: bold;
}
.login >>> .van-tab {
  color: #999999;
  font-size: 16px;
}
.login >>> .van-nav-bar__title {
  font-size: 17px;
  font-weight: bold;
  color: #333333;
}
.login >>> .van-nav-bar .van-icon {
  color: #999999;
}
.login >>> .van-tabs__line {
  background-color: #3983e5;
}
.login >>> .van-tab--active {
  color: #3983e5;
}
.login >>> .van-cell {
  width: 355px;
  height: 44px;
  border-radius: 22px;
  border: 1px solid #dddddd;
  margin-top: 19px;
  padding-left: 27px;
  font-size: 15px;
}
.yzm {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.yzm >>> .van-cell {
  width: 256px;
  height: 44px;
}
.codeImg {
  width: 77px;
  height: 36px;
  display: inline-block;
  margin-top: 19px;
  margin-left: 13px;
}
.passlogin {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.msgLogin {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.btn {
  margin-top: 50px;
}
.bottomGn {
  width: 335px;
  margin-top: 23px;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.bottom {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.bottom li {
  display: inline-block;
  font-size: 13px;
  color: #666666;
  padding-right: 13px;
}
.codeMsg {
  color: #3983e5;
  width: 77px;
  height: 36px;
  display: inline-block;
  margin-top: 19px;
  margin-left: 13px;
  font-size: 15px;
  line-height: 36px;
}
</style>
