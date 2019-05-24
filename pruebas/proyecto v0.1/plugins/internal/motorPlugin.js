var PiServo = require('pi-servo');
 
var sv1 = new PiServo(4); 
 
sv1.open().then(function(){  
  sv1.setDegree(100); // 0 - 180
});