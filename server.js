const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const app = express();

const port = process.env.PORT || 3000;

// this is middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.json());
// this is just for testing purposes, allows all origins
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
app.use('/', require('./routes/contacts'));
// make a change to update

mongodb.initDb((err) => {
  if(err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
    });
  }
});



