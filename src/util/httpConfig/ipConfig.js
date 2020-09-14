/**
 * 配置网络请求环境
 * @type {string}
 */

let env = process.env.VUE_APP_CURRENTMODE || 'DEV';
// let env = 'DEV';
// alert(process.env.VUE_APP_CURRENTMODE)
console.log("当前环境变量："  , env);
// alert(env)
let GlobalConfig = {
    DEV: {
        env: 'DEV',
        baseIP: 'http://10.10.30.170:8080/bgc-server',
        // baseIP: 'http://10.7.93.201:51577/bgc-server',
    },
    UAT: {
        env: 'UAT',
        baseIP: 'http://10.7.93.201:25703/bgc-server',
    },
    DAT: {
        env: 'DAT',
        baseIP: 'http://ylwechat-dat.djbx.com/bgc-server',
    },
    PROD: {
        env: 'PROD',
        baseIP: 'http://10.7.93.201:51577/bgc-server',
    }
}

let urlConfig = GlobalConfig[env];

export {
    urlConfig,
    env
}
