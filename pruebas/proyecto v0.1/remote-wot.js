var mqtt = require('mqtt');
var config = require('./config.json'); 

var thngId=config.thngId; 
var thngUrl='/thngs/'+thngId;
var thngApiKey=config.thngApiKey; 

var status=false;
var updateInterval;

var client = mqtt.connect("mqtts://mqtt.evrythng.com:8883", {
  username: 'authorization',
  password: thngApiKey 
});

client.on('connect', function () {
  client.subscribe(thngUrl+'/properties/');
  client.subscribe(thngUrl+'/actions/all'); 
  updateProperty('realTime',true);
  if (! updateInterval) updateInterval = setInterval(updateProperties, 5000);
});

client.on('message', function(topic, message) {
  var resources = topic.split('/');
  if (resources[1] && resources[1] === "thngs"){ 
    if (resources[2] && resources[2] === thngId){  
      if (resources[3] && resources[3] === "properties"){
        var property = JSON.parse(message);
        console.log('La propiedad fue actualizada: '+property[0].key+'='+property[0].value); 
      } else if (resources[3] && resources[3] === "actions"){ 
        var action = JSON.parse(message);
        handleAction(action); 
      }
    }
  }
});

function handleAction(action) {
  switch(action.type) { 
    case 'led1':
      console.log('led 1 cambiado a: '+action.customFields.status); 
      status=Boolean(action.customFields.status);
      updateProperty ('status',status);
      
      break;
    case 'led2':
      console.log('les 2 cambiado a: '+action.customFields.level);
      break;
    default:
      console.log('Acción desconocida: '+action.type);
      break;
  }
}

function updateProperties() {
  var voltage = (219.5 + Math.random()).toFixed(3); 
  updateProperty ('voltage',voltage);

  var current = (Math.random()*10).toFixed(3); 
  if (status==false) current = 0.001;
  updateProperty ('curriente',current);

  var power = (voltage * current * (0.6+Math.random()/10)).toFixed(3); 
  updateProperty ('power',power);
}

function updateProperty(property,value) {
  client.publish(thngUrl+'/properties/'+property, '[{"value": '+value+'}]');
}

process.on('SIGINT', function() { 
  updateProperty('realTime',false);
  clearInterval(updateInterval);
	client.end();
  process.exit();
});