const Async = require("async");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Skills = require("../../models/skills.model");
const OfferedServices = require("../../models/offeredServices.model");
const Review = require("../../models/review.model");
const codeBits = require("../../lib/code.bits");

exports.getSkills = async (req, res) => {
  const limit = parseInt(req.query.limit)

  const skills = await Skills.find({}).limit(parseInt(limit) || 50);
  return res.status(200).send(skills);
};
exports.searchServices = (req, res) => {
  const { limit, page } = req.query;
  const { search } = req.params;
  const skip = parseInt(limit) * parseInt(page); 
  const query = OfferedServices.fuzzySearch(search);

  query
  .populate('user', "fullname profile_url email phone")
  .populate('category')
    .skip(parseInt(skip) || 0)
    .limit(parseInt(limit) || 30)
    .exec((err, services) => {
      return res
        .status(200)
        .send({
          data: services,
          query: { ...query.getOptions(), total: services.length },
        });
    });
};
exports.getServices = (req, res) => {
  const { limit, page } = req.query;
  const { category_id: category } = req.params;
  const skip = parseInt(limit) * parseInt(page); 
  const query = OfferedServices.find({ category });
  query
  .populate('user', "fullname profile_url email phone")
  .populate('category')
    .skip(parseInt(skip) || 0)
    .limit(parseInt(limit) || 30)
    .exec((err, services) => {
      return res
        .status(200)
        .send({
          data: services,
          query: { ...query.getOptions(), total: services.length },
        });
    });
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

exports.getServiceReviews = async (req, res) => {
  const limit = parseInt(req.query.limit)
  const { service } = req.params;

  const services = await Review.find({ service })
  .limit(parseInt(limit) || 50);

  console.log('service',service)
  return res.status(200).send(services);
};
exports.reviewService = async (req, res) => {
  const { _id: user } = req.user;
  const { body } = req;

  const review  = Review({ ...body, user });
  review.save();


  return res.status(200).send({ success: true });
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
  await Service.updateOne(service);
  return res.status(200).send({ success: true });
};
