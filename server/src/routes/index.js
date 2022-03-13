const authRoute = require('./auth')
const cardRoute = require('./card')
const homeRoute = require('./home')


module.exports = function(app) {
    
    app.use('/auth',authRoute)
    app.use('/card',cardRoute)
    app.use('/',homeRoute)
}