const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  //check for token
  if (!token)
    return res
      .status(401)
      .json({ tokenError: "No token, authorization denied" });

  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);

    //add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(400).json({ tokenError: "Token is not valid" });
  }
}

module.exports = auth;

//status 401 is unauthorize
