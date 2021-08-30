const express = require('express');
const dotenv = require("dotenv")
const morgan = require('morgan')


const app = express();

//routes Files
const bootcamps = require('./routes/bootcamps')


//Env Variables
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 5000

//midleware concept
if (process.env.NODE_ENV = 'development') {
    app.use(morgan('dev'));
}

//mout the routes
app.use('/api/v1/bootcamps', bootcamps)


app.listen(PORT, console.log(`Server is listing ${process.env.NODE_ENV} at port ${PORT}`))




// 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