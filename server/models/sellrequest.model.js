const mongoose = require('mongoose');

const SellRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: ''
  },
  condition: {
    type: String,
    default: ''
  },
  storageCapacity: {
    type: String,
    default: ''
  },
});

module.exports = mongoose.model('SellRequest', SellRequestSchema);
