var httpServer = require('./servers/http'),
  wsServer = require('./servers/websockets'),
  resources = require('./resources/model');

// Plugins para conectores y sensores conectados por GPIO al dispositivo
var ledsPlugin = require('./plugins/internal/ledsPlugin'), 
  pirPlugin = require('./plugins/internal/pirPlugin'), 
  dhtPlugin = require('./plugins/internal/DHT22SensorPlugin'); 

// Simulación de sensores y actuadores = true
pirPlugin.start({'simulate': true, 'frequency': 2000}); 
ledsPlugin.start({'simulate': true, 'frequency': 10000});
dhtPlugin.start({'simulate': true, 'frequency': 10000}); 

// Plugins de puerta de enlace (gateway) por CoAP
var coapPlugin = require('./plugins/external/coapPlugin');
coapPlugin.start({'simulate': false, 'frequency': 10000});

// Servidor HTTP
var server = httpServer.listen(resources.pi.port, function () {
  console.log('Servidor HTTP inicializado');

// Servidor Websockets
  wsServer.listen(server);

  console.info('Tu WoT Thing está corriendo en el puerto %s', resources.pi.port);
});


