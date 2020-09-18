<!--退改记录-->
<template>
    <div class="changeRecord">
        <!--<div class="chooseStatus" id="chooseStatus">-->
            <!--<div @click="changeIcon" :class="show ? 'fsActive' : ''">{{nowStatus}}-->
                <!--<i class="i_img"  v-show="!show"></i>-->
                <!--<i class="i_imgActive"  v-show="show"></i>-->
            <!--</div>-->
                <!--<div class="statusList"  v-show="show">-->
                    <!--<DropMenu @getStatus="getStatus"></DropMenu>-->
                <!--</div>-->
        <!--</div>-->
        <div class="group">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="getList"
            >
            <div v-for="(item,index) in list" :key="index" style="background-color: #fff">
               <div class="listHead"><span>{{index+1}}</span><span>{{getTicket(item.ticket)}}</span></div>
                <van-cell title="订单编号" :value="item.id" />
                <van-cell title="预约凭证" :value="item.voucher" />
                <van-cell title="预定景区" :value="item.spotName" />
                <van-cell title="创建时间" :value="item.gmtCreate" />
                <van-cell title="修改时间" :value="item.gmtModified" />
            </div>
            </van-list>
        </div>
    </div>
</template>

<script>
    import { Cell, CellGroup ,List ,Popup} from 'vant'
    import DropMenu from './dropMenu'
    export default {
        name: "changeRecord.vue",
        components:{
            "van-cell-group" : CellGroup,
            "van-cell" :Cell,
            "DropMenu" :DropMenu,
            "van-list" :List,
        },
        data(){
            return{
                list:[

                ],
                status:['全部状态','未验票','已验票','已改签','逾期作废','退订预约'],
                nowStatus:'全部状态',
                ticket:5,
                show:false,
                loading:false,
                finished:false,
                limit: 5,
                page: 1,
                total:0

            }
        },
        methods:{
            changeIcon(){
               this.show=!this.show;
            },
            getTicket(item){
                //0：未验票   1：已验票  2 ：已改签  3：逾期   4 退票   5：退改记录
                let str ='';
                switch(item) {
                    case 0:
                        str= '未验票';
                        break;
                    case 1:
                        str='已验票';
                        break;
                    case 2:
                        str = '已改签';
                        break;
                    case 3:
                        str = '逾期作废';
                        break;
                    case 4:
                        str = '退订预约';
                        break;
                    case 5 :
                        str='全部状态'
                        break;
                }
                return str;

            },
            getStatus(e){
                // console.log(e)
                this.nowStatus=e.title;
                this.ticket=e.value;
                this.show=false;
                this.list=[];
                this.page=1;
                this.getList();

            },
            getroadList(){
                this.$axios({
                    url: '/api/user-reserve/list',
                    method: "get",
                    headers:{
                        Authorization:this.$commonUtils.getSessionItem('token')
                    },
                    params: {
                        limit:this.limit,
                        page:this.page,
                        ticket: 5,
                    },
                })
                .then((res) => {
                    this.loading = false;
                    this.total = res.data.total;
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
            getList() {
                // this.page++;
                this.getroadList();

            },
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .changeRecord{
        min-height: 100%;
        background: #F9F9F9;
    }
    .chooseStatus{
        position: relative;
        height: 36px;
        font-size: 13px;
        font-family: MicrosoftYaHei;
        color: #999999;
        text-align: right;
        padding-right: 10px;
        line-height: 36px;
    }
    .listHead{
        height: 39px;
        width: 100%;
        font-size: 15px;
        line-height: 39px;
        border-bottom: 1px solid #EEEEEE;
        background-color: #fff;
    }
    .listHead span:first-child{
        padding-left: 10px;
        color: #999999;
    }
    .listHead span:last-child{
        float: right;
        margin-right: 10px;

    }
    .changeRecord >>> .van-cell{
        padding-left: 10px;
        padding-right: 10px;
        font-size: 15px;
        border: 0px;
    }
   .changeRecord >>>.van-cell:not(:last-child)::after{
       border: 0px;
   }
   .changeRecord >>>.van-cell:last-child::after{
       border: 0;
   }
    .i_img{
        width: 15px;
        height: 8px;
        display: inline-block;
        background-image: url("../../../assets/images/showUp.png");
        background-size: 100% 100%;
        background-position: 0px ;
    }
    .i_imgActive{
        width: 15px;
        height: 8px;
        display: inline-block;
        background-image: url("../../../assets/images/展开-灰.png");
        background-size: 100% 100%;
        background-position: 0px ;
    }
    .fsActive{
        color: #3983E5;
    }
    .group{
        margin-bottom: 10px;
    }
    .statusList{
        z-index: 100;
        background-color: #000000;
        position: absolute;
        right: 0;
    }
    .statusList .status{
        width: 101px;
        height: 39px;
        background: rgba(153,153,153,0.9);
        text-align: center;
        color: #fff;
        padding-left: 9px;
        padding-right: 9px;
    }
    .statusList .status div{
        color: #fff;
        text-align: center;
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        border-bottom: 1px solid #fff;
    }
    .statusList .status:last-child  div{
        border: none;
    }
</style>
