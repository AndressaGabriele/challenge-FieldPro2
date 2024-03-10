export const getAverage = (items: number[]) => {
    let sun = 0 
    items.forEach((i) => {
        sun += i
    })
    return (sun / items.length).toFixed(1) 
}