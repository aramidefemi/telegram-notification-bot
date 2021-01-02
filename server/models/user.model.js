const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
      trim: true,
    },
    ip: {
      type: String,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
    },
    channel: {
      type: String,
    },
    userid: {
      type: String,
      default: "",
    },
    is_bot: {
      type: String,
      default: "",
    },
    language_code: {
      type: String,
      default: "",
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

module.exports = mongoose.model("User", ResponseSchema);
