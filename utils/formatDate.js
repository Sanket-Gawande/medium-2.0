export const Formatted = (date) =>  new Date(date).toLocaleString("en-US" , {month : "short" , day : "2-digit"})
