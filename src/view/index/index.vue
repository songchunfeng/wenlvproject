<template>
  <div class="home">
    <div class="box">
      <div class="logoBox">
        <div class="logo">
          <img src="../../assets/images/logo.png" alt />
        </div>
        <div class="title">大美青海</div>
        <div class="platform">青海省文化和旅游厅官方景区票务预约平台</div>
      </div>
      <div class="btnBox">
        <div class="btn" @click="toPersonal">
          <div class="btnIconPer">
            <img class="img" src="../../assets/images/个人.png" alt />
          </div>
          <div class="btnText">个人预约</div>
        </div>
        <div class="btn" @click="toTeam">
          <div class="btnIcon">
            <img class="img" src="../../assets/images/团队.png" alt />
          </div>
          <div class="btnText">团队预约</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'home',
    methods:{
        toPersonal () {
            this.$router.push('./preList')
        },
        toTeam () {
            this.$router.push('./teamList')
        }
    }
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background: url("../../assets/images/底图.png") no-repeat;
  background-size: cover;
  .box {
    width: 100%;
    height: 100%;
    background: rgba(51, 51, 51, 0.7);
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    .logoBox {
      width: 100%;
      /*height: 00px;*/
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
        color: #ffffff;
        line-height: 23px;
        letter-spacing: 2px;
      }
      .platform {
        font-size: 15px;
        margin-top: 21px;
        font-family: PingFang-SC-Regular, PingFang-SC;
        font-weight: 400;
        color: #ffffff;
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
        .btnIconPer {
          width: 16px;
          height: 18px;
          margin-right: 14px;
          .img {
            width: 100%;
            height: 100%;
            vertical-align: super;
          }
        }
        .btnIcon {
          width: 18px;
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
