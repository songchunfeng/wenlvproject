<template>
  <div class="ListBox">
    <div class="headBanner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img style="width:100%;" src="../../../assets/images/轮播1.png" alt />
        </van-swipe-item>
        <van-swipe-item>
          <img style="width:100%;" src="../../../assets/images/轮播2.png" alt />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="noticeBox" @click="readShow = true">
      <div class="noticeLeft">
        <div class="iconRead">
          <img src="../../../assets/images/预约须知.png" alt />
        </div>
        <div class="noticeText">预约须知</div>
      </div>
      <div class="noticeRight">
        <img src="../../../assets/images/前往.png" alt />
      </div>
    </div>

    <div class="listTitle">景区列表</div>
    <van-list
      style="margin-bottom: 50px;width: 100%"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getList"
    >
      <div class="List">
        <div class="listItem" v-for="(item,index) in list" :key="index" @click="toScenicInfo(item)">
          <div class="scenicImg">
            <img :src="item.app_r_url" alt />
          </div>
          <div class="scenicName">{{item.spot_name}}</div>
        </div>
      </div>
    </van-list>
    <!-- <van-loading class="top" v-show="loading" size="24px" color="#1989fa">加载中...</van-loading> -->

    <van-popup
      :safe-area-inset-bottom="true"
      :overlay="false"
      position="right"
      v-model="readShow"
      :style="{ height: '100%', width: '100%'}"
    >
      <read @close="closeRead"></read>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Loading, List } from "vant";
import { Swipe, SwipeItem } from "vant";
import { urlConfig } from "../../../util/httpConfig/ipConfig";
import read from "../../person/home/readText";
export default {
  name: "teamList",
  components: {
    "van-popup": Popup,
    "van-loading": Loading,
    "van-list": List,
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem,
    read,
  },
  data() {
    return {
      readShow: false,
      list: [],
      loading: false,
      finished: false,
      page: 1,
      limit: 10,
    };
  },
  methods: {
    closeRead() {
      this.readShow = false;
    },
    getList() {
      this.$axios({
        url: '/api/spot/applist',
        method: "get",
        params: {
          limit:this.limit,
          page:this.page,
          spotname: "",
        },
      })
        .then((res) => {
          console.log(res);
          this.loading = false;
          const { rows } = res.data;
          this.list.push(...rows);
          if (rows.length) {
            this.page++;
          } else {
            this.finished = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });

      
    },
    toScenicInfo(item) {
      window.sessionStorage.setItem("scenicId", item.id);
      this.$router.push("/teamApp");
    },
  },
};
</script>

<style lang="less" scoped>
.ListBox {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
    /deep/ .van-nav-bar--fixed {
        margin-top: 10px;
        top: 10px;
    }
  .headBanner {
    width: 100%;
    
  }
  .noticeBox {
    box-sizing: border-box;
    margin-top: 15px;
    width: 355px;
    height: 59px;
    background: #e9f3ff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 27px;
    padding-right: 25px;
    .noticeLeft {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .iconRead {
        width: 40px;
        height: 39px;
        margin-right: 16px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .noticeText {
        font-size: 16px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #3983e5;
        line-height: 22px;
        letter-spacing: 1px;
      }
    }
    .noticeRight {
      width: 7px;
      height: 12px;
      img {
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
    }
  }
  .listTitle {
    width: 100%;
    box-sizing: border-box;
    padding-left: 10px;
    margin-top: 22px;
    font-size: 16px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: #333333;
    line-height: 22px;
    letter-spacing: 1px;
  }
  .List {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 10px;
    .listItem {
      width: 173px;
      min-height: 213px;
      margin-top: 15px;
      background: #ffffff;
      box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.15);
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .scenicImg {
        width: 100%;
        height: 173px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .scenicName {
        width: 100%;
        padding: 9px 11px 13px 11px;
        box-sizing: border-box;
        flex: 1;
        font-size: 15px;
        font-family: MicrosoftYaHei;
        color: #333333;
        line-height: 19px;
        letter-spacing: 1px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .top {
    margin-bottom: 50px;
  }
}
</style>
