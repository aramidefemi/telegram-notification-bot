const mongoose = require("mongoose");

const offeredServicesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      required: 'Please enter title'
    },
    description: {
      type: String,
      default: "", 
      required: 'Please enter description',
    },
    address: {
      type: String,
      default: "",
    }, 
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    phone: {
      type: String,
      default: "",
    }, 
    email: {
      type: String,
      default: "",
    }, 
    category: {
      type: String,
      default: "",
    },
    images: {
      type: Array,
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

module.exports = mongoose.model("OfferedServices", offeredServicesSchema);
