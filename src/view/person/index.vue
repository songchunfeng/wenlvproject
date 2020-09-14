<template>
  <div>
    <keep-alive>
      <router-view />
    </keep-alive>
    <van-tabbar route>
      <van-tabbar-item to="preList">
        <template #icon="props">
          <img :src="props.active ? '../../assets/images/个人 -未选中.png' : '../../assets/images/首页已选择.png'" />
        </template>
        首页
      </van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/perUser">用户中心</van-tabbar-item>
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
  data () {
    return {
      active: 0,
      icon: {
        active: '../../assets/images/个人 -未选中.png',
        inactive: '../../assets/images/首页已选择.png',
      },
    }
  }
};
</script>

<style>
</style>