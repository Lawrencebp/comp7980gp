export const transformDate = detailedDate => {
    const year = detailedDate.getFullYear()
    const month = detailedDate.getMonth() + 1 // 月份从0开始，所以加1
    const day = detailedDate.getDate()
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}

export const currentDate = new Date()
