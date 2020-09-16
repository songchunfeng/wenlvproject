import Vue from 'vue';
import App from './App';
import store from './store/index'
import axios from  "./util/httpConfig/HttpUtils"
import {router} from './router/router';
import 'amfe-flexible/index.js';
import { commonUtils } from './util/util';
import { Toast } from 'vant';
Vue.use(Toast);
// import HttpUtils from './util/httpConfig/HttpUtils';
// Vue.use(HttpUtils);
Vue.prototype.$axios = axios


//util
import constants from './util/constants';

Vue.prototype.$commonUtils = commonUtils
Vue.prototype.$constants = constants;

new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App)
});
