const Async = require("async");
const User = require("../models/user.model");
const Response = require("../models/response.model");
const SellRequest = require("../models/sellrequest.model");
const codeBits = require("../lib/code.bits");
const app = require("../server");

exports.hello = function (req, res) {
//   app.io.on('connection', (connection) => {
//     console.log('New client connected');
//     connection.on('disconnect', () => console.log('Client disconnected'));
//   });
//   const count = app.io.engine.clientsCount;
// // may or may not be similar to the count of Socket instances in the main namespace, depending on your usage
// const count2 = app.io.of("/").sockets.size;
// console.log('count',count,count2)
//   app.io.emit(`notify`, {})
  console.log(req.connection.remoteAddress)
  codeBits.sendMessageToAdmin('new user start up '+req.connection.remoteAddress); 
  res.status(200).send({ hello: 'dear, :'+req.connection.remoteAddress})
}
exports.startBot = function (req, res) {
  const { message } = req.body;
  try {
    Async.waterfall(
      [
        (next) => {
          User.findOne({ userid: message.from.id }).exec((err, result) => {
            if (result == null) {
              var user = User({
                data: message.from,
                userid: message.from.id,
                is_bot: message.from.is_bot,
                language_code: message.from.language_code,
                username: message.from.username,
                channel: message.chat.id,
              });
              user.save();
              codeBits.sendMessageToAdmin(
                `YeePee!, new user ${message.from.username},${message.from.first_name},${message.from.last_name}`
              );
            }
          });
          next(null);
        },
        (next) => {
          var name =
            message.from.username ||
            message.from.first_name ||
            message.from.id ||
            "Pal";
          var text = message.text;
          var reply = `I love you but you need to stop this, ${text}!\n\nI can help you get prices for any iphone e.g type iphone xr, 64gb, a1!`;
          console.log("message", message);
          if (message.sticker) {
            reply = message.sticker;
            next(null, reply, name);
          } else if (text.toLowerCase() == "hi") {
            reply = `Hi ${name}!,\n\nYou can call me Olasubomi A Stallion\n\nI can help you get prices for any iphone e.g type iphone xr, 64gb, new!`;
            next(null, reply, name);
          } else if (text.toUpperCase().includes("IPHONE")) {
            searchSellRequest(text, (res) => {
              next(null, res, name);
            });
          } else {
            next(null, reply, name);
          }
        },
        (reply, name, done) => {
          var response = Response({
            chat: message.chat,
            text: message.text,
            date: message.date,
            from: name,
            reply: JSON.stringify(reply),
            messageid: message.message_id,
          });
          response.save();

          done(null, reply);
        },
      ],
      (err, reply) => {
        if (message.sticker) {
          codeBits.sendSticker(message, reply, res);
          codeBits.sendMessageSimple(message, `Don't mess with me nigga!`);
        } else {
          codeBits.sendMessage(message, reply, res);
        }
        codeBits.sendMessageToAdmin(
          `YeePee!, new message from ${
            message.from.username ||
            message.from.first_name + " " + message.from.last_name
          }`
        );
      }
    );
  } catch (e) {
    codeBits.sendMessageToAdmin(
      `An Error Occuredd on: ${JSON.stringify(message)} error: ${e}`
    );
    res.end(`An Error Occuredd on: ${JSON.stringify(message)} error: ${e}`);
  }
};

function searchSellRequest(term, callback) {
  var limit = 5;
  var search = codeBits.arrangeSearchTerm(term);

  SellRequest.find(search)
    .limit(limit)
    .exec()
    .then((results) => {
      var res;
      if (results.length <= 0) {
        res = "Sorry we could not find any device matching " + term;
      } else {
        res = results.reduce((prev, curr, i) => {
          var name = curr.name || "";
          var size = curr.storageCapacity || "";
          var grade = curr.condition || "";
          var price = curr.price * 366 || "";
          return `Name: ${name}, Size: ${size}, Price: ₦ ${price}, Grade: ${grade} \n\n${prev}`;
        }, "");
        res = `I Found:\n\n${res}`;
      }

      callback(res);
    })
    .catch((err) => console.error(err));
}
