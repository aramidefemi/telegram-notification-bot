const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const offeredServiceSchema = new mongoose.Schema(
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
    likes: {
      type: Number,
      default: 0,
    }, 
    rating: {
      type: Number,
      default: 5,
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
    lng: {
      type: String,
      default: "",
    }, 
    lat: {
      type: String,
      default: "",
    }, 
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Skill',
    },
    businessRegistration: {
      type: Boolean,
      default: false,
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

offeredServiceSchema.plugin(mongoose_fuzzy_searching, { fields: ['title', 'description'] });
module.exports = mongoose.model("OfferedService", offeredServiceSchema);
