require('dotenv').config();
require('./db');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();

const routes = require('./routes');

// middleware to allow CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', routes);

const port = 9000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
