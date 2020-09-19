<template>
  <div>
    <router-view />
    <van-tabbar v-model="active" route @click="tab">
      <van-tabbar-item to="/preList">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/perUser">
        <span>用户中心</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
      <!-- <van-tabbar-item to="/perUser">
        <span>用户中心</span>
        <template #icon="props">
          <img :src="props.active ? icon.user : icon.inuser" />
        </template>
      </van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  name: "perLogin",
  components: {
    "van-tabbar": Tabbar,
    "van-tabbar-item": TabbarItem,
  },
  data() {
    return {
      active: 0,
      icon: {
        active: require("../../assets/images/首页已选择.png"),
        inactive: require("../../assets/images/个人 -未选中.png"),
        user: require("../../assets/images/首页已选择 (2).png"),
        inuser: require("../../assets/images/个人 -未选中(1).png"),
      },
    };
  },
  methods:{
    tab(){
      console.log(this.active);
    }
  }
};
</script>

<style lang="less" scoped>
.van-tabbar {
  border-top: 1px solid #eee;
}
</style>
