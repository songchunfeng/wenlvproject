<template>
  <div class="home">
    <div class="box">
      <div class="logoBox">
        <div class="logo">
          <img src="../../../assets/images/logo.png" alt />
        </div>
        <div class="title">大美青海</div>
        <div class="platform">青海省文化和旅游厅官方景区票务预约平台</div>
      </div>
      <div class="btnBox">
        <div class="btn" @click="login">
          <div class="btnText" >登录</div>
        </div>
        <div class="btn"  @click="register">
          <div class="btnText">注册</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "teamUserCenter",
    methods:{
        login(){
            this.$router.push('/teamLogin')
        },
        register(){
            this.$router.push('/teamRegister')
        },
    },

};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  .box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    .logoBox {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .logo {
        width: 79px;
        height: 58px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        margin-top: 21px;
        font-size: 20px;
        font-family: PangMenZhengDao;
        color: #333333;
        line-height: 23px;
        letter-spacing: 2px;
      }
      .platform {
        margin-top: 21px;
        font-size: 15px;
        font-family: PingFang-SC-Regular, PingFang-SC;
        font-weight: 400;
        color: #999999;
        line-height: 20px;
        letter-spacing: 1px;
      }
    }
    .btnBox {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      .btn {
        margin-top: 21px;
        width: 355px;
        height: 44px;
        background: #3983e5;
        border-radius: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        .btnIcon {
          width: 16px;
          height: 18px;
          margin-right: 14px;
          .img {
            width: 100%;
            height: 100%;
            vertical-align: super;
          }
        }
        .btnText {
          font-size: 15px;
          font-family: MicrosoftYaHei;
          color: #ffffff;
          line-height: 20px;
          letter-spacing: 1px;
        }
      }
    }
  }
}
</style>
