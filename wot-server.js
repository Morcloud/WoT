let httpServer = require('./servers/http');
let recursos = require('./recursos/modelo');

let servidor = httpServer.listen(recursos.esp.puerto, ()=>{
    console.info(`Wot ESP está encendido y corre en el puerto ${recursos.esp.puerto}`)
})