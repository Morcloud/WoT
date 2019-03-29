let recursos = require('./../recursos/modelo')
let intervalo
let sensor
let modelo = recursos.esp.sensores
let nombrePlugin = 'Temperatura y Humedad'
let parametrosLocales = {'simulacion': false, 'frecuencia': 3000}

exports.start = params => {
    parametrosLocales = params
    if (params.simulacion) {
        simular()
    } else {
        conectarHardware()
    }
}

exports.stop = () => {
    if (parametrosLocales.simulacion) {
        clearInterval(intervalo)
    } else {
        sensor.unexport()
    }
    console.info(`El plugin de ${nombrePlugin} se detuvo`)
}

const conectarHardware = () => {
    let sensorDrive = require('node-dht-sensor')
    let sensor = {
        initialize: () => sensorDrive.initialize(11, modelo.temperatura.gpio),
        read: () => {
            let lectura = sensorDrive.read()
            modelo.temperatura.valor = parseFloat(lectura.temperatura.toFixed(2))
            modelo.humedad.valor = parseFloat(lectura.humedad.toFixed(2))
            mostrarValor()

            setTimeout(()=>{
                sensor.read()
            }, parametrosLocales.frecuencia)
        }
    }
    if (sensor.initialize()) {
        console.info (`El sensor de ${nombrePlugin} está trabajando`)
    } else {
        console.warn('Falló la inicialización del sensor')
    }
}

const simular = () => {
    intervalo = setInterval( ()=> {
        modelo.temperatura.valor = Math.floor(Math.random() * (40 - 0 + 1))
        modelo.humedad.valor = Math.floor(Math.random() * (100 - 0 + 1))
    })
}

const mostrarValor = () => {
    console.log(`Temperatura ${modelo.temperatura.valor} Cº. Humedad ${modelo.humedad.valor}`)
}