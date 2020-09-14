import {urlConfig} from './ipConfig';

const baseIP = urlConfig.baseIP;

/**
 * 拼接请求的ual
 */

let urlUtils = {}

urlUtils.selectOccupation  = `${baseIP}/selectOccupation`;         // 获取下拉框数据



export {
    urlUtils
}
