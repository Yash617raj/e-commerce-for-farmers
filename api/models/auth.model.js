const mongoose = require("mongoose");

const UserAuthSchema = new mongoose.Schema({
    name : {
        firstName : {
            type : String,
            required : true
        },
        lastName : {
            type : String,
            required : true
        }
    },

    email : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    type : {
        type : String,
        required : true
    }

})

const UserAuthModel = mongoose.model('signInModel', UserAuthSchema)

module.exports = UserAuthModel;
