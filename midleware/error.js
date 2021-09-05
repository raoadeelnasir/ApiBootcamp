//errorHandler
//ErrorResponse Class
const errorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
    //log error for dev
    console.log(err.message);

    let error = { ...err } //gets the whole property of err
    error.message = err.message

    // console.log(err.name.red); //error name

    //Mongoose Bad ObjectId
    if (err.name === 'CastError') {
        const message = `Bootcamp not Founded with Id ${err.value}`
        error = new errorResponse(message, 404)
    }


    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error"

    })
}

module.exports = errorHandler