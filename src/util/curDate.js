import {reactive} from "vue";

export const transformDate = detailedDate => {
    const year = detailedDate.getFullYear()
    const month = detailedDate.getMonth() + 1 // 月份从0开始，所以加1
    const day = detailedDate.getDate()
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}

export const transformTime = second => {
    const hour = Math.floor(second / 3600)
    const minute = Math.floor((second - hour * 3600) / 60)
    const finalSecond = ( second - hour * 3600 - minute * 60 )
    return `${hour}h-${minute}m-${finalSecond}s`
}

export const normalizeDateTime = date => {
    const rule = {
        "1": "January",
        "2": "February",
        "3": "March",
        "4": "April",
        "5": "May",
        "6": "June",
        "7": "July",
        "8": "August",
        "9": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    }
    const newDate = new Date(date)
    const finalYear = newDate.getFullYear()
    const finalDate = newDate.getDate()
    const finalMonth = rule[newDate.getMonth() + 1]
    const finalTime = `${newDate.getHours()}:${newDate.getMinutes().toString().padStart(2,'0')}`
    return reactive({ finalYear, finalMonth, finalDate, finalTime })
}
export const currentDate = new Date()
