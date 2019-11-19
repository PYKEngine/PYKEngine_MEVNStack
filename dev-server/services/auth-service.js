const jwt = require("jsonwebtoken");

const generateJWT = user => {
  const tokenData = {
    name: user.name,
    id: user.id,
  };
  return jwt.sign({ user: tokenData }, process.env.TOKEN_SECRET, { expiresIn: 360000 });
};

const requireLogin = (req, res, next) => {
  const token = decodeToken(req);
  if (!token) {
    return res.status(401).json({ message: "You must be logged in." });
  }
  req.user = token.user
  next();
};

const decodeToken = req => {
  const token = req.headers.authorization || req.headers["authorization"];

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

const getUsername = req => {
  const token = decodeToken(req);
  if (!token) {
    return null;
  }
  return token.user.name;
};

const getUserId = req => {
  const token = decodeToken(req);
  if (!token) {
    return null;
  }
  return token.user.id;
};

module.exports = {
  generateJWT,
  requireLogin,
  decodeToken,
  getUsername,
  getUserId
};
