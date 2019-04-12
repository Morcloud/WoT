var resources = require('./../../resources/model');

var actuator, interval;
var model = resources.pi.actuators.leds['1'];
var pluginName = model.name;
var localParams = {'simulate': false, 'frequency': 2000};

exports.start = function (params) {
  localParams = params;
  observe(model); 

  if (localParams.simulate) {
    simulate();
  } else {
    connectHardware();
  }
};

exports.stop = function () {
  if (localParams.simulate) {
    clearInterval(interval);
  } else {
    actuator.unexport();
  }
  console.info('%s plugin detenido', pluginName);
};

function observe(what) {
  Object.observe(what, function (changes) {
    console.info('Cambio detectado del plugin para %s...', pluginName);
    switchOnOff(model.value); 
  });
};

function switchOnOff(value) {
  if (!localParams.simulate) {
    actuator.write(value === true ? 1 : 0, function () { 
      console.info('Valor cambiado de %s a %s', pluginName, value);
    });
  }
};

function connectHardware() {
  var Gpio = require('onoff').Gpio;
  actuator = new Gpio(model.gpio, 'out'); 
  console.info('Actuador %s iniciado', pluginName);
};

function simulate() {
  interval = setInterval(function () {
    if (model.value) {
      model.value = false;
    } else {
      model.value = true;
    }
  }, localParams.frequency);
  console.info('Simulación del actuador %s iniciado', pluginName);
};
