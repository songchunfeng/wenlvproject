<template>
  <div class="comPeo">
    <van-checkbox-group v-model="check">
      <van-checkbox name="a">复选框 a</van-checkbox>
      <van-checkbox name="b">复选框 b</van-checkbox>
    </van-checkbox-group>
  </div>
</template>

<script>
import { Checkbox,CheckboxGroup } from 'vant';
export default {
    name:'commonPeo',
    components:{
        'van-checkbox':Checkbox,
        'van-checkbox-group':CheckboxGroup
    },
    data () {
        return {
            check:[]
        }
    }
}
</script>

<style>
</style>