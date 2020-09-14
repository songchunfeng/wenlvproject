<template>
  <div>
      <keep-alive>
      <router-view/>
    </keep-alive>
      <van-tabbar route>
      <van-tabbar-item icon="wap-home-o" to="/preList">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/perUser">用户中心 </van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name:'perLogin',
  components:{
    'van-tabbar':Tabbar,
    'van-tabbar-item':TabbarItem
  }
}
</script>

<style>

</style>