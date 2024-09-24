const express = require("express");
const userAuth = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/signin", userAuth.signIn);
router.post("/signup", userAuth.signUp);

module.exports = router;
