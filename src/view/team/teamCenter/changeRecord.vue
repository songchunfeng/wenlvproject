<!--退改记录-->
<template>
    <div class="changeRecord">
        <div class="chooseStatus">
            <div @click="changeIcon" :class="show ? 'fsActive' : ''">{{nowStatus}}
                <i class="i_img"  v-show="!show"></i>
                <i class="i_imgActive"  v-show="show"></i>
            </div>
            <div class="statusList"  v-show="show">
                <DropMenu @getStatus="getStatus"></DropMenu>
            </div>
        </div>
        <div class="group">
            <van-cell-group>
                <div class="listHead"><span>1</span><span>操作</span></div>
                <van-cell title="订单编号" value="内容" />
                <van-cell title="预约凭证" value="内容" />
                <van-cell title="预定景区" value="内容" />
                <van-cell title="创建时间" value="内容" />
                <van-cell title="修改时间" value="内容" />
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    import { Cell, CellGroup } from 'vant'
    import DropMenu from '../../person/userCenter/dropMenu'
    export default {
        name: "changeRecord.vue",
        components:{
            "van-cell-group" : CellGroup,
            "van-cell" :Cell,
            "DropMenu" :DropMenu
        },
        data(){
            return{
                list:[
                    {}
                ],
                status:['全部状态','未验票','已验票','已改签','逾期作废','退订预约'],
                nowStatus:'全部状态',
                show:false,
            }
        },
        methods:{
            changeIcon(){
                this.show=!this.show;
            },
            getStatus(e){
                // console.log(e)
                this.nowStatus=e;
            }
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
        width: 10px;
        height: 7px;
        display: inline-block;
        background-image: url("../../../assets/images/showUp.png");
        background-size: 100% 100%;
        background-position: 0px ;
    }
    .i_imgActive{
        width: 10px;
        height: 7px;
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
