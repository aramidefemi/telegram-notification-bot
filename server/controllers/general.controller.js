const codeBits = require("../lib/code.bits");

exports.imageUpload = (req, res) => {
 console.log('req',req.file)
  return res.status(200).send({ url: req.file });
};
