<template>
    <!--个人中心-->
    <div class="userCenter">
        <div class="top">
            <div class="topLeft">
                <div class="userName">{{username}}</div>
                <div class="userPhone">{{phone}}</div>
            </div>
            <div class="topRight">
                <van-button plain type="info" @click="exit">退出账号</van-button>
            </div>
        </div>
        <div class="content">
            <van-tabs v-model="active">
                <van-tab title="我的预约">
                    <user-appoint></user-appoint>
                </van-tab>
                <van-tab title="退改记录">
                    <change-record></change-record>
                </van-tab>
                <van-tab title="出行人处理">
                    <travel-record></travel-record>
                </van-tab>
                <van-tab title="修改密码">
                    <edit-password></edit-password>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    import { Button , Tab, Tabs} from 'vant';
    import EditPassword from  './editPassword'
    import UserAppoint from './userAppoint'
    import  ChangeRecord from  './changeRecord'
    import TravelRecord  from  './travelRecord'
    export default {
        name: "userCenter",
        components:{
            "van-button" :Button,
            "van-tabs" : Tabs,
            "van-tab" : Tab,
            "edit-password" :EditPassword,
            "user-appoint" :UserAppoint,
            "change-record" :ChangeRecord,
            "travel-record" :TravelRecord

        },
        data(){
            return{
                username:'用户名',
                phone:'13081054159',
                active: 0,
            }
        },
        methods:{
            exit(){
                window.sessionStorage.clear();
                this.$router.push('/')
            },
        },
        mounted() {
            let user= JSON.parse(sessionStorage.getItem('loginMsg'));
            this.username=user.userName;
            this.phone=user.telephone;
        }
    }
</script>

<style scoped>
    .userCenter{
        min-height: 100vh;
        width: 100%;
        background: #FFFFFF;
        box-sizing: border-box;
    }
    .top{
        height: 84px;
        width: 100%;
        background-color: #ffffff;
        display: flex;
        flex-direction: row;
        border-bottom: 10px solid #F9F9F9;
    }
    .topLeft{
        display: flex;
        flex-direction: column;
        padding-left: 10px;
        width: 60%;
    }
    .userName{
        font-size: 17px;
        color:#333333;
        font-weight: bold;
        margin-top: 16px;
        margin-bottom: 10px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    }
    .userPhone{
        font-size: 15px;
        font-family: MicrosoftYaHei;
        color: #666666;

    }
    .topRight{
        display: flex;
        flex-direction: row;
        flex: 1;
        height: 84px;
        justify-content: flex-end;
        padding-right: 10px;
        align-items: center;
    }
    .topRight>>>.van-button--normal{
        width: 90px;
        height: 31px;
        border-radius: 25px;
        border: 1px solid #3983E5;

    }
    .content{

    }
    .content >>>  .van-tab{
        color: #999999;
        font-size: 16px;
        height: 49px;
    }
    .content >>>.van-nav-bar__title{
        font-size: 17px;
        font-weight: 600;
        color: #333333;
    }
    .content >>> .van-nav-bar .van-icon{
        color: #999999;
    }
    .content >>> .van-tabs__line{
        background-color: #3983E5;
    }
    .content >>> .van-tab--active{
        color: #3983E5;
    }

</style>
