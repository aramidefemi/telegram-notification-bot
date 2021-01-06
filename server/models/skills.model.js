const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      required: 'Please enter skill title'
    },
    slug: {
      type: String,
      default: "", 
      required: 'Please enter slug name, this is used in getting images',
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

module.exports = mongoose.model("Skill", SkillSchema);
