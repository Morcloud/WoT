let express = require('express')
let router = express.Router()
let recursos = require('./../recursos/modelo')

router.route('/').get( (req, res, next) => {
    //res.send(recursos.esp.sensores)
    req.result = recursos.esp.sensores
    next()
})

router.route('/temperatura').get( (req, res, next) => {
    //res.send(recursos.esp.sensores.temperatura)
    req.result = recursos.esp.sensores.temperatura
    next()
})

router.route('/humedad').get( (req, res, next) => {
    //res.send(recursos.esp.sensores.humedad)
    req.result = recursos.esp.sensores.humedad
    next() 
})

module.exports = router