<template>
  <!--修改密码-->
  <div class="editPassword">
    <van-form @submit="onSubmit" :show-error-message="false">
      <van-field
        v-model="passWord"
        type="password"
        placeholder="输入新密码"
        :rules="[{ required: true, message: '请填写密码' }]"
        @blur="checkpassword(passWord)"
      />
      <van-field
        v-model="newPassWord"
        type="password"
        placeholder="再次输入新密码"
        :rules="[{ required: true, message: '请再次填写密码' }]"
        @blur="checkpassword(newPassWord)"
      />
      <div class="btn">
        <van-button round block type="info" native-type="submit">修改</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form, Field, Button, Toast } from "vant";
export default {
  name: "editPassword",
  components: {
    "van-form": Form,
    "van-field": Field,
    "van-button": Button,
    Toast: Toast,
  },
  data() {
    return {
      passWord: "",
      newPassWord: "",
    };
  },
  methods: {
    onSubmit() {
      if (this.passWord === this.newPassWord) {
        let params = {
          newPassWord: this.newPassWord,
          passWord: this.passWord,
        };
        this.$axios({
          url: "/api/user/updateUser",
          method: "post",
          data: params,
          headers: {
            Authorization: this.$commonUtils.getSessionItem("token"),
          },
        })
          .then((res) => {
            if (res.code == 20000) {
              Toast.success(res.message);
              this.$router.push("/login");
              this.$commonUtils.clear();
            } else {
              Toast.fail(res.message);
            }
          })
          .catch((err) => {
            Toast(err);
          });
      } else {
        Toast.fail("两次密码输入不一致，请重新输入");
      }
    },
    checkpassword(val) {
      let code = this.$commonUtils.checkPassword(val);
      if (code == "fail") {
        Toast.fail("请输入六位以上数字字母组合");
      }
    },
  },
};
</script>

<style scoped>
.editPassword {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #fff;
  height: 90vh;
}
.editPassword >>> .van-cell {
  width: 355px;
  height: 44px;
  border-radius: 22px;
  border: 1px solid #dddddd;
  margin-top: 18px;
  padding-left: 27px;
  font-size: 15px;
}
.btn {
  margin-top: 53px;
}
.btn >>> .van-button--normal {
  font-size: 16px;
}
</style>
