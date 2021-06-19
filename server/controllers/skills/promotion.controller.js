const Async = require("async");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Skills = require("../../models/skills.model");
const OfferedServices = require("../../models/offeredServices.model");
const Review = require("../../models/review.model");
const Likes = require("../../models/likes.model");
const codeBits = require("../../lib/code.bits");
const NodeGeocoder = require("node-geocoder");

const options = {
  provider: "google",
  apiKey: "AIzaSyA_6NN1i-sZCJy-z8JpfMcYGUCS7p5fZq0",
};

const geocoder = NodeGeocoder(options);
exports.getSkills = async (req, res) => {
  const limit = parseInt(req.query.limit);

  const skills = await Skills.find({}).limit(parseInt(limit) || 50);
  return res.status(200).send(skills);
};
exports.searchServices = async (req, res) => {
  try {
    const { _id } = req.user;
    const { limit, page } = req.query;
    const { search } = req.params;
    const skip = parseInt(limit) * parseInt(page);
    const results = OfferedServices.fuzzySearch(search)
      .populate("user", "fullname profile_url email phone")
      .populate("category")
      .skip(parseInt(skip) || 0)
      .limit(parseInt(limit) || 20);

    const data = results.map((item) => {
      item.liked = item.likers.includes(_id);
      return item;
    });

    return res.status(200).send({
      data,
      query: {
        skip: skip || 0,
        limit: limit || 20,
        page: page || 1,
      },
    });
  } catch (error) {
    return res.status(400).send({ err: error.message });
  }
};
exports.getServices = async (req, res) => {
  try {
    const { _id } = req.user;
    const { limit, page } = req.query;
    const { category_id: category } = req.params;
    const skip = parseInt(limit) * parseInt(page);
    const results = await OfferedServices.find({ category })
      .populate("user", "fullname profile_url email phone")
      .populate("category")
      .skip(parseInt(skip) || 0)
      .limit(parseInt(limit) || 20);

    const data = results.map((item) => {
      item.liked = item.likers.includes(_id);
      return item;
    }); 

    return res.status(200).send({
      data,
      query: {
        skip: skip || 0,
        limit: limit || 20,
        page: page || 1,
      },
    });
  } catch (error) {
    return res.status(400).send({ err: error.message });
  }
};
exports.getService = async (req, res) => {
  try {
    // const places = await geocoder.reverse({ lat: 5.141486901, lon: 7.308389001 });
    // console.log('places',places)
    const { id } = req.params;
    const { _id } = req.user;

    const service = await OfferedServices.findById(id)
      .populate("user", "fullname profile_url email phone")
      .populate("category");

    service.liked = service.likers.includes(_id);

    return res.status(200).send({ service });
  } catch (error) {
    return res.status(400).send({ err: error.message });
  }
};
exports.likeService = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;

    const like = new Likes({ service: id, user: _id });
    await like.save();

    const service = await OfferedServices.findOne({ _id: id });
    if (!service) throw new Error("Service not found");

    await service.updateOne({ $push: { likers: _id } });
    return res.status(200).send({ id, likes: service.likers.length + 1 });
  } catch (error) {
    return res.status(400).send({ err: error.message });
  }
};
exports.unlikeService = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;

    const like = Likes.findOne({ service: id, user: _id });
    await like.remove();

    const service = await OfferedServices.findOne({ _id: id });
    if (!service) throw new Error("Service not found");
    await service.updateOne({ $pull: { likers: _id } });
    return res.status(200).send({ id, likes: service.likers.length - 1 });
  } catch (error) {
    return res.status(400).send({ err: error.message });
  }
};
exports.rateService = async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  const service = await OfferedServices.findOne({ _id: id });
  const rating = round((service.rating + rate) / 2, 1);
  await service.updateOne({ rating });
  return res.status(200).send({ id, rating });
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
  const limit = parseInt(req.query.limit);
  const { service } = req.params;

  const services = await Review.find({ service })
    .populate("user", "fullname profile_url email phone")
    .limit(parseInt(limit) || 50);

  return res.status(200).send(services);
};
exports.reviewService = async (req, res) => {
  const { _id: user } = req.user;
  const { body } = req;

  const review = Review({ ...body, user });
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
  const Service = await OfferedServices.findOne({ _id: service.id });
  delete service._id;
  await Service.updateOne(service);
  return res.status(200).send({ success: true });
};

function calcCrow(coordinates) {
  const [lat2c, lon2] = coordinates.split(",");
  const lat1c = "51.515419";
  const lon1 = "-0.141099";
  var R = 6371; // km
  var dLat = toRad(lat2c - lat1c);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1c);
  var lat2 = toRad(lat2c);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}
function toRad(Value) {
  return (Value * Math.PI) / 180;
}
