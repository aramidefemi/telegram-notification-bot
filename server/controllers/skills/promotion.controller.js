const Async = require("async");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');  
const Skills = require("../../models/skills.model");
const codeBits = require("../../lib/code.bits");

exports.getSkills = async (req, res)  => {
  const skills = await Skills.find({}); 
  return res.status(200).send(skills);
};

exports.addSkills = async (req, res) => {
  const skills = req.body;
  await Skills.insertMany(skills); 
  return res.status(200).send({ success: true });
};
 