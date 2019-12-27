const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const FakeDb = require('./fake-db');
const path = require('path');

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

//serve static assests if in production 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT , function() {
  console.log('App is running!');
});
