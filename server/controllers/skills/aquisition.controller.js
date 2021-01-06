const Async = require("async");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");
const Response = require("../../models/response.model");
const SellRequest = require("../../models/sellrequest.model");
const codeBits = require("../../lib/code.bits");

exports.signup = function (req, res) {
  const user = req.body;
  Async.waterfall(
    [
      (next) => {
        User.findOne({ email: user.email }).exec((err, result) => {
          if (err) next(err);

          result === null ? next(null) : next("User already exists");
        });
      },
      (next) => {
        bcrypt.hash(user.password, 10, function (err, hash) {
          if (err) next(err);
          user.password = hash;
          next();
        });
      },
      (next) => {
        const payload = User(user);
        payload.save();
        next(null, payload);
      },
      (payload, done) => {
        console.log("payload", payload);
        const options = { expiresIn: "2d", issuer: "aramidev" };
        const secret = "oluwafemi-olasubomi";
        const token = jwt.sign({ ...payload }, secret, options);
        res.status(200).send({ token, user: payload });
        codeBits.sendMessageToAdmin(
          `new user account created ${payload.email}`
        );
        done();
      },
    ],
    (err) => {
      if (err) {
        res.status(400).send({ error: err });
        codeBits.sendMessageToAdmin(`an error occurred ${err}`);
      }
    }
  );
};
exports.login = function (req, res) {
  const user = req.body;
  Async.waterfall(
    [
      (next) => {
        user.email && user.password ? next(null) : next("Invalid Parameters");
      },
      (next) => {
        User.findOne({ email: user.email }).exec((err, payload) => {
          if (err) next(err);

          payload !== null ? next(null, payload) : next("User not found");
        });
      },
      (payload, next) => {
        bcrypt.compare(user.password, payload.password, function (err, result) {
          result ? next(null, payload) : next("Passwords don't match");
        });
      },
      (payload, done) => {
        const options = { expiresIn: "2d", issuer: "aramidev" };
        const secret = "oluwafemi-olasubomi";
        const token = jwt.sign({ ...payload }, secret, options);
        res.status(200).send({ token, user: payload });
        codeBits.sendMessageToAdmin(`new user account login ${payload.email}`);
        done();
      },
    ],
    (err) => {
      if (err) {
        res.status(400).send({ error: err });
        codeBits.sendMessageToAdmin(`an error occurred ${err}`);
      }
    }
  );
};
exports.changePassword = function (req, res) {
  const user = req.body;
  Async.waterfall(
    [
      (next) => {
        User.findOne({ email: user.email }).exec((err, payload) => {
          if (err) next(err);
          payload !== null ? next(null, payload) : next("User not found");
        });
      },
      (payload, done) => {
        bcrypt.compare(user.old, payload.password, function (err, result) {
          if (result) {
            bcrypt.hash(user.new, 10, function (err, hash) {
              payload.password = hash;
              payload.save();
            });
            res.status(200).send({ success: true });
            codeBits.sendMessageToAdmin(
              `user changed password ${payload.email}`
            );
            done(null);
          } else {
            done("Passwords don't match");
          }
        });
      },
    ],
    (err) => {
      if (err) {
        res.status(400).send({ error: err });
        codeBits.sendMessageToAdmin(`an error occurred ${err}`);
      }
    }
  );
};
