import {reactive} from "vue";

export const transformDate = detailedDate => {
    const year = detailedDate.getFullYear()
    const month = detailedDate.getMonth() + 1 // 月份从0开始，所以加1
    const day = detailedDate.getDate()
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}


/**
 use: 秒的格式转换
 parameters:
 return: 返回电影时长，e.g. 2h-12m-13s
 **/
export const transformTime = second => {
    const hour = Math.floor(second / 3600)
    const minute = Math.floor((second - hour * 3600) / 60)
    const finalSecond = (second - hour * 3600 - minute * 60)
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
    const finalTime = `${newDate.getHours()}:${newDate.getMinutes().toString().padStart(2, '0')}`
    return reactive({finalYear, finalMonth, finalDate, finalTime})
}

/**
 use: 时间的加减
 parameters:start(string:09:13 or 10:30),second(string : 7200)
 return:
 **/

export const transformSecond = (start, second = '0') => {
    let hour = start.match(/\d+/g)[0]
    let minute = start.match(/\d+/g)[1]
    if (hour[0] === '0') {
        hour = hour.replace('0', '')
    }
    if (minute[0] === '0') {
        minute = minute.replace('0', '')
    }
    hour = parseInt(hour)
    minute = parseInt(minute)
    second = parseInt(second)
    const dHour = Math.floor(second / 3600)
    const dMinute = Math.ceil((second - dHour * 3600) / 60)
    let finalHour = hour + dHour
    let finalMinute = minute + dMinute
    if (finalHour >= 24) {
        finalHour = finalHour % 24
    }
    if (finalMinute >= 60) {
        finalMinute = Math.ceil(finalMinute % 60)
        finalHour += Math.ceil(finalMinute / 60)
    }

    return {finalHour, finalMinute}
}


export const currentDate = new Date()
