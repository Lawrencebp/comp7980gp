import request from "@/util/axoisConfig.js";

export const getOneMovie = id => {
    return request.get(`/oneMovie/${id}`)
}

export const getAllMovie = () => {
    return request.get('/key/allMovieInfo')
}

export const getOneMovieArrangement = allValue => {
    return request.post('/oneArrangement',{
        ...allValue
    })
}
