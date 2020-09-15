import {urlConfig} from './ipConfig';

const baseIP = urlConfig.baseIP;

/**
 * 拼接请求的ual
 */

let urlUtils = {}


urlUtils.getScenicList  = `${baseIP}/api/selectOccupation`;         // 获取景区列表



export {
    urlUtils
}
