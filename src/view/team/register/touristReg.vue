<template>
    <div class="register">
        <van-nav-bar  title="旅行社注册"  left-arrow @click-left="onClickLeft"></van-nav-bar>
        <div class="form">
            <van-form @submit="onSubmit" :show-error-message="false">
                <div class="usic">
                <van-field
                        v-model="usci"
                        name="统一社会信用代码"
                        label="统一社会信用代码"
                        placeholder="统一社会信用代码"
                        :rules="[{ required: true, message: '请填写统一社会信用代码' }]"
                        @blur="getUsciMsg(usci)"
                >
                    <template #left-icon>
                        <img src="../../../assets/images/必选.png" alt="" class="checkSure">
                    </template>
                </van-field>
                </div>
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
                <div class="tour">
                    <van-field >
                        <template #label>
                            <span class="custom-title">工商执照</span>
                            <span class="picSpecifi">（图片规格：3M以下，图片清晰）</span>
                        </template>
                        <template #left-icon>
                            <img src="../../../assets/images/必选.png" alt="" class="checkSure">
                        </template>
                    </van-field>
                    <div class="uploadMain">
                        <div class="upload">
                            <van-uploader :after-read="afterReadbusiness" :max-count="1" @delete="fileDeletebusiness" :preview-image="true" v-model="list" :max-size="3* 1024 * 1024"   @oversize="onOversize"  :before-read="beforeRead" accept="image/*">
                                <template #default>
                                    <img src="../../../assets/images/plus.png" alt="" class="uploadImg"
                                    >
                                    <div class="uploadfs">上传图片</div>
                                </template>
                            </van-uploader>
                        </div>
                    </div>
                </div>
                <div class="tour">
                    <van-field >
                        <template #label>
                            <span class="custom-title">旅游许可证</span>
                            <span class="picSpecifi">（图片规格：3M以下，图片清晰）</span>
                        </template>
                        <template #left-icon>
                            <img src="../../../assets/images/必选.png" alt="" class="checkSure">
                        </template>
                    </van-field>
                    <div class="uploadMain">
                        <div class="upload">
                            <van-uploader :after-read="afterReadtour" :max-count="1" @delete="fileDeletetour" :preview-image="true" v-model="list1" :max-size="3* 1024 * 1024"   @oversize="onOversize"  :before-read="beforeRead" accept="image/*">
                                <template #default>
                                    <img src="../../../assets/images/plus.png" alt="" class="uploadImg"
                                    >
                                    <div class="uploadfs">上传图片</div>
                                </template>
                            </van-uploader>
                        </div>
                    </div>
                </div>
                <div class="tour">
                    <van-field >
                        <template #label>
                            <span class="custom-title">行程单模板</span>
                            <span class="picSpecifi">（图片规格：3M以下，图片清晰）</span>
                        </template>
                        <template #left-icon>
                            <img src="../../../assets/images/必选.png" alt="" class="checkSure">
                        </template>
                    </van-field>
                    <div class="uploadMain">
                        <div class="upload">
                            <van-uploader :after-read="afterRead" :max-count="1" @delete="fileDelete" :preview-image="true" v-model="list2" :max-size="3* 1024 * 1024"   @oversize="onOversize"  :before-read="beforeRead" accept="image/*">
                                <template #default>
                                    <img src="../../../assets/images/plus.png" alt="" class="uploadImg"
                                    >
                                    <div class="uploadfs">上传图片</div>
                                </template>
                            </van-uploader>
                        </div>
                    </div>
                </div>
                <div class="cell">
                    <van-field v-model="telephone"
                               name="联系邮箱"
                               label="联系邮箱"
                               placeholder="请输入公司邮箱"
                               :rules="[{ required: true, message: '请输入公司邮箱' }]"
                               @blur="checkemail(telephone)"
                    >
                        <template #left-icon>
                            <img src="../../../assets/images/必选.png" alt="" class="checkSure">
                        </template>
                    </van-field>
                </div>
                <div class="btn">
                    <van-button round block type="info" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
    import { NavBar,  Form , Field , Button ,Toast ,Uploader ,Cell } from 'vant';
    export default {
        name: "index.vue",
        components:{
            "van-nav-bar" : NavBar,
            "van-form" : Form,
            "van-field" : Field,
            "van-button" : Button,
            "van-uploader" : Uploader,
            "van-cell" : Cell ,
            "Toast": Toast
        },
        data(){
            return{
                companyName:'',//企业名称
                businessLicenseUrl:'',//工商执照
                itineraryTemplateUrl:'',//行程单模板
                telephone:'',//联系电话,
                tourPermissionUrl:'',//旅游许可证
                usci:'',//统一社会信用代码,
                list:[],
                list1:[],
                list2:[]
            }
        },
        methods:{
            onSubmit(){
                if(this.businessLicenseUrl!= '' && this.itineraryTemplateUrl!='' && this.tourPermissionUrl!=''){
                    let params ={
                        "businessLicenseUrl":this.businessLicenseUrl,
                        "companyName": this.companyName,
                        "itineraryTemplateUrl":this.itineraryTemplateUrl,
                        "telephone": this.telephone,
                        "tourPermissionUrl": this.tourPermissionUrl,
                        "usci": this.usci
                    }
                    this.$axios({
                        url:'/api/teamInfo/touristAgencyRegister',
                        method:'post',
                        data:params
                    }).then(res=>{
                        // console.log(res)
                        if(res.code==20000){
                            Toast.success('注册成功');
                            this.$router.push('/teamRegister')
                        }else{
                            Toast.fail(res.message)
                        }
                    }).catch(err=>{
                        Toast.fail(err)
                    })
                }
            },
            onClickLeft(){
                this.$router.push('/teamRegister')
            },
            //工商
            afterReadbusiness(file){
                var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
                formData.append('file', file.file); //接口需要传的参数
                this.$axios.post('/api/picture/getpictureid?msg=""',formData).then(res=>{
                    // console.log(res)
                    this.businessLicenseUrl=res.data.rows[0]
                }).catch(err=>{
                    Toast.fail(err)
                })
            },
            fileDeletebusiness(file){
                this.businessLicenseUrl=''
            },
            //旅游
            afterReadtour(file){
                var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
                formData.append('file', file.file); //接口需要传的参数
                this.$axios.post('/api/picture/getpictureid?msg=""',formData).then(res=>{
                    // console.log(res)
                    this.tourPermissionUrl=res.data.rows[0]
                }).catch(err=>{
                    Toast.fail(err)
                })
            },
            fileDeletetour(file){
                this.tourPermissionUrl=''
            },
            afterRead(file) {
                var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
                formData.append('file', file.file); //接口需要传的参数
                this.$axios.post('/api/picture/getpictureid?msg=""',formData).then(res=>{
                    // console.log(res)
                    this.itineraryTemplateUrl=res.data.rows[0]
                }).catch(err=>{
                    Toast.fail(err)
                })
            },
            fileDelete(){
                this.itineraryTemplateUrl=''
            },
            onOversize(file) {
                // console.log(file);
                Toast.fail('文件大小不能超过 3M');
            },
            beforeRead(file) {
                if (file.type !== 'image/jpeg') {
                    Toast('请上传 jpg 格式图片');
                    return false;
                }
                return true;
            },
            getUsciMsg(val) {
                let code = this.$commonUtils.tourist(val)
                if (code != 'success') {
                    Toast.fail('请检查统一社会信用代码')
                    this.usci=''
                }
            },
            checkemail(val){
                let reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                if(!reg.test(val)){
                    Toast.fail('请检查邮箱')
                    this.telephone=''
                }
            }

        }

    }
</script>

<style scoped>
    .register >>> .van-tab{
        color: #999999;
        font-size: 16px;
    }
    .register{
        min-height: 100vh;
        background-color: #fff;
        padding: 0px 10px;
    }
    .register >>> .van-nav-bar .van-icon{
        color: #999999;
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
    .uploadMain{
        /*width: 100%;*/
        padding-left: 10px ;
        padding-right: 10px;
        border-bottom: 0.02667rem solid #ebedf0;
        padding-bottom: 19px;
        box-sizing: border-box;
    }
    .upload{
        padding-left: 26px;
        width:78px;
        height: 78px;

    }
    .uploadfs{
        font-size: 11px;
        color: #999999;
    }
    .uploadImg{
        width: 18px;
        height: 18px;
    }
    .upload >>> .van-uploader__wrapper{
        border: 1px dashed rgba(0, 0, 0, 0.15);
        border-radius: 3px;
        background: rgba(0, 0, 0, 0.04);
        width:78px;
        height: 78px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .upload >>> .van-uploader__input-wrapper{
        text-align: center;
    }
    .btn{
        margin-top: 16px;
        margin-bottom: 50px;
        font-size: 16px;
    }
    .btn >>> .van-button--normal{
        font-size: 16px;
    }
   .register  .cell >>> .van-cell{
        height: 76px;
    }
    .usic >>> .van-field__label{
        width: auto;
    }
</style>
