const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");



router.post("/signup", UserController.Signup);

router.post("/login", UserController.Login);

module.exports = router;
