import {request} from "@/util/axoisConfig.js";

//登陆请求接口，需要username和password
export const startLogin = (username,password) => {
    return request.post('/key/login',{
        username,
        password
    })
}

//更新数据接口，需要userId, username, password, mobile
export const updateInfo = allData => {
    return request.put('/updateUserInfo',{
        ...allData
    })
}

//注册接口
export const insertOne = allData => {
    return request.post('/key/register',{
        ...allData
    })
}
