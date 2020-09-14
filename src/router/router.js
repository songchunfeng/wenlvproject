import Vue from 'vue';
import Router from 'vue-router';
import { resolve } from '../../node_modules/url';

Vue.use(Router);

const routes = [
    {
        path: '*',
        name: 'index',
        component: resolve => require(['../view/index'], resolve),
        meta: {
            title: '默认页面'
        }
    },
    {
        path:'/index',
        name: 'index',
        component: resolve => require(['../view/index'], resolve),
        meta: {
            title: '默认页面'
        }
    },
    {
        path:'/login',
        name:'login',
        component: resolve => require(['../view/login/login'], resolve),
        meta:{
            title: '登录'
        }
    },
    {
        path:'/register',
        name:'register',
        component: resolve => require(['../view/register/index'], resolve),
        meta:{
            title: '登录'
        }
    },
];

// add route path
// routes.forEach(route => {
//     route.path = route.path || '/' + (route.name || '');
// });

const router = new Router({
    // base: '/bgc/',
    // mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    const title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    next();
});

export {
    router
};
