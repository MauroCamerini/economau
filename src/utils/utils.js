
export const DateFormat = {
    yyyy_mm: (date) => {
        const d = new Date(date)
        return d.getUTCFullYear() + "-" + (d.getUTCMonth()+1).toString().padStart(2,"0")
    } ,
    
    //YY-MM-DD
    yyyy_mm_dd: (date) => {
        const d = new Date(date)
        return d.getUTCFullYear() + "-" + (d.getUTCMonth()+1).toString().padStart(2,"0") +"-"+d.getUTCDate().toString().padStart(2,"0")
    },
}