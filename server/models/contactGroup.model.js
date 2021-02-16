const mongoose = require("mongoose");

const ContactGroupSchema = new mongoose.Schema(
  {
    userOne: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    userTwo: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    contactOne: {
      type: mongoose.Schema.ObjectId,
      ref: 'Contact',
    },
    contactTwo: {
      type: mongoose.Schema.ObjectId,
      ref: 'Contact',
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

module.exports = mongoose.model("ContactGroup", ContactGroupSchema);
