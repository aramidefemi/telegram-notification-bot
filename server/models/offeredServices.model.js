const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");
const Likes = require("./likes.model");
const offeredServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      required: "Please enter title",
    },
    description: {
      type: String,
      default: "",
      required: "Please enter description",
    },

    address: {
      type: String,
      default: "",
    },
    likers: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
      ],
    },
    rating: {
      type: Number,
      default: 5,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
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
    distance: {
      type: String,
      default: "",
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Skill",
    },
    businessRegistration: {
      type: Boolean,
      default: false,
    },
    liked: {
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

// offeredServiceSchema.virtual("liked").get(function () {
//   return this.likers;
// });
offeredServiceSchema.virtual("likes").get(function (e) { 
  return this.likers.length;
});
offeredServiceSchema.virtual("likes").get(function (e) { 
  return this.likers.length;
});
offeredServiceSchema.plugin(mongoose_fuzzy_searching, {
  fields: ["title", "description"],
});

// offeredServiceSchema.post(["find", "findOne"], function (docs) {
//   Array.isArray(docs);
//   console.log('2');
// });
module.exports = mongoose.model("OfferedService", offeredServiceSchema);
