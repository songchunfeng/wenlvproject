// import Vue from 'vue'
import axios from 'axios';
import {urlUtils} from './apiUtils';

/**
 * 拦截请求数据，在请求开始的时候展示loading
 **/
axios.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})

/**
 * 拦截响应，在响应结束的时候关闭loading
 */
axios.interceptors.response.use(function (response) {
    return response
}, function (err) {
    if (err && err.response) {
        switch (err.response.status) {
            case 400: err.message = '请求错误(400)'; break
            case 401: err.message = '未授权，请重新登录(401)'; break
            case 403: err.message = '拒绝访问(403)'; break
            case 404: err.message = '请求出错(404)'; break
            case 408: err.message = '请求超时(408)'; break
            case 500: err.message = '服务器错误(500)'; break
            case 501: err.message = '服务未实现(501)'; break
            case 502: err.message = '网络错误(502)'; break
            case 503: err.message = '服务不可用(503)'; break
            case 504: err.message = '网络超时(504)'; break
            case 505: err.message = 'HTTP版本不受支持(505)'; break
            default: err.message = `连接出错(${err.response.status})!`
        }
    } else {
        if (err && err.message.includes('timeout')) {   // 判断请求异常信息中是否含有超时timeout字符串
            err.message = '网络连接超时'          // reject这个错误信息
        } else {
            err.message = '连接服务器失败!'
        }
    }
    return Promise.reject(err)
})

/**
 * 暴露请求方法
 * url 请求的链接
 * data 请求的数据
 * loading 是否展示loading
 * header 请求头
 */
export default {
    install (Vue) {
        Vue.prototype.$http = (url, data, header = {}) => {
            if (url.indexOf('http') === -1 && !url.includes('/api')) {
                url = urlUtils[url]
            }
            // var Time = new Date();
            // let paramData = {
            //     TransData: {
            //         BaseInfo: {
            //             TradeType : "WX",           /**固定值：微信*/
            //             TradeCode : "url",          /*接口编码，方便排查是哪个接口*/
            //             TradeSeq  : Time.getTime(), /*请求时间*/
            //             TradeDate : `${Time.getFullYear()}${ ( "0" + (Time.getMonth()+1) ).substr( -2 ) }${ ( "0" + Time.getDate() ).substr( -2 ) }`, /*请求日期*/
            //             TradeTime : `${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()}`, /*请求时间*/
            //         },
            //         InputData: data || {},
            //     }
            // };
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: url || '',
                    headers: Object.assign({
                        timeout: 60 * 1000,
                        'Content-Type': 'application/json;charset=UTF-8',
                    }, header),
                    data: data,
                }).then((data) => {
                    if (data.status && data.status === 200) {
                        resolve(data.data)
                    } else {
                        reject ('网络请求错误')
                    }
                }, (e) => {
                    reject (e.message)
                }).catch((err) => {
                    console.log('请求错误',err);
                    reject ('网络请求错误')
                })
            })
        }


        Vue.prototype.$get = (url, data,  header = {}) => {
            if (url.indexOf('http') === -1 && !url.includes('/api')) {
                url = urlUtils[url]
            }
            // var Time = new Date();
            // let paramData = {
            //     TransData: {
            //         BaseInfo: {
            //             TradeType : "WX",           /**固定值：微信*/
            //             TradeCode : "url",          /*接口编码，方便排查是哪个接口*/
            //             TradeSeq  : Time.getTime(), /*请求时间*/
            //             TradeDate : `${Time.getFullYear()}${ ( "0" + (Time.getMonth()+1) ).substr( -2 ) }${ ( "0" + Time.getDate() ).substr( -2 ) }`, /*请求日期*/
            //             TradeTime : `${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()}`, /*请求时间*/
            //         },
            //         InputData: data || {},
            //     }
            // };
            return new Promise((resolve, reject) => {
                axios({
                    method: 'get',
                    url: url || '',
                    headers: Object.assign({
                        timeout: 60 * 1000,
                        'Content-Type': 'application/json',
                    }, header),
                    params: data,
                }).then((data) => {
                    if (data.status && data.status === 200) {
                        resolve(data.data)
                    } else {
                        reject ('网络请求错误')
                    }
                }, (e) => {
                    reject (e.message)
                }).catch((err) => {
                    console.log('请求错误',err);
                    reject ('网络请求错误')
                })
            })
        }

        Vue.prototype.$formData = (url, data, loading = true, header = {}) => {
            if (url.indexOf('http') === -1 && !url.includes('/api')) {
                url = urlUtils[url]
            }
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: url || '',
                    headers: Object.assign({
                        timeout: 60 * 1000,
                        'Content-Type': 'multipart/form-data',
                        loading: loading
                    }, header),
                    data: data,
                    'loading': loading
                }).then((data) => {
                    if (data.status && data.status === 200) {
                        resolve(data.data)
                    } else {
                        reject ('网络请求错误')
                    }
                }, (e) => {
                    reject (e.message)
                }).catch((err) => {
                    console.log('请求错误',err);
                    reject ('网络请求错误')
                })
            })
        }
    }
}

