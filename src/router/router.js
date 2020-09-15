import Vue from 'vue';
import Router from 'vue-router';

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
        path:'/login',
        name:'login',
        component: resolve => require(['../view/login/login'], resolve),
        meta: {
            title: '登录'
        }
    },
    {
        path:'/register',
        name:'register',
        component: resolve => require(['../view/register/index'], resolve),
        meta: {
            title: '注册'
        }
    },
    {
        path:'/findPassword',
        name:'findPassword',
        component: resolve => require(['../view/findPass/index'], resolve),
        meta:{
            title:'找回密码'
        }
    },
    {
        path:'/home',
        name: 'home',
        component: resolve => require(['../view/index'], resolve),
        meta: {
            title: '首页'
        }
    },
    {
        path:'/perLogin',
        name: 'perLogin',
        component: resolve => require(['../view/person'], resolve),
        meta: {
            title: '个人'
        },
        children:[
        {
            path:'/preList',
            name: 'preList',
            component: resolve => require(['../view/person/home/list.vue'], resolve),
            meta: {
                title: '景区列表'
            },
        },
        {
            path:'/perUser',
            name: 'perUser',
            component: resolve => require(['../view/person/user'], resolve),
            meta: {
                title: '用户中心'
            }
        },
        {
            path:'/perUserCenter',
            name:'perUserCenter',
            component: resolve => require(['../view/person/userCenter/index'],resolve),
            meta:{
                title:'用户中心'
            }
         },
        ]
    },
    {
        path:'/teamLogin',
        name: 'teamLogin',
        component: resolve => require(['../view/team'], resolve),
        meta: {
            title: '团队'
        },
        children:[
            {
                path:'/teamList',
                name: 'teamList',
                component: resolve => require(['../view/team/home'], resolve),
                meta: {
                    title: '景区列表'
                },
            },
            {
                path:'/teamUser',
                name: 'teamUser',
                component: resolve => require(['../view/team/user'], resolve),
                meta: {
                    title: '用户中心'
                },
            },
            {
                path:'/teamUserCenter',
                name:'teamUserCenter',
                component: resolve => require(['../view/team/teamCenter/index'],resolve),
                meta:{
                    title:'用户中心'
                }
            },
            
        ]
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
