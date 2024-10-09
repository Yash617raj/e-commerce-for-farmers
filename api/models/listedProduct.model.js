const mongoose = require("mongoose");

const Listing = new mongoose.Schema({

    productInfo:{
        productName : {
            type : String,
            required: true
        },

        productQuantity: {
            type : String,
            required: true
        },

        price: {
            type : String,
            required : true
        },

        harvestDate: String,
    },

    farmingAndCultivationInfo : {
        farmingMethod : {
            type : String,
            required : true
        },

        farmLocation : {
            type : String,
            required : true
        },

        farmSize : {
            type : String,
            required : true
        },

        soilType : {
            type : String,
            required : true
        },

        irrigationMethod : {
            type : String,
            required : true
        },

        pesticidesUsed : {
            type : Array
        }
    },

    productDescription : {

        productQuality : {
            type: String,
            required: true
        },
        
        variety : {
            type : String,
            required : true
        },

        packaging : {
            type : String,
            required : true
        },

        minOrderQuantity : {
            type : String,
            required : true
        },

        productImages : {
            type : Array
        }
    }
});


const ProductListing = mongoose.model('productListing', Listing);

module.exports = ProductListing;
