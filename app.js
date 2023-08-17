// packages
const express = require('express');
const hpp = require('hpp');
const helmet = require('helmet');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routes/routes');

// app
const app = express()

// security
app.use(cors())
app.use(hpp())
app.use(helmet())
app.use(mongoSanitize())
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ limit: '5mb' }))

// router
app.use('/blog', router)

// dotenv
dotenv.config()

// rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 50 });
app.use(limiter);


// connect mongoose 
const mongoUri = process.env.DATABASE_URI;

mongoose.connect(mongoUri)
.then(() => {
    console.log("Database is Connected");
})
.catch((err) => {
    console.log(err.mongoose)
})


module.exports = app