const request = require('request')

const openweathermap = (longitude, latitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + encodeURIComponent(latitude) + '&lon=' + encodeURIComponent(longitude) + '&appid=9a53e18ca13b9fe6b4dfa4b850a65c94&units=metric'
    request({
        url,
        json: true
    }, (error, {
        body
    } = {}) => {
        if (error) {
            callback('Unable to connect server', undefined)
        } else if (body.message) {
            callback(body.message, undefined)
        } else {
            // kelvin to degree
            const temp = body.current.temp
            const weatherDes = body.current.weather[0].description
            callback(undefined, 'This is currently ' + temp + "° celsius. The current weather is " + weatherDes + ". " + "The weather of tomorrow is " + body.daily[1].weather[0].description)
        }
    })
}
module.exports = openweathermap