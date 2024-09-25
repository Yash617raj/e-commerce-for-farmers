const express = require("express");
const userAuth = require("../controllers/auth.controller.js");
const verifyFarmer = require("../util/verifyFarmer.js");

const router = express.Router();

router.post("/signin", userAuth.signIn);
router.post("/signup", userAuth.signUp);
router.get("/signout", verifyFarmer, userAuth.signOut);

module.exports = router;
