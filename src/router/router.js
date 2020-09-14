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
        path:'/index',
        name: 'index',
        component: resolve => require(['../view/index'], resolve),
        meta: {
            title: '默认页面'
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
