import {adminRequest} from "@/util/axoisConfig.js";

export const updateArr = value => {
    return adminRequest.get('/key/getArrange',{
        params:{
            ...value
        }
    })
}

export const adminLogin = value => {
    return adminRequest.post('/key/adminLogin',{
        ...value
    })
}

export const modifyArr = value => {
    console.log(value)
    return adminRequest.post('/key/updateArr',{
        ...value
    })
}
