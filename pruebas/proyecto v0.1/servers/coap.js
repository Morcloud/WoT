var coap = require('coap'),  
  utils = require('./../utils/utils');

var port = 5683;

coap.createServer(function (req, res) {
  console.info('Dispositivo CoAP tiene una petición para: %s', req.url);
  if (req.headers['Accept'] != 'application/json') {
    res.code = '4.06'; 
    return res.end();
  }
  switch (req.url) { 
    case "/co2":
      respond(res, {'co2': utils.randomInt(0, 1000)});
      break;
    case "/temp":
      respond(res, {'temp': utils.randomInt(0, 40)});
      break;
    default:
      respond(res);
  }
}).listen(port, function () {
  console.log("Servidor CoAP iniciado en el puerto: %s", port)
});

function respond(res, content) { 
  if (content) {
    res.setOption('Content-Format', 'application/json');
    res.code = '2.05';
    res.end(JSON.stringify(content));
  } else {
    res.code = '4.04';
    res.end();
  }
};
