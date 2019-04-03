let express = require('express');
let rutaActuadores = require('./../rutas/actuadores');
let rutaSensores = require('./../rutas/sensores');
let convertidor = require('./../middleware/convertidor')
let cors = require('cors');
let bodyParser = require('body-parser')

let app = express();

app.use(bodyParser.json())

app.use(cors());

app.use('/esp/actuadores', rutaActuadores);
app.use('/esp/sensores', rutaSensores);

app.get('/esp', (req, res) => {
    res.send('Ruta raíz de ESP');
})

app.use(convertidor())
module.exports = app