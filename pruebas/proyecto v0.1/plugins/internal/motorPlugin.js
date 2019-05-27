let resources = require('./../../resources/model')
const PiServo = require('pi-servo')
let localParams = {'simulate': false, 'pulse': 1000}
let model = resources.pi.actuators.motor
let pluginName = model.name

// Checar servomotor y compatibilidad de librerías
// Usando pi-blaster
const sv1 = new PiServo(4)
 
sv1.open().
  then(function(){  
    sv1.setDegree(100)
});

// Usando pigpio
const Gpio = require('pigpio').Gpio
 
const motor = new Gpio(10, {mode: Gpio.OUTPUT})
 
//let pulse = 1000
let inc = 100

function simulate() {}

setInterval(() => {
  motor.servoWrite(pulse)
 
  pulseWidth += inc
  if (pulse >= 2000) {
    inc = -100
  } else if (pulse <= 1000) {
    inc = 100
  }
}, 1000)

