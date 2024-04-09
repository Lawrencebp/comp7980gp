import request from "@/util/axoisConfig.js";

export const getSeatInformation = data => {
    return request.post('/seatInformation',{
        ...data
    })
}

export const bookTicket = data => {
    return request.post('/bookTicket',{
        ...data
    })
}

export const getCustomerOrder = data => {
    return request.post('/getOneOrder',{
        ...data
    })
}

export const delOneOrder = (_id) => {
    console.log(_id)
    return request.delete('/delOneOrder',{
        params:{_id}
    })
}
