<template>
    <div class="register">
        <van-nav-bar  title="团队用户注册"  left-arrow @click-left="onClickLeft"></van-nav-bar>
        <div class="form">
            <van-form @submit="onSubmit" :show-error-message="false">
                <van-field
                        v-model="username"
                        name="真实姓名"
                        label="真实姓名"
                        placeholder="请填写真实姓名"
                        :rules="[{ required: true, message: '请填写真实姓名' }]"
                >
                    <template #left-icon>
                     <img src="../../../assets/images/必选.png" alt="" class="checkSure">
                    </template>
                </van-field>
                <van-field
                    v-model="phone"
                    name="联系电话"
                    label="联系电话"
                    placeholder="联系电话"
                    :rules="[{ required: true, message: '请填写联系电话' }]"
                >
                    <template #left-icon>
                        <img src="../../../assets/images/必选.png" alt="" class="checkSure">
                    </template>
                </van-field>
                <van-field
                        v-model="password"
                        type="password"
                        name="登录密码"
                        label="登录密码"
                        placeholder="登录密码"
                        :rules="[{ required: true, message: '请填写登录密码' }]"
                >
                    <template #left-icon>
                        <img src="../../../assets/images/必选.png" alt="" class="checkSure">
                    </template>
                </van-field>
                <van-field
                        v-model="surepassword"
                        type="password"
                        name="确认密码"
                        label="确认密码"
                        placeholder="确认密码"
                        :rules="[{ required: true, message: '请填写确认密码' }]"
                >
                    <template #left-icon>
                        <img src="../../../assets/images/必选.png" alt="" class="checkSure">
                    </template>
                </van-field>
                <van-field
                        v-model="idCard"
                        name="身份证号"
                        label="身份证号"
                        placeholder="身份证号"
                        :rules="[{ required: true, message: '请填写身份证号' }]"
                >
                    <template #left-icon>
                        <img src="../../../assets/images/必选.png" alt="" class="checkSure">
                    </template>
                </van-field>
                <van-field
                        v-model="tourCard"
                        name="导游证号"
                        label="导游证号"
                        placeholder="导游证号"
                        :rules="[{ required: true, message: '请填写导游证号' }]"
                >
                    <template #left-icon>
                        <img src="../../../assets/images/必选.png" alt="" class="checkSure">
                    </template>
                </van-field>
                <div class="tour">
                <van-field >
                    <template #label>
                        <span class="custom-title">导游证</span>
                        <span class="picSpecifi">（图片规格：3M以下，图片清晰）</span>
                    </template>
                    <template #left-icon>
                        <img src="../../../assets/images/必选.png" alt="" class="checkSure">
                    </template>
                </van-field>
                    <div>sfhskfhksfhh</div>
                </div>
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
    import { NavBar, Form , Field , Button ,Toast , Picker , Cell  } from 'vant';
    export default {
        name: "index.vue",
        components:{
            "van-nav-bar" : NavBar,
            "van-picker" : Picker,
            "van-form" : Form,
            "van-field" : Field,
            "van-button" : Button,
            "Toast": Toast,
            "van-cell" : Cell

        },
        data(){
            return{
                phone:'',
                username:'',
                password:'',
                surepassword:'',
                idCard:'',
                tourCard:'',
                value: '',
                columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
                showPicker: false,
            }
        },
        methods:{
            onSubmit(){

            }
        }

    }
</script>

<style scoped>
    .register >>> .van-tab{
        color: #999999;
        font-size: 16px;
    }
    .register >>> .van-cell{
        height: 58px;
        font-size: 15px;
        color: #333333;
        font-family: MicrosoftYaHei;
        font-weight: bold;
        line-height: 38px;
    }
    .register >>>.van-nav-bar__title{
        font-size: 17px;
        font-weight: bold;
        color: #333333;
    }
    .register >>> .van-field__control{
        text-align: right;
        font-weight: 400;
    }
    .register >>> .van-field__left-icon{
        margin-right: 15px;
    }
    .checkSure{
        width: 8px;
        height: 8px;
    }
    .picSpecifi{
        color: #999999;
        font-weight: 400;
    }
    .tour{
        background-color: #fff;
    }
    .tour >>> .van-field__label{
        width: 100%;
    }
    .tour >>> .van-cell:not(:last-child)::after{
        border: none;
    }
</style>
