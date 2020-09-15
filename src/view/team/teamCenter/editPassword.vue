<template>
    <!--修改密码-->
    <div class="editPassword">
        <van-form @submit="onSubmit">
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
                    修改
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
    import  {  Form , Field , Button }from 'vant'
    export default {
        name: "editPassword",
        components:{
            "van-form" : Form,
            "van-field" : Field,
            "van-button" : Button
        },
        data(){
            return{
                password:'',
                surepassword:''
            };
        },
        methods:{
            onSubmit(){}
        }
    }
</script>

<style scoped>
    .editPassword{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .editPassword >>> .van-cell{
        width: 355px;
        height: 44px;
        border-radius: 22px;
        border: 1px solid #DDDDDD;
        margin-top: 18px;
        padding-left: 27px;
        font-size: 15px;
    }
    .btn{
        margin-top: 53px;
    }
    .btn >>> .van-button--normal{
        font-size: 16px;
    }
</style>
