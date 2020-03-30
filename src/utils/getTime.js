const padTime = (num) => {
    return ('0' + num).slice(-2);
};

export const updateTime = (timeStamp) => {
    let date = new Date(timeStamp);
    let hours = padTime(date.getHours());
    let minutes = padTime(date.getMinutes());
    return hours + ':' + minutes;
};