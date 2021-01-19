const codeBits = require("../lib/code.bits");

exports.imageUpload = (req, res) => { 
  return res.status(200).send({ url: req.file });
};
