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
            const minTemp = body.daily[0].temp.min
            const maxTemp = body.daily[0].temp.max
            const icon = body.current.weather[0].icon
            callback(undefined, '<img src="http://openweathermap.org/img/wn/' + icon + '@2x.png"><h2> This is currently ' + temp + "° celsius. The current weather is " + weatherDes + ". Today's maximum temperature is " + maxTemp + "° celsius and minimum temperture is " + minTemp + "° celsius. " + "The weather of tomorrow is " + body.daily[1].weather[0].description + ". </h2>")
        }
    })
}
module.exports = openweathermap