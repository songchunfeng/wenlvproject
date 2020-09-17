<template>
  <div>
      <router-view/>
      <van-tabbar route>
      <van-tabbar-item icon="wap-home-o" to="/teamList">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/teamUser">用户中心 </van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>

import { Tabbar, TabbarItem } from 'vant'
export default {
  name:'teamLogin',
  components:{
    'van-tabbar':Tabbar,
    'van-tabbar-item':TabbarItem
  }
}
</script>

<style>

</style>
