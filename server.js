const express = require('express');
const mongodb = require('./db/connect');
const app = express();

const port = process.env.PORT || 3000;

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



