const express = require('express'); 
const mongoose = require('mongoose'); 
var bodyParser = require('body-parser') 
const config = require('../config/config'); 
const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 4000;


// Configuration
// ================================================================================================

// Set up Mongoose
mongoose.connect(isDev ? config.db_dev : config.db);
mongoose.Promise = global.Promise;

const app = express();
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// API routes
require('./routes')(app);
 

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.info('Telegram bot is listening on port 4000!', port);
});

module.exports = app;
