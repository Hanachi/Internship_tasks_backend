'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const { FactoryAlgorithms } = require('./algorithms/factoryAlgorithms');
const algorithmInstance = new FactoryAlgorithms();

const app = express();

app.use('/', express.static(path.join(__dirname + '/../client/public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + 'index.html'));
})

app.get('/alg/sort/:algName/:key', (req, res) => {
  const { algName, key } = req.params;
  const hrstart = process.hrtime();
  //setinterval 100ms
  const sortedData = algorithmInstance.getAlgorithmInstance('sort', algName, key);

  const hrend = process.hrtime(hrstart);
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  
  console.log(`${algName} exectuion time is: ${hrend} ms`);
  console.log(`${algName} uses ${Math.round(used * 100) / 100} MB`);
  res.send(sortedData); 
})
app.get('/alg/search/:algName/:key&:keyValue', (req, res) => {
  const { algName, key, keyValue } = req.params;
  
  const hrstart = process.hrtime();
  const foundMoviesList = algorithmInstance.getAlgorithmInstance('search', algName, key, keyValue);

  const hrend = process.hrtime(hrstart);
  const used = process.memoryUsage().heapUsed / 1024 / 1024;

  console.log(`${algName} exectuion time is: ${hrend} ms`);
  console.log(`${algName} uses ${Math.round(used * 100) / 100} MB`);
  res.send(foundMoviesList);
})

app.get('/movies', (req, res) => {
  let dataFromJson;
  
  fs.readFile('movies.json', function (err, data) {
    if (err) throw err;
    dataFromJson = JSON.parse(data);
    res.send(dataFromJson);
  })
})

const PORT  = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
})