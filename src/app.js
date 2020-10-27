const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode.js');
const forecast = require('./utils/forecast.js');


const app = express();
const port = process.env.PORT || 3000
// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

// Setup static directory 
app.use(express.static(publicDirectoryPath));

app.get('',(req, res) => {
    res.render('index', {
        title:'App',
        name:'Dor'
    });
})

app.get('/about',(req, res) => {
    res.render('about', {
        title:'About',
        name:'Dor'
    });
})

app.get('/help',(req, res) => {
    res.render('help', {
        title:'Help',
        name:'Dor'
    });
})




app.get('/weather',(req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: "You must provide a adress "
        });
        
    }
    geoCode(req.query.adress , (error,{latitude , longtitude , location} = {}) => {
        console.log(latitude , longtitude);
        if (error) {
            return res.send({
                error: error
            });
        }else{
            forecast(latitude, longtitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error
                    });
                }else{
                    console.log()
                    console.log()
                    res.send({
                        adress: location,
                        forecast: forecastData,
                        location: location
                    });
                }
              })
        }

    })

})


app.get('/help/*',(req, res) => {
    res.render('404', {
        title:'404',
        name:'Dor',
        errorMessage:'help page not found'
    });
})


app.get('*',(req, res) => {
    res.render('404', {
        title:'404',
        name:'Dor',
        errorMessage:'page not found'
    });
})

app.listen(port, () => {
    console.log('Server is Up - ' + port);
});