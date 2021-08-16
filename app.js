const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname + '/../client/public')))

app.get('/', (req, res) => {
  res.sendFile(__dirname  + 'index.html');
})

const PORT  = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
})