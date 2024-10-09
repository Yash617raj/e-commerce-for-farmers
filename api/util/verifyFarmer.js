const jwt = require("jsonwebtoken");
const customError = require('./customError.js');

const verifyFarmer = (req, res, next) => {
    if(!req.cookies) return next(customError(500, 'No cookie found'));
    const token = req.cookies.accessToken;
    if(!token) return next(customError(500, 'You are not authorised'));

    console.log(token);
    const user = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY,
        (err, user) => {
            if(err) return next(customError(500, 'You are not authorised'));
            req.user = user;
            next();
        }
    );
}

module.exports = verifyFarmer;
