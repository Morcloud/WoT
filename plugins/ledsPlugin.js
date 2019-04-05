let recursos = require('./../recursos/modelo')

let actuador, intervalo
let modelo = recursos.esp.actuadores.leds['1']
let nombrePlugin = modelo.nombre
let parametrosLocales = {'simulacion': false, 'frecuencia': 3000}

exports.start = params => {
    parametrosLocales = params
    observar(modelo)

    if(parametrosLocales.simulacion) {
        simular()
    } else {
        conectarHardware()
    }
}

exports.stop = () => {
    if(parametrosLocales.simulacion) {
        clearInterval(intervalo)
    } else {
        actuador.unexport()
    }
    console.log(`${nombrePlugin} se a detenido`)
}

// const observe = que => {
//     Object.observe(que, cambios => {
//         console.log(`Cambios detectados para el plugin ${nombrePlugin}`)
//         cambiarOnOff(modelo.valor)
//     })
// }
const observar = que => {
    let proxy = new Proxy(que, {
        get: function(target, prop) {
            console.log(`Cambios detectados para el plugin ${nombrePlugin}`)
            cambiarOnOff(modelo.valor)
        }
    })
}



const cambiarOnOff = valor => {
    if(!parametrosLocales.simulacion) {
        actuador.write(valor == true ? 1 : 0, () => {
            console.log(`Cambio de valor para ${nombrePlugin} a ${valor}`)
        })
    }
}

const conectarHardware = () => {
    let Gpio = require('onoff').Gpio
    actuador = new Gpio(modelo.gpio, 'out')
    console.log(`actuador ${nombrePlugin} comenzado`)
}

const simular = () => {
    intervalo = setInterval( () => {
        if(modelo.valor) {
            modelo.valor = false
        } else {
            modelo.valor = true
        }
    }, parametrosLocales.frecuencia)
    console.log(`Simulacion del actuador ${nombrePlugin} comenzado`)
}