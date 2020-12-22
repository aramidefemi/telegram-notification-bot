const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  username: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: '', 
  },
  password: {
    type: String,
    default: '',
    trim: true
  },
  channel: {
    type: String
  },
  data: {
    type: mongoose.Schema.Types.Mixed
  },
  userid: {
    type: String,
    default: ''
  },
  is_bot: {
    type: String,
    default: ''
  },
  language_code: {
    type: String,
    default: ''
  },
});
 

module.exports = mongoose.model('User', ResponseSchema);
