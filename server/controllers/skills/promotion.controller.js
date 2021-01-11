const Async = require("async");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Skills = require("../../models/skills.model");
const OfferedServices = require("../../models/offeredServices.model");
const codeBits = require("../../lib/code.bits");

exports.getSkills = async (req, res) => {
  const skills = await Skills.find({});
  return res.status(200).send(skills);
};

exports.addSkills = async (req, res) => {
  const skills = req.body;
  await Skills.insertMany(skills);
  return res.status(200).send({ success: true });
};

exports.offerService = async (req, res) => {
  const { _id: user } = req.user;
  const offeredServices = new OfferedServices({ ...req.body, user });
  offeredServices.save((err) => {
    if (err) return res.status(200).send({ error: err });
    return res.status(200).send({ success: true, service: offeredServices });
  });
};

exports.deleteOfferedService = (req, res) => {
  const { id: _id } = req.body;
  OfferedServices.deleteOne({ _id }, (err) => {
    if (err) return res.status(200).send({ error: err });
    return res.status(200).send({ success: true });
  });
};
exports.editOfferedService = async (req, res) => {
  const service = req.body;
  const Service = OfferedServices.findOne({ _id: service.id });
  delete service._id;
  Service.updateOne(service);
  return res.status(200).send({ success: true });
};
