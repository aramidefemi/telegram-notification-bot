const Async = require("async");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Response = require("../models/response.model");
const codeBits = require("../lib/code.bits");

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
        const options = { expiresIn: "30d", issuer: "aramidev" };
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
exports.login = async (req, res) => {
  const { email, password, lng, lat } = req.body;
  Async.waterfall(
    [
      (next) => {
        email && password ? next(null) : next("Invalid Parameters");
      },
      (next) => {
        User.findOne({ email }).exec((err, payload) => {
          if (err) next(err);

          payload !== null ? next(null, payload) : next("User not found");
        });
      },
      (payload, next) => {
        bcrypt.compare(password, payload.password, function (err, result) {
          result ? next(null, payload) : next("Passwords don't match");
        });
      },
      (payload, done) => {
        const options = { expiresIn: "30d", issuer: "aramidev" };
        const secret = "oluwafemi-olasubomi";
        const token = jwt.sign({ ...payload }, secret, options);
        res.status(200).send({ token, user: payload });
        codeBits.sendMessageToAdmin(`new user account login ${payload.email}`);
        done();
      },
    ],
    async (err) => {
      await User.findOne({ email }).updateOne({ lng, lat });
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
        bcrypt.compare(user.oldPassword, payload.password, function (err, result) {
          if (result) {
            bcrypt.hash(user.newPassword, 10, function (err, hash) {
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
exports.getProfile = function (req, res) {
  const { id } = req.params;
  const str = id;

  if (!str || 0 === str.length) {
    return res.status(404).send({ error: "id is Empty" });
  }

  const match =  { _id: id };

  User.findOne(match).exec((err, user) => {
    if (err) {
      res.status(400).send({ error: err });
      codeBits.sendMessageToAdmin(`an error occurred ${err}`);
    } else if (!user) {
      res.status(404).send({ error: "User not found" });
    } else {
      res.status(200).send({ user });
    }
  });
};
exports.updateProfile = async (req, res) => {
  const payload = req.body;
  const { _id } = req.user;

  const user = await User.findOne({ _id });
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  delete payload.password;
  delete payload._id;
  delete payload.id;
  delete payload.email;

  await User.findOne({ _id }).updateOne(payload);
  const updated = await User.findOne({ _id });
  res.status(200).send({ success: true, user: updated });
};
exports.updateProfileImage = async (req, res) => {
  const { _id } = req.user;
  const { profile_url } = req.body;

  await User.findOne({ _id }).updateOne({ profile_url });
  res.status(200).send({ success: true });
};
exports.me = async (req, res) => {
  const { _id } = req.user;
  User.findOne({ _id }).exec((err, user) => {
    if (err) {
      res.status(400).send({ error: err });
      codeBits.sendMessageToAdmin(`an error occurred ${err}`);
    } else if (!user) {
      res.status(404).send({ error: "User not found" });
    } else {
      res.status(200).send({ user });
    }
  });
};
