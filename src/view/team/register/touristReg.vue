<template>
    <div class="register">
        <van-nav-bar  title="旅行社注册"  left-arrow @click-left="onClickLeft"></van-nav-bar>
        <div class="form">
            <van-form @submit="onSubmit">
                <van-field
                        v-model="username"
                        name="统一社会信用代码"
                        label="统一社会信用代码"
                        placeholder="统一社会信用代码"
                        :rules="[{ required: true, message: '请填写统一社会信用代码' }]"
                >
                    <template #left-icon>
                        <img src="../../../assets/images/必选.png" alt="" class="checkSure">
                    </template>
                </van-field>
                <van-field
                        v-model="companyName"
                        name="公司名称"
                        label="公司名称"
                        placeholder="公司名称"
                        :rules="[{ required: true, message: '请填写公司名称' }]"
                >
                    <template #left-icon>
                        <img src="../../../assets/images/必选.png" alt="" class="checkSure">
                    </template>
                </van-field>

                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-form>
            <div>{{add('2020-09-15 上午')}}</div>
        </div>
    </div>
</template>

<script>
    import { NavBar, Tab, Tabs ,  Form , Field , Button ,Toast , Picker  } from 'vant';
    export default {
        name: "index.vue",
        components:{
            "van-nav-bar" : NavBar,
            "van-picker" : Picker,
            "van-form" : Form,
            "van-field" : Field,
            "van-button" : Button,
            "Toast": Toast
        },
        data(){
            return{
                companyName:'',
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

            },
            add(item){
                console.log(item.split(' ')[0])

            }
        }

    }
</script>

<style scoped>
    .register >>> .van-tab{
        color: #999999;
        font-size: 16px;
    }
    .register >>> .van-field__label{
        width: 3rem;
    }
    .register >>>.van-nav-bar__title{
        font-size: 17px;
        font-weight: bold;
        color: #333333;
    }
    .register >>> .van-field__control{
        text-align: right;
    }
    .checkSure{
        width: 8px;
        height: 8px;
        line-height: 20px;
    }
</style>
