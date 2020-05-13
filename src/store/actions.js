import {USER_INFO} from './mutations-type'
import {getStore} from './../config/global'
import axios from 'axios'
export default{
    //1.同步用户信息
    syncUserInfo({commit},userInfo){
        commit(USER_INFO,{userInfo});
    },

    //2.自动登录
    async reqUserInfo({commit}){
        //2.1从本地获取数据
        let userInfo = JSON.parse(getStore('userInfo'));
        if(userInfo){
            commit(USER_INFO,{userInfo})
        }else{ 
            //2.2从服务器端验证
            await axios.get('/api/user/userinfo').then(res=>{
                    if(200 === res.data.success_code){
                        commit(USER_INFO,{userInfo:res.data.data})
                    }
            })
        }
    }
}