const express = require('express');
const dotenv = require("dotenv")
const morgan = require('morgan')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const colors = require('colors')

//routes Files
const bootcamps = require('./routes/bootcamps')
//Env Variables
dotenv.config({ path: './config/config.env' });


//mongodb connection
connectDB();

const app = express();



const PORT = process.env.PORT || 5000

//body-parser
app.use(express.json({ extended: false }));

//midleware concept
if (process.env.NODE_ENV = 'development') {
    app.use(morgan('dev'));
}

//mout the routes
app.use('/api/v1/bootcamps', bootcamps)


const server = app.listen(PORT, console.log(`Server is listing ${process.env.NODE_ENV} at port ${PORT}`.yellow.bold))


//handle unhandle promise rejections
process.on('unhandledRejection', (err, Promise) => {
    console.log(`ERROR : ${err.message}`);
    //close the application and server
    server.close(() => { process.exit(1) })
})



// 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
// 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