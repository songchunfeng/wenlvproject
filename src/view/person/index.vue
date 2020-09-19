<template>
  <div>
      <router-view />
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/preList">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="search" :to="tabPath">
        <span>用户中心</span>
        <template #icon="props">
          <img :src="props.active ? icon.user : icon.inuser" />
        </template>
      </van-tabbar-item>
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
        tabPath:''
    };
  },
    mounted() {
            let user = JSON.parse(sessionStorage.getItem('loginMsg'))
            if(window.sessionStorage.getItem('token') && user.userType ==0 ){
                  this.tabPath='/perUserCenter'
            }else{
                this.tabPath='/perUser'
            }
    }
};
</script>

<style>
</style>
