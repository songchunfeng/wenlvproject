<!--找回密码-->
<template>
    <div class="findPass">
        <van-nav-bar  title="找回密码"  left-arrow @click-left="onClickLeft"></van-nav-bar>
        <div class="stepBox clearfix lhh40 mt40">
            <div class="stepItem fl fs16 c_fff textc lhh40 active" style="width: 50%;">
                <span class="c_fff typo_bold">1.验证手机号码</span>
            </div>
            <div class="stepItem fl fs16 c_fff textc lhh40" style="width: 50%;" :class="active==1 ? 'stepActive' : ''">
                <span class="c_fff typo_bold">2.设置新密码</span>
            </div>
        </div>
        <div class="form">
            <van-form @submit="onSubmit" v-if="active==0">
                <van-field
                        v-model="userName"
                        placeholder="手机号码"
                        :rules="[{ required: true, message: '请填写手机号码' }]"
                />
                <div class="yzm">
                    <van-field
                          v-model="msgcode"
                          placeholder="短信验证码"
                          :rules="[{ required: true, message: '请填写短信验证码' }]"
                    />
                    <div class="codeMsg" @click="sendMsg">发送验证码</div>
                </div>
                <div class="btn">
                    <van-button round block type="info" native-type="submit">
                        下一步
                    </van-button>
                </div>
            </van-form>
            <van-form @submit="passNext" v-if="active==1">
                <van-field
                        v-model="password"
                        type="password"
                        placeholder="输入新密码"

                />
                <van-field
                        v-model="surepassword"
                        type="password"
                        placeholder="再次输入新密码"

                />
                <div class="btn">
                    <van-button round block type="info" native-type="submit">
                        下一步
                    </van-button>
                </div>
            </van-form>
        </div>

    </div>
</template>

<script>
    import { NavBar,   Form , Field , Button ,Dialog ,Toast } from 'vant';
    export default {
        name: "index",
        components:{
            "van-nav-bar" : NavBar,
            "van-form" : Form,
            "van-field" : Field,
            "van-button" : Button,
            "Dialog" :Dialog,
            "Toast" : Toast
        },
        data(){
            return{
                active:0,
                userName:'',//手机号
                msgcode:'',//验证码
                password:'',//密码
                surepassword:'',//确认密码

            }
        },
        methods:{
            //回退按钮
            onClickLeft(){
                this.$router.push('/login')
            },
            //获取短信验证码
            sendMsg(){
                if(this.userName != ''){
                    let params = {};
                    params.telphone=this.userName;
                    this.$axios({
                        url: '/api/user/sendRegisterSms',
                        method: 'get',
                        param:params
                    }).then(res=>{
                        console.log(res)
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
                }
            },
            //表单1
            onSubmit(){
                this.active=1;

                this.$axios({})
            },
            //表单2
            passNext(){
                Dialog.alert({
                    title: '标题',
                    message: '弹窗内容',
                }).then(() => {
                    // on close
                });

            },
        }
    }
</script>

<style scoped>
     .findPass{
         min-height: 100vh;
         background-color: #ffffff;
     }
     .findPass >>>.van-nav-bar__title{
         font-size: 17px;
         font-weight: bold;
         color: #333333;
     }
     .findPass >>> .van-nav-bar .van-icon{
         color: #999999;
     }
     .clearfix {
         zoom: 1;
     }
     .clearfix:after {
         content: ".";
         display: block;
         clear: both;
         visibility: hidden;
         font-size: 0;
         height: 0;
         line-height: 0;
     }
     .lhh40 {
         line-height: 30px;
         height: 30px;
     }
     .fl, .floatl{float:left;}
     .fs16{font-size: 15px;}
     /*.c_fff{color: #999999;}*/
     .textc,.tc{text-align: center;}
     .typo_bold{font-weight: bold;}
     .stepItem{
         background: #EAEAEA;
         box-sizing: border-box;
         position: relative;
         color: #999999;
         font-family: PingFang-SC-Medium, PingFang-SC;
     }
     .stepActive{
         color: #fff;
         background-color: #3983E5;
     }

     /* 为步骤数字添加样式 */
     .stepItem i{
         width: 25px;
         height: 25px;
         display: inline-block;
         border-radius: 50%;
         background-color: #fff;
         transform: scale(0.8,0.8);
         -ms-transform:scale(7deg);  /* IE 9 */
         -moz-transform:scale(7deg);   /* Firefox */
         -webkit-transform:scale(7deg); /* Safari 和 Chrome */
         -o-transform:scale(7deg);   /* Opera */
         font-weight: bold;
         color: #EAEAEA;
     }

     /* 为每个步骤末尾加灰色三角形和白色边框 */
     .stepItem::after{
         content: "";
         border: 2px solid #fff;
         border-bottom: none;
         border-left: none;
         background-color: #EAEAEA;
         height: 30px;
         width: 27px;
         position: absolute;
         display: block;
         top: 5px;
         right: -15px;
         z-index: 10;
         transform:rotate(45deg);
         -ms-transform:rotate(45deg);  /* IE 9 */
         -moz-transform:rotate(45deg);   /* Firefox */
         -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
         -o-transform:rotate(45deg);   /* Opera */

     }
     /* 当前步骤加绿色三角形和白色边框 */
     .stepBox .active:after {
         background-color: #3983E5;
         content: "";
         border: 2px solid #fff;
         border-bottom: none;
         border-left: none;
         height: 20px;
         width: 20px;
         position: absolute;
         display: block;
         top: 4px;
         right: -12px;
         z-index: 10;
         transform:rotate(45deg);
         -ms-transform:rotate(45deg);  /* IE 9 */
         -moz-transform:rotate(45deg);   /* Firefox */
         -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
         -o-transform:rotate(45deg);   /* Opera */
     }

     /* 当前步骤中的样式修改 */
     .stepBox .active {
         background-color: #3983E5;
         color: #fff!important;
     }
     .stepBox .active i{
         color: #3983E5;
     }
     /* 取消最后一项所有的after伪类 */
     .stepItem:last-child::after{
         content: "";
         border: none;
         height: 0;
         width: 0;
         z-index: 11;
     }
     .form{
         display: flex;
         flex-direction: row;
         justify-content: center;
     }
     .form >>> .van-cell{
         width: 355px;
         height: 44px;
         border-radius: 22px;
         border: 1px solid #DDDDDD;
         margin-top: 19px;
         padding-left: 27px;
         font-size: 15px;
     }
     .btn{
         margin-top: 53px;
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
