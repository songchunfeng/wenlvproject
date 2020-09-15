<!--退改记录-->
<template>
    <div class="changeRecord">
        <div class="chooseStatus">全部状态 <i class="i_img"></i></div>
        <van-cell-group>
           <div class="listHead"><span>1</span><span>操作</span></div>
            <van-cell title="订单编号" value="内容" />
            <van-cell title="预约凭证" value="内容" />
            <van-cell title="预定景区" value="内容" />
            <van-cell title="创建时间" value="内容" />
            <van-cell title="修改时间" value="内容" />
        </van-cell-group>
    </div>
</template>

<script>
    import { Cell, CellGroup } from 'vant'
    export default {
        name: "changeRecord.vue",
        components:{
            "van-cell-group" : CellGroup,
            "van-cell" :Cell
        },
        data(){
            return{
                list:[
                    {}
                ]
            }
        }
    }
</script>

<style scoped>
    .changeRecord{
        min-height: 100%;
        height: auto;
        background: #F9F9F9;
    }
    .chooseStatus{
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
       border-bottom: 10px solid #F9F9F9;
   }
    .i_img{
        width: 10px;
        height: 10px;
        display: inline-block;
        background-image: url("../../../assets/images/showUp.png");
        background-size: 100% 100%;
    }
</style>
