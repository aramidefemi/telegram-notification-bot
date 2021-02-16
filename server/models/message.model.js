const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    receiver: {
      type: String,
      default: "",
    },
    sender: {
      type: String,
      default: "",
    },
    contactGroup: {
      type: mongoose.Schema.ObjectId,
      ref: 'contactGroup',
    },
    messageType: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    readReceipt: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "",
    },
    ip: {
      type: String,
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

module.exports = mongoose.model("Message", MessageSchema);
