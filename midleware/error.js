//errorHandler
//ErrorResponse Class
const errorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
    //log error for dev
    console.log(err);

    let error = { ...err } //gets the whole property of err
    error.message = err.message

    // console.log(err.name.red); //error name
    //Mongoose Bad ObjectId
    if (err.name === 'CastError') {
        const message = `Bootcamp not Founded with Id ${err.value}`
        error = new errorResponse(message, 404)
    }
    //Dublicate Key Error Handling
    if (err.code == 11000) {
        const message = `Dublicate Field Enter at index ${err.index}`
        error = new errorResponse(message, 400)
    }

    //Mongoose validation e.g required keys not entered
    if (err.name === 'ValidationError') {
        //Object is array so have to map each error
        const message = Object.values(err.errors).map(val => val.message)
        error = new errorResponse(message, 400)
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error"

    })
}

module.exports = errorHandler