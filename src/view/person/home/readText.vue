<template>
  <div class="readText">
      <van-nav-bar fixed title="预约须知" @click-left="onClickLeft">
        <template #left>
          <img style="width:8px;height:14px" src="../../../assets/images/返回.png" alt />
        </template>
      </van-nav-bar>
    
    <div class="textContent">
      <p>尊敬的游客：</p>
      <p class="text">为确保您顺利完成景区门票预约操作，避免因操作失误给您带来不必要的麻烦，请认真阅读并确保您理解和接受以下条款：</p>
      <p class="text">1、目前可通过“青海省文化和旅游厅官方网站”、“青海省文化旅游官方微信公众号”的指定入口“大美青海-青海省文化和旅游厅官方景区票务预约平台”，进入提前预约门票，以免耽误您的行程。</p>
      <p class="text">2、游客需提前1-7天在“大美青海-青海省文化和旅游厅官方景区票务预约平台”进行实名预约。</p>
      <p class="text">3、单笔门票预约订单最大预约人数为5人，预约时需按一人一证录入信息。团队票每次可预约20人，预约时需上传人员信息附件。</p>
      <p class="text">4、预约成功后，系统自动向预留联系人发送预约成功消息通知，请妥善保存。</p>
      <p class="text">5、电子票预约成功后，预约游览当日内使用有效。</p>
      <p class="text">6、本预约平台仅提供门票预约服务，游客到达景区时，需在景区指定地点凭借预约成功短信、预约号码及预约订单等凭证，支付景区门票费用，兑换相应的景区门票后，检票入园。</p>
      <p class="text">7、游客务必在预约时间、验票时间内抵达景区，请务必携带本人预约证件原件（身份证、护照）前往景区指定地点兑换景区门票；预约特殊票的游客需携带预约证件（身份证、护照），并额外携带优惠证件（如军官证、老年证、记者证等），未预约游客现场不售票。</p>
      <p class="text">8、游客可提前1-7天在系统内改签或退订预约，多人订单可进行改签、退订。</p>
      <p class="text">9、游客须在预约时间段到景区参观，如无法按时到达景区，需改签或退订本次预约，预约游览日当天无法改签，游客需自行发起退订申请，重新预约非当日门票。</p>
      <p class="text">10、预约门票未兑票入园，逾期未能修改或取消，系统将自动默认该账号爽约1次，累计3次爽约的账号，将在30天内不能预约。</p>
    </div>
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  name: "readText",
  components: {
    "van-nav-bar": NavBar,
  },
  methods: {
    onClickLeft() {
        this.$emit('close')
    },
  },
};
</script>

<style lang="less" scoped>
.readText {
  width: 100%;
  position: relative;
    padding-top: 10px;
    box-sizing: border-box;
  .textContent {
    width: 100%;
    margin-top: 56px;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    p {
      font-size: 15px;
      font-family: MicrosoftYaHei;
      color: #333333;
      line-height: 24px;
      letter-spacing: 1px;
    }
    .text {
        text-indent: 2em;
    }
  }
}
</style>
