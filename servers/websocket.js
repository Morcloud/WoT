let webSocketServer = require('ws').Server,
    recursos = require('./../recursos/modelo')

exports.listen = server => {
    let wss = new webSocketServer({server: server})
    console.info('Servidor Websocket iniciado...')
    wss.on('connection', ws => {
        let url = ws.upgradeReq.url
        console.info(url)
        try {
            let proxy = new Proxy(selectResouce(url), function (cambio) {
                apply: (target, thisArg, listaArgumento) => {
                    ws.send(JSON.stringify(cambio[0].object), ()=>{})
                }
            })
        } 
        catch(e) {
            console.log(`no es posible observar el recursos ${url}`)
        }   
    })
}

const selectResouce = url => {
    let parte = url.split('/')
    parte.shift()
    let resultado = recursos
    for (let i=0; i < parte.length; i++) {
        resultado = resultado[parte[i]]
    }
    return resultado
} 