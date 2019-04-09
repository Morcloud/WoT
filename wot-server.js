let httpServer = require('./servers/http');
let wsServer = require('./servers/websocket')
let recursos = require('./recursos/modelo');

let dhtPlugin = require('./plugins/sensorTempYHumDHT')
let ledPlugin = require('./plugins/ledsPlugin')

dhtPlugin.start({'simulacion': true, 'frecuencia': 4000})
ledPlugin.start({"simulacion": true, "frecuencia": 3000})

let servidor = httpServer.listen(recursos.esp.puerto, ()=>{
    console.info('Servidor HTTP iniciado...')
    wsServer.listen(servidor)
    console.log(`Wot ESP está encendido y corre en el puerto ${recursos.esp.puerto}`)
})