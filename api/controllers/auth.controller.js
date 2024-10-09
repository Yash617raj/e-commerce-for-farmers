const UserAuthModel = require("../models/auth.model.js");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const customError = require("../util/customError.js");
const jwt = require("jsonwebtoken");

class authService {

    async signIn(req, res, next) {
        try {
            const {email, password, type} = req.body;
            if(!email || !password || !type) next(customError(500, 'Enter details'));
            const isValidUser = await UserAuthModel.findOne({email, type});
            if(!isValidUser) {
                return next(customError(500, `${email} is not registered with us.`));
            }
            const isValidPassword = bcrypt.compareSync(password, isValidUser.password);
            if(!isValidPassword) {
                return next(customError(500, 'Incorrect Password'));
            }
            const token = jwt.sign(
                email,
                process.env.JWT_SECRET_KEY,
            )
            res.cookie('accessToken', token, {httpOnly: true, maxAge : 60 * 60 * 1000});
            return res.status(200).json(email);
        } catch (error) {
            next(error);
        }
    }

    async signUp(req, res, next) {
        try {
            const {firstName, lastName, email, password, type} = req.body;
            if (!email || !password || !type || !firstName || !lastName) return next(customError(500, "Enter details"));
            const isEmailAlreadyRegistered = await UserAuthModel.findOne({email});
            if(isEmailAlreadyRegistered) return next(customError(500, 'email already registerd'));
            const hashedPassword = bcrypt.hashSync(password, 10);
            const data = await UserAuthModel.create({name : {firstName, lastName}, email, password : hashedPassword, type});
            const {password : pass , ...rest} = data._doc;
            return res.status(200).send(rest);
        } catch (error) {
            next(error);
        }
    }

    signOut (req, res, next) {
        res.clearCookie('accessToken');
        res.send('cookie is cleared');
    }
};

const userAuth = new authService();

module.exports = userAuth;
