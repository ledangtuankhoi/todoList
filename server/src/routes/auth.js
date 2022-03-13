

const express = require('express')
const route = express.Router()


route.get('/login', function(req, res){
    res.send('login')
})

module.exports = route