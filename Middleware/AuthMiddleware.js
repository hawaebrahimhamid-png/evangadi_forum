const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

function AuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }

  const token = authHeader.split(" ")[1]; // get the token after "Bearer"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // returns object { username, userid, iat, exp }
    req.user = decoded; // attach user info to request
    next(); // pass control to next route handler
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }
}

module.exports = AuthMiddleware;
