const initializeUserData = (req, res, next) => {
  if (!req.userData) {
    req.userData = {};
  }
  next();
};

module.exports = { initializeUserData };
