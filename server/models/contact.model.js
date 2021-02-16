const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    partner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    contact: {
      type: mongoose.Schema.ObjectId,
      ref: 'ContactGroup',
    },
    lastMessage: {
      type: mongoose.Schema.ObjectId,
      ref: 'Message',
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("Contact", ContactSchema);
