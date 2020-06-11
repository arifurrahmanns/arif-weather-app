const request = require('request')
const geocodding = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXJpZm5zMjMxMiIsImEiOiJja2F5dmU4c2UwNmJjMnFwaWs0MG9sMGM3In0.4Khg8hr4Chd3ort_faoTXw&limit=1'
    request({
        url,
        json: true
    }, (error, {
        body
    } = {}) => {
        if (error) {
            callback('Unable to connect server. ', undefined)
        } else if (body.features.length === 0) {
            callback("Invalid location , Please try another location. ", undefined)
        } else {
            const lonLat = (body.features[0].center)
            const lognitude = lonLat[0]
            const latitude = lonLat[1]
            callback(undefined, {
                longitude: lognitude,
                latitude: latitude,
                location: (body.features[0].place_name)
            })
        }
    })
}
module.exports = geocodding