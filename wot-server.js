let httpServer = require('./servers/http');
let recursos = require('./recursos/modelo');

let dhtPlugin = require('./plugins/sensorTempYHumDHT')

dhtPlugin.start({'simulacion': true, 'frecuencia': 4000})

let servidor = httpServer.listen(recursos.esp.puerto, ()=>{
    console.info(`Wot ESP está encendido y corre en el puerto ${recursos.esp.puerto}`)
})