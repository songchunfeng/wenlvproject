<template>
    <div class="statusList">
        <div class="status" v-for="(item,index) in status" :key="index" @click="getStatus(item)">
            <div>{{item.title}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "dropMenu.vue",
        data(){
            return{
                status:[
                    {title:'全部状态',value:6},
                    {title:'未验票',value:0},
                    {title:'已验票',value:1},
                    {title:'已改签' , value:2},
                    {title:'逾期作废',value:3},
                    {title:'退订预约',value:4}
                    ],
                nowStatus:'全部状态',
            }
        },
        methods:{
            getStatus(item){
                this.$emit('getStatus',item)
                // console.log(item)
            }
        }
    }
</script>

<style scoped>
    .statusList{
       border-radius: 10px;
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
