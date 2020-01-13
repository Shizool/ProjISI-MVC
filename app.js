const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://init:P1initp1@cluster0-ix2nr.mongodb.net/ProjISI?retryWrites=true&w=majority'
  )
  .then(result => {
    app.listen(3000);
    console.log('\x1b[32m%s\x1b[0m', 'SERVER STARTED ! -> http://localhost:3000');
  })
  .catch(err => {
    console.log(err);
  });
