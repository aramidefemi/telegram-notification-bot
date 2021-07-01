const codeBits = require("../lib/code.bits");
const cloudinary = require('cloudinary').v2;

exports.imageUpload = (req, res) => { 
  cloudinary.uploader.upload(req.file, async (error, result) => {
    return res.status(200).send({ url: result.url });
  });
};
