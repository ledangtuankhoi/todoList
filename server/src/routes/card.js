const express = require('express')
const route = express.Router()
const cardController = require('../app/controllers/cardController')

route.get('/',cardController.index)
route.post('/',cardController.create)
route.delete('/delete-all',cardController.deleteAll) 

module.exports = route