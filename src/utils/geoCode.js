const request = require('request');
const geoCode = (adress,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(adress) +'.json?access_token=pk.eyJ1IjoiZG9yZXRyaWJlIiwiYSI6ImNrZ3Axam1sbjA1dzYycXRkYjJ0MHpvNW0ifQ.ojjGAkAI16JGzP8jlmCGRA&limit=1'
    request({url,json:true}, (error,{body}) => {
        if (error) {
            callback('Unable to connect',undefined)
        }if (body.features.length === 0 ) {
            callback('Unable to find location',undefined)
        } else {
            const latitude = body.features[0].center[1]
            const longtitude = body.features[0].center[0]
            const location = body.features[0].place_name
            callback(undefined,{
                latitude:latitude,
                longtitude:longtitude,
                location: location
            })

        }
    })
}

module.exports = geoCode;
