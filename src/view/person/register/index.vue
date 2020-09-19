<template>

 <div class="register">
     <van-nav-bar  title="新用户注册"  left-arrow  @click-left="onClickLeft"></van-nav-bar>
      <div class="passlogin">
                <van-form @submit="onSubmit" :show-error-message="false">
                    <van-field
                        v-model="userName"
                        placeholder="手机号码"
                        :rules="[{ required: true,  message: '请填写用户名' }]"
                        @blur="telBlur"
                    />
                     <div class="yzm">
                        <van-field
                            v-model="msgCode"
                            placeholder="短信验证码"
                            :rules="[{ required: true, message: '请填写短信验证码' }]"
                        />
                        <div class="codeMsg" @click="sendMsg" v-show="show">发送验证码</div>
                         <div class="codeDisable" v-show="!show">{{i}}S后重新发送</div>
                    </div>
                    <van-field
                        v-model="passWord"
                        type="password"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                        @blur="checkpassword(passWord)"
                    />
                    <van-field
                         v-model="password"
                         type="password"
                         placeholder="确认密码"
                        :rules="[{ required: true, message: '请填写确认密码' }]"
                         @blur="checkpassword(password)"
                    />
                    <div class="sign">
                        <van-checkbox v-model="checked" icon-size="14px">我已阅读并同意 <span style="color:#3983E5" @click="readShow=true">《大美青海景区门票预约平台注册协议》</span></van-checkbox>
                    </div>
                    <div class="btn">
                        <van-button round block type="info" native-type="submit">
                        注册
                        </van-button>
                        
                    </div>
                    <div class="regist-btn" @click="toLogin">已有账户，立即登录</div>
                </van-form>  
            </div>
     <van-popup
             :safe-area-inset-bottom="true"
             :overlay="false"
             position="right"
             v-model="readShow"
             :style="{ height: '100%', width: '100%'}"
     >
         <read @close="closeRead" style="position:relative"></read>
     </van-popup>
     <van-tabbar v-model="activeFoot" route>
         <van-tabbar-item to="/preList">
             <span>首页</span>
             <template #icon="props">
                 <img :src="props.active ? icon.active : icon.inactive" />
             </template>
         </van-tabbar-item>
         <van-tabbar-item icon="search" to="/perUser">
             <span>用户中心</span>
             <template #icon="props">
                 <img :src="props.active ? icon.user : icon.inuser" />
             </template>
         </van-tabbar-item>
     </van-tabbar>
</div>
</template>

<script>
    import { NavBar,  Form , Field , Button , Checkbox , Toast ,Popup,Tabbar,TabbarItem} from 'vant';
    import read from './registerText'
    export default {
        components:{
            "van-nav-bar" : NavBar,
            "van-form" : Form,
            "van-field" : Field,
            "van-button" : Button,
            "van-checkbox" : Checkbox,
            "Toast" :Toast,
            "van-popup" : Popup,
            "van-tabbar": Tabbar,
            "van-tabbar-item": TabbarItem,
             read
        },
        data(){
            return{
                active: 0,//tab
                userName:'',
                password:'',
                code:'',
                passWord:'',
                msgCode:'',
                checked:true,
                i:60,
                timer:null,
                show:true,
                readShow: false,
                activeFoot:0,
                icon: {
                    active: require("../../../assets/images/首页已选择.png"),
                    inactive: require("../../../assets/images/个人 -未选中.png"),
                    user: require("../../../assets/images/首页已选择 (2).png"),
                    inuser: require("../../../assets/images/个人 -未选中(1).png"),
                },
            };
        },
        methods:{
            //提交表单
            onSubmit(){
                if(this.passWord===this.password && this.checked == true){
                    let params ={ passWord :this.passWord,userName: this.userName ,msgCode: this.msgCode }
                    this.$axios({
                        method:'post',
                        url:'/api/user/UserRegister',
                        data:params
                    }).then(res=>{
                        // console.log(res)
                        if(res.code==20000){
                            Toast.success(res.message);
                            this.$router.push('/login')
                        }else{
                            Toast.fail(res.message);
                        }
                    }).catch(err=>{
                        Toast(err)
                    })
                }else if(this.passWord!==this.password){
                    Toast.fail('两次输入密码不一致')
                }else{
                    Toast('请先阅读平台注册协议并同意')
                }

            },
            //返回
            onClickLeft(){
                this.$router.push('/perUser')
            },
            //验证码
            sendMsg(){
                if(this.userName != ''){
                    let params = {};
                    params.telphone=this.userName;
                    this.$axios({
                        url: '/api/user/sendRegisterSms',
                        method: 'get',
                        params:params
                    }).then(res=>{
                        console.log(res)
                        if(res.code==20000){
                            Toast.success('验证码已发送');
                            this.show=false;
                            this.timer=setInterval(()=>{
                                this.i--;
                                if(this.i<=0){
                                    this.show=true;
                                    this.i=60;
                                    clearInterval(this.timer)
                                }
                            },1000)
                        }else{
                            this.show=true
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }else{
                    Toast('请输入手机号')
                }

            },
            telBlur(){
               let code = this.$commonUtils.checkPhoneNo(this.userName)
               if(code != 'success'){
                   Toast('手机号输入有误，请重新输入')
               }else{
                   this.$axios.get('/api/user/findUser?telphone='+this.userName+'?type=0')
                   .then(res=>{
                       if(res.code!==20000){
                           Toast.fail(res.message)
                       }
                   }).catch(err=>{
                       Toast.fail(err)
                   })
               }
            },
            toLogin(){
                this.$router.push('/login')
            },
            checkpassword(val){
               let code = this.$commonUtils.checkPassword(val)
                if(code ==  'fail'){
                    Toast.fail('请输入六位以上数字字母组合')
                }
            },
            closeRead() {
                this.readShow = false;
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
    font-size: 15px;
    padding-left: 27px;
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
.codeDisable{
    color: #999999;
    width: auto;
    height: 36px;
    display: inline-block;
    margin-top: 19px;
    margin-left: 5px;
    font-size: 13px;
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
