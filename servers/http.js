let express = require('express');
let rutaActuadores = require('./../rutas/actuadores');
let rutaSensores = require('./../rutas/sensores');
let cors = require('cors');

let app = express();

app.use(cors());

app.use('/esp/actuadores', rutaActuadores);
app.use('/esp/sensores', rutaSensores);

app.get('/esp', (req, res) => {
    res.send('Ruta raíz de ESP');
})

module.exports = app