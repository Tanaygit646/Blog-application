// middleware/auth.js
const { validateToken } = require("../services/authentication");

function checkAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/user/signin");
  }

  const payload = validateToken(token);
  if (!payload) {
    return res.redirect("/user/signin");
  }

  req.user = payload;
  next();
}

module.exports = { checkAuth };
