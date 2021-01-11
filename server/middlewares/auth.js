const jwt = require("jsonwebtoken");
const codeBits = require("../lib/code.bits");
exports.validateToken = (req, res, next) => {
  const authorizationHeaader = req.headers.authorization;
  let result;
  if (authorizationHeaader) {
    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
    const options = { expiresIn: "30d", issuer: "aramidev" };
    const secret = "oluwafemi-olasubomi";
    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      result = jwt.verify(token, secret, options);
 
      req.user = result._doc;
      // We call next to pass execution to the subsequent middleware
      next();
    } catch (error) {
      // Throw an error just in case anything goes wrong with verification
      result = {
        error,
        status: 401,
      };
      res.status(401).send(result);
      codeBits.sendMessageToAdmin(`${error}`);
    }
  } else {
    result = {
      error: `Authentication error. Token required.`,
      status: 401,
    };
    codeBits.sendMessageToAdmin(`Authentication error. Token required.`);
    res.status(401).send(result);
  }
};
