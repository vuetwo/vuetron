require('dotenv').config();
require('./db');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();

const routes = require('./routes');

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', routes);

const port = 3000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
