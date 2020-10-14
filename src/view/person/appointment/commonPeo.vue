<template>
  <div class="comPeo">
    <div class="comPeoTitle">
      <div class="btn" @click="close">取消</div>
      <div class="lable">常用出行人</div>
      <div class="btn" @click="checkComPeo">完成</div>
    </div>
    <van-checkbox-group v-model="check">
      <div class="checkCell" v-for="(item,index) in comPeoList" :key="index">
        <div class="name">{{item.surname}}</div>
        <van-checkbox :name="item.id"></van-checkbox>
      </div>
    </van-checkbox-group>
  </div>
</template>

<script>
import { Checkbox, CheckboxGroup, Toast, Dialog } from "vant";
export default {
  name: "commonPeo",
  props: {
    comPeoList: Array,
    addPeo:Array
  },
  components: {
    "van-checkbox": Checkbox,
    "van-checkbox-group": CheckboxGroup,
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      check: [],
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    checkComPeo() {
      if (this.check.length + this.addPeo.length > 5) {
        Dialog({ message: "最多填写5位出行人" });
      } else {
        let arr = [];
        for (let i = 0; i < this.check.length; i++) {
          for (let j = 0; j < this.comPeoList.length; j++) {
            if (this.check[i] == this.comPeoList[j].id) {
              arr.push(this.comPeoList[j]);
            }
          }
        }
        this.$emit("checkComPeo", arr);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.comPeo {
  width: 100%;
  .comPeoTitle {
    width: 100%;
    padding: 8px 15px 8px 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dddddd;
    .btn {
      font-size: 17px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #3983e5;
      line-height: 26px;
    }
    .lable {
      font-size: 17px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 26px;
    }
  }
  .checkCell {
    width: 100%;
    padding: 5px 15px 5px 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .name {
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 23px;
    }
  }
}
</style>