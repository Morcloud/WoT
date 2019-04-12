var resources = require('./../../resources/model'),
  utils = require('./../../utils/utils.js');

var interval, sensor;
var model = resources.pi.sensors;
var pluginName = 'Temperatura y Humedad';
var localParams = {'simulate': false, 'frequency': 5000};

exports.start = function (params) {
  localParams = params;
  if (params.simulate) {
    simulate();
  } else {
    connectHardware();
  }
};

exports.stop = function () {
  if (params.simulate) {
    clearInterval(interval);
  } else {
    sensor.unexport();
  }
  console.info('%s plugin detenido', pluginName);
};

function connectHardware() {
 var sensorDriver = require('node-dht-sensor');
  var sensor = {
    initialize: function () {
      return sensorDriver.initialize(22, model.temperature.gpio); 
    },
    read: function () {
      var readout = sensorDriver.read(); 
      model.temperature.value = parseFloat(readout.temperature.toFixed(2));
      model.humidity.value = parseFloat(readout.humidity.toFixed(2)); 
      showValue();

      setTimeout(function () {
        sensor.read(); 
      }, localParams.frequency);
    }
  };
  if (sensor.initialize()) {
    console.info('Sensor %s iniciado', pluginName);
    sensor.read();
  } else {
    console.warn('Fallo en iniciar el sensor');
  }
};

function simulate() {
  interval = setInterval(function () {
    model.temperature.value = utils.randomInt(0, 40);
    model.humidity.value = utils.randomInt(0, 100);
    showValue();
  }, localParams.frequency);
  console.info('Simulación de sensor %s iniciado', pluginName);
};

function showValue() {
  console.info('Temperatura: %s C, humedad %s \%',
    model.temperature.value, model.humidity.value);
};
