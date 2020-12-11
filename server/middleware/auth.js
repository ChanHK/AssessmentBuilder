const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  //check for token
  if (!token)
    res.status(401).json({ message: "No token, authorization denied" });

  try {
    //verify token
    const decoded = jwt.verify(token, keys.secretOrKey);

    //add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ message: "Token is not valid" });
  }
}

module.exports = auth;

//status 401 is unauthorize
