<template>

 <div class="login">
     <van-nav-bar  title="登录账号"  left-arrow @click-left="onClickLeft"></van-nav-bar>
     <van-tabs v-model="active">
        <van-tab title="密码登录">
            <div class="passlogin">
                <van-form @submit="onSubmit" :show-error-message="false">
                    <van-field
                        v-model="username"
                        placeholder="手机号码"
                        :rules="[{ required: true, message: '请填写用户名' }]"
                    />
                    <van-field
                        v-model="password"
                        type="password"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                    />
                    <div class="yzm">
                        <van-field
                            v-model="code"
                            placeholder="验证码"
                            :rules="[{ required: true, message: '请填写用户名' }]"
                        />
                       <img :src=filePath alt="" class="codeImg" @click="changecodeImg">
                    </div>
                    <div class="btn">
                        <van-button round block type="info" native-type="submit">
                        登录
                        </van-button>
                    </div>
                     <div class="bottomGn clearFix">
                        <ul class="bottom clearFix">
                            <li @click="forgetPassword">忘记密码</li>
                            <li> | </li>
                            <li @click="toRegister">注册</li>
                        </ul>
                </div>    
                </van-form>  
            </div>
        </van-tab>
        <van-tab title="短信登录">
            <div class="msgLogin">
                 <van-form @submit="onMsgSubmit" :show-error-message="false">
                    <van-field
                        v-model="msgUserName"
                        placeholder="手机号码"
                        :rules="[{ required: true, message: '请填写用户名' }]"
                        @blur="telBlur(msgUserName)"
                    />
                    <div class="yzm">
                        <van-field
                            v-model="imgcode"
                            placeholder="验证码"
                            :rules="[{ required: true, message: '请填写用户名' }]"
                        />
                        <img :src=filePath alt="" class="codeImg" @click="changecodeImg">

                    </div>
                    <div class="yzm">
                        <van-field
                            v-model="msgcode"
                            placeholder="短信验证码"
                            :rules="[{ required: true, message: '请填写短信验证码' }]"
                        />
                        <div class="codeMsg" @click="sendMsg" v-show="show">发送验证码</div>
                        <div class="codeDisable" v-show="!show">{{i}}S后重新发送</div>
                    </div>
                    <div class="btn">
                        <van-button round block type="info" native-type="submit">
                        登录
                        </van-button>
                    </div>
                     <div class="bottomGn clearFix">
                        <ul class="bottom clearFix">
                            <li @click="forgetPassword">忘记密码</li>
                            <li> | </li>
                            <li @click="toRegister">注册</li>
                        </ul>
                </div>    
                </van-form>  
            </div>
        </van-tab>
    </van-tabs>
</div>
</template>

<script>
    import { NavBar, Tab, Tabs ,  Form , Field , Button ,Toast } from 'vant';
    export default {
        components:{
            "van-nav-bar" : NavBar,
            "van-tabs" : Tabs,
            "van-tab" : Tab,
            "van-form" : Form,
            "van-field" : Field,
            "van-button" : Button,
            "Toast": Toast
        },
        data(){
            return{
                active: 0,//tab
                username:'',
                password:'',
                code:'',
                filePath:'',
                msgcode:'',//短信登录
                imgcode:'',//短信登录
                msgUserName:'',//短信登录
                i:60,
                timer:null,
                show:true
            };
        },
        methods:{
            //提交表单
            onSubmit(){
                let params ={ "imgCode": this.code , "loginType":0, "type" : 0,"passWord":this.password, "phoneCode": "",
                    "userName": this.username
                }
                this.$axios({
                    url:'/api/user/login',
                    method:'post',
                    data:params,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.code==20000){
                        this.$commonUtils.setSessionItem('token',res.data.Authorization)
                        this.$commonUtils.setSessionItem('loginMsg',JSON.stringify(res.data.rows))
                        if(res.data.rows.userType==1){
                            this.$router.push('/teamList')
                        }else if(res.data.rows.userType==0){
                            this.$router.push('/preList')
                        }
                    }else{
                        Toast.fail(res.message)
                        this.changecodeImg()
                        this.code=''
                    }
                }).catch(err=>{
                    Toast(err)
                })
            },
            //短信登录
            onMsgSubmit(){
                let params ={ "imgCode": this.imgcode , "loginType":1,"type" : 0, "passWord":'', "phoneCode": this.msgcode,
                    "userName": this.msgUserName
                }
                this.$axios({
                    url:'/api/user/login',
                    method:'post',
                    data:params,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res=>{
                    if(res.code==20000){
                        this.$commonUtils.setSessionItem('token',res.data.Authorization)
                        this.$commonUtils.setSessionItem('loginMsg',JSON.stringify(res.data.rows))
                        if(res.data.rows.userType==1){
                            this.$router.push('/teamList')
                        }else if(res.data.rows.userType==0){
                            this.$router.push('/preList')
                        }

                    }else{
                        Toast.fail(res.message)
                        this.changecodeImg()
                        this.imgcode=''
                    }
                }).catch(err=>{
                    Toast(err)
                })
            },
            //获取短信验证码
            sendMsg(){
                if(this.msgUserName != ''){
                    let params = {};
                    params.telphone=this.msgUserName;
                    this.$axios({
                        url: '/api/user/sendRegisterSms',
                        method: 'get',
                        params:params
                    }).then(res=>{
                       if(res.code==20000){
                           Toast.success('已发送')
                           this.show=false;
                           this.timer=setInterval(()=>{
                               this.i--;
                               if(this.i<=0){
                                   this.show=true;
                                   this.i=60;
                                   clearInterval(this.timer)
                               }
                           },1000)
                       } else{
                           Toast.fail(res.message)
                       }
                    }).catch(err=>{
                        console.log(err)
                    })
                }else{
                    Toast('请输入手机号')
                }

            },
            telBlur(tel){
                let code = this.$commonUtils.checkPhoneNo(tel)
                if(code != 'success'){
                    Toast('手机号输入有误，请重新输入')
                }
            },
             onClickLeft(){
                this.$router.push('/perUser')
            },
            changecodeImg(){
                this.$axios.get('/api/defaultKaptcha',{responseType: 'arraybuffer'}).then(res=>{
                    console.log(res)
                    this.filePath = "data:image/jpeg;base64," + btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''));
                    console.log(this.filePath)
                }).catch(err=>{
                    Toast(err)
                })
            },
            //忘记密码
            forgetPassword(){
              this.$router.push({name:'findPassword',query:{type:0}})
            },
            toRegister(){
                this.$router.push('/register')
            }
        },
        mounted() {
           this.changecodeImg();
        }
    };
</script>

<style scoped>
.login{
    min-height: 100vh;
    background-color: #ffffff;
}
.login >>> .van-tab{
    color: #999999;
    font-size: 16px;
}
.login >>>.van-nav-bar__title{
    font-size: 17px;
    font-weight: bold;
    color: #333333;
}
.login >>> .van-nav-bar .van-icon{
    color: #999999;
}
.login >>> .van-tabs__line{
    background-color: #3983E5;
}
.login >>> .van-tab--active{
    color: #3983E5;
}
.login >>> .van-cell{
    width: 355px;
    height: 44px;
    border-radius: 22px;
    border: 1px solid #DDDDDD;
    margin-top: 19px;
    padding-left: 27px;
    font-size: 15px;
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
    display: inline-block;
    margin-top: 19px;
    margin-left: 13px;
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
    margin-top: 50px;
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
</style>
