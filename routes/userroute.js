const { handlesignin, handlesignup ,handlelogout} = require("../controllers/usercontroller");

const { Router } = require("express");
const router = Router();
const isAuthenticated = require("../middlewares/isauthenticated");

// Page routes

router.get("/Login", (req, res) => {
  return res.render("Login");
});

router.get("/Signup", (req, res) => {
  return res.render("Signup");
});

// API routes
router.post("/Signup", handlesignup);
router.post("/Login", handlesignin);
router.get("/logout", handlelogout);
// router.get("/Dashboard", (req, res) => {
//   res.send("Welcome to the Home Page! You are authenticated.");
// });

module.exports = router;