let msgpack = require('msgpack5')()
let json2html = require('node-json2html')
let encode = msgpack.encode

module.exports = () =>{
    return (req, res, next) => {
        console.log('Middleware de conversión de representación llamado')
        if(req.result) {
            if(req.accepts('json')) {
                console.log('Representación JSON seleccionada')
                res.send(req.result)
                return
            }
            if(req.accepts('html')) {
                console.log('Representación HTML selecionada')
                let transformar = {'tag': 'div', 'html': '${name} : ${value}'}
                res.send(json2html.transformar(req.result, transformar))
                return
            }
            if(req.accepts('application/x-msgpack')) {
                console.log('Representacion msgpack seleccionado')
                res.type('application/x-msgpack')
                res.send(encode(req.result))
                return
            }
            console.log('Enviando representacion JSON default')
            res.send(req.result)
            return
        } else {
            next()
        }
    }
}