const express = require('express');
const routerApiV1 = require('./routes');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json()).use(cors());

app.get('/', (req, res) => {
  res.send('Hola traductores desde express');
});

app.use('/', routerApiV1);

app.all('*', (req, res) => {
  res.status(404).json({
    error: `Ups '${req.url}' no existe`,
  });
});

app.listen(port, () => {
  console.log('Corriendo en el puerto ' + port);
});
