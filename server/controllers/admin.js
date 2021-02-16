  const Error = require("../models/errors.model");
const User = require("../models/user.model"); 
const codeBits = require("../lib/code.bits");

exports.getAllUsers = async (req, res) => { 
  const limit = parseInt(req.query.limit)

  const  users = await  User.find({}).limit(parseInt(limit) || 50);
  return res.status(200).send(users);
};

