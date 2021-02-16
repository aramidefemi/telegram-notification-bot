const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: "invalid data"
    },
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: "invalid data"
    },
    conversation_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'contactGroup',
      required: "invalid data"
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
      default: "sending",
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
