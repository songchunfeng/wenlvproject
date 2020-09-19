<template>
  <div>
      <router-view/>
      <van-tabbar v-model="active" route >
          <van-tabbar-item to="/teamList">
              <span>首页</span>
              <template #icon="props">
                  <img :src="props.active ? icon.active : icon.inactive" />
              </template>
          </van-tabbar-item>
          <van-tabbar-item icon="search" :to="tabPath" >
              <span>用户中心</span>
              <template #icon="props">
                  <img :src="props.active ? icon.user : icon.inuser" />
              </template>
          </van-tabbar-item>
      </van-tabbar>
      <!--<van-tabbar route>-->
      <!--<van-tabbar-item icon="wap-home-o" to="/teamList">首页</van-tabbar-item>-->
      <!--<van-tabbar-item icon="comment-o" to="/teamUser">用户中心 </van-tabbar-item>-->
      <!--</van-tabbar>-->
  </div>
</template>

<script>

import { Tabbar, TabbarItem } from 'vant'
export default {
  name:'teamLogin',
  components:{
    'van-tabbar':Tabbar,
    'van-tabbar-item':TabbarItem
  },
    watch:{
      tabPath(){
          console.log(1)
          this.turn();
      },
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
    methods:{
      turn(){
          let user = JSON.parse(sessionStorage.getItem('loginMsg'));
          console.log(window.sessionStorage.getItem('token') && user.userType ==1,'1')
          if(window.sessionStorage.getItem('token') && user.userType ==1 ){
              this.tabPath='/teamUserCenter'
          }else{
              this.tabPath='/teamUser'
          }
      },
    },
    mounted() {
      this.turn();
    },

}
</script>

<style>

</style>
