const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const openweathermap = require('./utils/openWeatherMap')
const app = express()
const hbs = require('hbs')
// define derectory for express
const filePathDerictory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup static derictory to serve
app.use(express.static(filePathDerictory))
// configer hbs and set views derectory
app.set('view engine', 'hbs')
//this is defin views path to another folder ex template is is default as views folder name
app.set('views', viewPath)

// setup partials
hbs.registerPartials(partialsPath)
//
app.get('', (req, res) => {
    res.render('index', {
        mainTitle: 'weather',
        navigate1: "active",
        title: 'Weather',
        name: 'Arif Rahman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        mainTitle: 'help',
        navigate2: 'active',
        title: 'About me',
        name: 'Arif Rahman'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        mainTitle: 'help',
        navigate3: 'active',
        title: 'Help',
        name: 'Arif Rahman'
    })
})
app.get('/help/*', (req, res) => {
    res.render("404", {
        title: 404,
        name: "Arif Rahman",
        errormsg: "Help search not found",
        header: "/help",
        headerTxt: 'help center'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must have to provide a location. '
        })
    }
    geocode(req.query.address, (error, {
        longitude,
        latitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        openweathermap(longitude, latitude, (error, data) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                address: req.query.address,
                forecast: data,
                location: location
            })
        })

    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Arif Rahman',
        errormsg: 'Page not found , Please go back home and try again.',
        header: '/',
        headerTxt: "Home"
    })
})


app.listen(3000, () => {
    console.log("app started in PORT 3000!")
})