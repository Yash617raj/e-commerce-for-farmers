const express = require("express");
const listingProduct = require("../controllers/listingProduct.controller");
const verifyFarmer = require("../util/verifyFarmer.js");

const router = express.Router();

router.post('/productlisting', verifyFarmer, listingProduct);

module.exports = router;
