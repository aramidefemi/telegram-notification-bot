const codeBits = require("../lib/code.bits");
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'dhijlef1e',
  api_key: '855759169965542',
  api_secret: 'lKr2ekckuuf_N2vd-vbWtwPLnRA',
  secure: true,
});
exports.imageUpload = (req, res) => {
  cloudinary.uploader.upload(req.file.path, async (error, result) => {
    return res.status(200).send({ url: result.url });
  });
};
