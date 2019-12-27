const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');


mongoose.set('useCreateIndex', true);

mongoose.connect(config.DB_URI,{ useUnifiedTopology: true ,useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT , function() {
  console.log('App is running!');
});
