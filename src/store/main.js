import Vue from 'vue';
import Vuex from 'vuex';

import userinfo from './userinfo';
import menu from './menu';
import prdInfo from './prdInfo';

Vue.use(Vuex);

var store = new Vuex.Store({
  modules: {
    // menu,
    userinfo,
    prdInfo
  }
});

export default store