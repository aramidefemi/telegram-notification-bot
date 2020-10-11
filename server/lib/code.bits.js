const axios = require("axios");

let telegram_url = "https://api.telegram.org/bot1227967672:AAGT6hYHmrvMP5C6Xi9FJmsCeeNYmoQZrf8/sendMessage";

exports.sendMessageSimple = function (message, reply) {
  axios.post(telegram_url, {
    chat_id: message.chat.id,
    text: reply
  }).then(response => {
    console.log("Message posted"); 
  }).catch(error => {
    console.log(error); 
  });
};
exports.sendMessage = function (message, reply, res) {
  axios.post(telegram_url, {
    chat_id: message.chat.id,
    text: reply
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
    text: reply
  }).then(response => {
    console.log("Message posted"); 
  }).catch(error => {
    console.log(error); 
  });
};

var conditions = [
  'NEW',
  'A1',
  'A2',
  'B1',
  'B2',
  'C',
  'C/B',
  'C/D'
];
 

exports.arrangeSearchTerm = function (part) {
  var term = arrangeSearchString(part.split(','));
  var search = {};
  if (term.grade && term.grade.length > 0) {
    search['condition'] = {
      $in: term.grade
    }
  }
  if (term.size && term.size.length > 0) {
    search['storageCapacity'] = {
      $in: term.size
    }
  }
  if (term.name && term.name.length > 0) {
    search['name'] = {
      $in: term.name
    };
  }
  if (term.price && term.price.min && term.price.min.length > 0) {
    search['price'] = {
      $gte: term.price.min
    }
  }
  if (term.price && term.price.max && term.price.max.length > 0) {
    search['price'] = {
      $lte: term.price.max,
      ...search['price']
    }
  }
  return search;
}

function arrangeSearchString(parts) {
  var data = {
    grade: [],
    size: [],
    name: []
  };
  parts.map((part, i) => {
    let clean = part.toUpperCase().trim();
    if (conditions.includes(clean)) {
      return data.grade.push(clean);
    } else if (clean.includes('GB')) {
      return data.size.push(clean);
    } else {
      return data.name.push(clean);
    }
  });
  return data;
}
