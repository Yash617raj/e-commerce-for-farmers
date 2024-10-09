const mongoose = require("mongoose");
const ProductListing = require("../models/listedProduct.model.js");
const customError = require("../util/customError");

const listingProduct = async (req, res, next) => {
    try {
        const body = req.body;
        // console.log(body);
        const data = await ProductListing.create(body);
        if(!data) {
           return next(customError(500, 'Error in listing your product'));
        }
         return res.status(200).json("Success");
    } catch (error) {
        next(error);
    }
}

module.exports = listingProduct;
