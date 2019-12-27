const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

const userRoutes = require('./routes/users');

mongoose.set('useCreateIndex', true);

mongoose.connect(config.DB_URI,{ useUnifiedTopology: true ,useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT , function() {
  console.log('App is running!');
});
