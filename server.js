const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const FakeDb = require('./fake-db');

const messegeRoutes = require('./routes/messeges'),
      userRoutes = require('./routes/users');

mongoose.set('useCreateIndex', true);

mongoose.connect(config.DB_URI,{ useUnifiedTopology: true ,useNewUrlParser: true }).then(() => {
    //const fakeDb = new FakeDb();
    //fakeDb.seedDb();
});

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/messeges', messegeRoutes);
app.use('/api/v1/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT , function() {
  console.log('App is running!');
});
