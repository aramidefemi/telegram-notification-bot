const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  from: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    default: ''
  },
  chat: {
    type: mongoose.Schema.Types.Mixed
  },
  reply: {
    type: String,
    default: ''
  },
  messageid: {
    type: String,
    default: ''
  },
});

module.exports = mongoose.model('Response', ResponseSchema);
