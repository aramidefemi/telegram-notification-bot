const mongoose = require('mongoose');

const LikesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  service: {
    type: mongoose.Schema.ObjectId,
    ref: 'OfferedService',
  },
} , {
  timestamps: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

module.exports = mongoose.model('Likes', LikesSchema);
