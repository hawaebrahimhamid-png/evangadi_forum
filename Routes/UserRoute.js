const express = require("express");
const router = express.Router();
//authonthication middleware
const AuthMiddleware = require("../Middleware/AuthMiddleware");
//user controller
const { register, login, checkUser } = require("../Controller/UserController");

//register route
router.post("/register", register);

//login user
router.post("/login", login);

// check user
router.get("/check", AuthMiddleware, checkUser);

module.exports = router;
