const request = require('request');
const forecast = (lan,long,callback) => {
     url = 'http://api.weatherstack.com/current?access_key=c7df0bf77abc4805833e4c867e2a734f&query='+lan+','+long+'&units=m'
    request({url,json:true}, (error,{body}) => {
        if (error) {
            callback('Unable to connect',undefined)
        }if (body.error === 0 ) {
            callback('Unable to find location',undefined)
        } else {
         console.log(body);
         const temperature = body.current.temperature
         const feelsLikeTemperature = body.current.feelslike
         const weatherDesc = body.current.weather_descriptions[0]
            callback(undefined,'its '+ weatherDesc +' out side, the temperature is '+ temperature + ' degrees outside and its feels like ' + feelsLikeTemperature)

        }
    })
}


module.exports = forecast;
