const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    profile_url: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    bio: {
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
    imei: {
      type: String,
      default: "",
    },
    imei_list: {
      type: [String],
      default: [],
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    channel: {
      type: String,
      default: ""
    },
    lng: {
      type: String,
      default: "",
    },
    lat: {
      type: String,
      default: "",
    }, 
    is_bot: {
      type: String,
      default: "",
    },
    userType: {
      type: String,
      default: "CUSTOMER", //ADMIN
    },
    language_code: {
      type: String,
      default: "",
    },
    categories: [{
      type: mongoose.Schema.ObjectId,
      ref: "Skill",
    }],
    serviceSearchStrings: [{
      type: String,
      default: "",
    }],
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

module.exports = mongoose.model("User", UserSchema);
