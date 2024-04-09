export const seatTransform = data => {
    const mapping = {
        0:"A",
        1:"B",
        2:"C",
        3:"D",
        4:"E",
        5:"F",
        6:"G"
    }
    const {row,group,innerSeat} = data
    return { row:mapping[row],column:group * 2 + innerSeat + 1 }
}
