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

module.exports = router