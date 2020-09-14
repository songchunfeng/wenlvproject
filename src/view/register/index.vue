<template>

 <div class="register">
     <van-nav-bar  title="新用户注册"  left-arrow  @click-left="onClickLeft"></van-nav-bar>
      <div class="passlogin">
                <van-form @submit="onSubmit">
                    <van-field
                        v-model="username"
                        placeholder="手机号码"
                        :rules="[{ required: true, message: '请填写用户名' }]"
                    />
                     <div class="yzm">
                        <van-field
                            v-model="msgcode"
                            placeholder="短信验证码"
                            :rules="[{ required: true, message: '请填写短信验证码' }]"
                        />
                        <div class="codeMsg" @click="sendMsg">发送验证码</div>
                    </div>
                    <van-field
                        v-model="password"
                        type="password"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                    />
                    <van-field
                         v-model="password"
                         type="password"
                         placeholder="确认密码"
                        :rules="[{ required: true, message: '请填写确认密码' }]"
                    />
                    <div class="sign">
                        <van-checkbox v-model="checked" icon-size="11px">我已阅读并同意 <span style="color:#3983E5">《大美青海景区门票预约平台注册协议》</span></van-checkbox>
                    </div>
                    <div class="btn">
                        <van-button round block type="info" native-type="submit">
                        注册
                        </van-button>
                        
                    </div>
                    <div class="regist-btn">已有账户，立即登录</div>
                </van-form>  
            </div>
</div>
</template>

<script>
    import { NavBar, Tab, Tabs ,  Form , Field , Button , Checkbox } from 'vant'; 
    export default {
        components:{
            "van-nav-bar" : NavBar,
            "van-tabs" : Tabs,
            "van-tab" : Tab,
            "van-form" : Form,
            "van-field" : Field,
            "van-button" : Button,
            "van-checkbox" : Checkbox
        },
        data(){
            return{
                active: 0,//tab
                username:'',
                password:'',
                code:'',
                msgcode:'',
                checked:false,
            };
        },
        methods:{
            //提交表单
            onSubmit(){

            },
            onClickLeft(){
                this.$router.push('/perUser')
            },
        }
    };
</script>

<style scoped>
.register{
    min-height: 100vh;
    background-color: #ffffff;
}
.register >>> .van-tab{
    color: #999999;
    font-size: 16px;
}
.register >>>.van-nav-bar__title{
    font-size: 17px;
    font-weight: 600;
    color: #333333;
}
.register >>> .van-nav-bar .van-icon{
    color: #999999;
}
.register >>> .van-tabs__line{
    background-color: #3983E5;
}
.register >>> .van-tab--active{
    color: #3983E5;
}
.register >>> .van-cell{
    width: 355px;
    height: 44px;
    border-radius: 22px;
    border: 1px solid #DDDDDD;
    margin-top: 19px;
}
.yzm{
    display: flex;
    flex-direction: row;
    align-items:center;
}
.yzm >>> .van-cell{
    width: 256px;
    height: 44px;
}
.codeImg{
    width: 77px;
    height: 36px;
    background-color: #999999;
    display: inline-block;
    margin-top: 19px;
    margin-left: 13px;
}
.passlogin{
    display: flex;
    flex-direction: row;
    justify-content:center;
    
}
.msgLogin{
    display: flex;
    flex-direction: row;
    justify-content:center;
}
.btn{
    margin-top: 18px;
}
.bottomGn{
    width: 335px;
    margin-top: 23px;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.bottom{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
.bottom li{
    display: inline-block;
    font-size: 13px;
    color: #666666;
    padding-right: 13px;
}
.codeMsg{
    color: #3983E5;
    width: 77px;
    height: 36px;
    display: inline-block;
    margin-top: 19px;
    margin-left: 13px;
    font-size: 15px;
    line-height: 36px;
}
.regist-btn{
    width: 335px;
    height: 44px;
    text-align: center;
    color: #3983E5;
    font-size: 13px;
    line-height: 44px;
    margin-top: 18px;
}
.sign{
    margin-top: 31px;
}
.sign >>> .van-checkbox__label{
    font-size: 13px;
}
</style>
