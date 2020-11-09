const getCurrentDate = () => {
    let date = new Date().toISOString().split('T')
    return {
        day: date[0],
        time: date[1],
    }
}

module.exports = {
    getCurrentDate,
}
