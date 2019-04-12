var utils = require('./../../utils/utils.js'),
  resources = require('./../../resources/model');

var interval, me, pluginName, pollInterval;
var localParams = {'simulate': false, 'frequency': 5000};

function connectHardware() {
  var coap = require('coap'),
    bl = require('bl'); 

  var sensor = {
    read: function () { 
      coap
        .request({ 
          host: 'localhost', //Cambiar localhost por IP de donde se simula CoAP
          port: 5683,
          pathname: '/co2',
          options: {'Accept': 'application/json'}
        })
        .on('response', function (res) { 
          console.info('Código de respuesta CoAP', res.code);
          if (res.code !== '2.05')
            console.log("Error al contactar dispositivo CoaP: %s", res.code);
          res.pipe(bl(function (err, data) { 
            var json = JSON.parse(data);
            me.value = json.co2;
            showValue();
          }));
        })
        .end();
    }
  };
  pollInterval = setInterval(function () { 
    sensor.read();
  }, localParams.frequency);
};

function configure() { 
  utils.addDevice('coapDevice', 'Dispositivo CoAP',
    'Un dispositivo CoAP',
    {
      'co2': {
        'name': 'Sensor de CO2',
        'description' : 'Sensor ambiente de CO2',
        'unit': 'ppm',
        'value': 0
      }
    });
  me = resources.things.coapDevice.sensors.co2;
  pluginName = resources.things.coapDevice.name;
};

exports.start = function (params, app) {
  localParams = params;
  configure(app);

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
    clearInterval(pollInterval);
  }
  console.info('%s plugin detenido', pluginName);
};

function simulate() {
  interval = setInterval(function () {
    me.value = utils.randomInt(0, 1000);
    showValue();
  }, localParams.frequency);
  console.info('Simulación de sensor %s iniciado', pluginName);
};

function showValue() {
  console.info('Nivel de CO2: %s ppm', me.value);
};