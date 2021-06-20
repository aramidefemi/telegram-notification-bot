const axios = require("axios");

let telegram_url = "https://api.telegram.org/bot1227967672:AAGT6hYHmrvMP5C6Xi9FJmsCeeNYmoQZrf8/sendMessage";

exports.sendMessageSimple = function (message, reply) {
  axios.post(telegram_url, {
    chat_id: message.chat.id,
    text: `DExter APi - ${reply}`
  }).then(response => {
    console.log("Message posted"); 
  }).catch(error => {
    console.log(error); 
  });
};
exports.sendMessage = function (message, reply, res) {
  axios.post(telegram_url, {
    chat_id: message.chat.id,
    text: `DExter APi - ${reply}`
  }).then(response => {
    console.log("Message posted");
    res.end("send ok");
  }).catch(error => {
    console.log(error);
    res.end("send error");
  });
};
exports.sendSticker = function (message, sticker, res) {
  axios.post('https://api.telegram.org/bot1227967672:AAGT6hYHmrvMP5C6Xi9FJmsCeeNYmoQZrf8/sendSticker', {
    chat_id: message.chat.id,
    sticker: sticker.file_id
  }).then(response => {
    console.log("Message posted");
    res.end("send ok");
  }).catch(error => {
    console.log(error);
    res.end("send error");
  });
};
exports.sendMessageToAdmin = function (reply) {
  axios.post(telegram_url, {
    chat_id: '1188752469',
    text: `DExter APi - ${reply}`
  }).then(response => {
    console.log("Message posted"); 
  }).catch(error => {
    console.log(error); 
  });
};

