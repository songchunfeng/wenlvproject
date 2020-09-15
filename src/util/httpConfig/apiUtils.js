
//引入上面的文件，导出接口
import axios from "./HttpUtils";
export class firstApi {
    // 获取个人资料接口信息
    static findUser() {
        //将接口下载这里
        return axios.get('/api/spot/spotlist/1/5')
    }
}

