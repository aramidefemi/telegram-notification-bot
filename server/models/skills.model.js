const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      required: 'Please enter skill title'
    },
    image: {
      type: String,
      default: "",
      required: 'Please enter skill image url'
    }
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
