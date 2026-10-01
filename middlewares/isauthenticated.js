const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Authentication required: no token" });
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    // ✅ Set the whole user object, or at least an object with id
    req.user = { id: decoded.userId };

    next();
  } catch (error) {
    console.log("Authentication error:", error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = isAuthenticated;
