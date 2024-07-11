const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  if (typeof payload !== "object" || payload === null) {
    console.log(payload);
    throw new Error("Expected payload to be a plain object.");
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = generateToken;
