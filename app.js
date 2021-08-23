const express = require('express');
const fs = require('fs');
const path = require('path');
const FactoryAlgorithms = require('./algorithms/factoryAlgorithms');
const algorithmInstance = new FactoryAlgorithms();

const app = express();

app.use('/', express.static(path.join(__dirname + '/../client/public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + 'index.html'));
})

app.get('/alg/sort/:algName', (req, res) => {
  const { algName } = req.body;
  algorithmInstance.getAlgorithmInstance('sort', algname);
  res.sendFile(path.join(__dirname + 'index.html'));
})
app.get('/alg/search/:algName', (req, res) => {
  const { algName } = req.body;
  algorithmInstance.getAlgorithmInstance('search', algname);
  res.sendFile(path.join(__dirname + 'index.html'));
})

app.get('/movies', (req, res) => {
  let dataFromJson;
  fs.readFile('movies.json', function(err, data) {
    if(err) throw err;
    dataFromJson = JSON.parse(data);
    res.send(dataFromJson);
  })
})

const PORT  = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
})