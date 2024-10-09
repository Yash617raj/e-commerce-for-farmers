const express = require("express");
const authRoute = require("./routes/auth.route.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParse = require("cookie-parser");
const farmerRouter = require("./routes/farmer.route.js");

const app = express();
const PORT = 3000;
dotenv.config();

//connection to mongoDB
mongoose.connect(process.env.MONGO)
.then(() => console.log('mongoDB successfully connected'))
.catch(err => console.log('mongoDB connection failure'));

// parser middleware
app.use(express.json());
app.use(cookieParse());


// base routes
app.use("/api/auth", authRoute);
app.use("/api/farmer", farmerRouter);

// error handler middleware
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Error';

    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
});

// server running at specified port
app.listen(PORT, () => {
    console.log(`app is listening at ${PORT}`);
})
