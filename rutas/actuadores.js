let express = require('express')
let router = express.Router()
let recursos = require('./../recursos/modelo')

router.route('/').get( (req, res, next) => {
    res.send(recursos.esp.actuadores)
    //req.result = recursos.esp.actuadores
})

router.route('/motores').get( (req, res, next) => {
    res.send(recursos.esp.actuadores.motores)
    //req.result = recursos.esp.actuadores.motores
})

router.route('/motores/:id').get( (req, res, next) => {
    res.send(recursos.esp.actuadores.motores[req.params.id])
    // req.result = recursos.esp.actuadores.motores[req.params.id]
    // next()
}).put( (req, res, next) =>{
    let motorSelecionado = recursos.esp.actuadores.motores[req.params.id]
    // motorSelecionado.valor = req.body.value
    // req.result = motorSelecionado
    next()
})

router.route('/leds').get((req, res, next) => {
    res.send(recursos.esp.actuadores.leds)
    req.result = recursos.esp.actuadores.leds
    next()
})

router.route('/leds/:id').get((req, res, next) => {
    res.send(recursos.esp.actuadores.leds[req.params.id])
}).put((req, res, next) => {
    let ledSeleccionado = recursos.esp.actuadores.leds[req.params.id]
    ledSeleccionado.valor = req.body.valor
    console.log(`LED ${req.params.id} cambiado a ${ledSeleccionado}`)
    req.result = ledSeleccionado
    next()
})

module.exports = router