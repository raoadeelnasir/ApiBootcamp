const User = require("../models/user");
const asyncHandler = require("../midleware/async")
const errorResponse = require('../utils/errorResponse')
const jwt = require('jsonwebtoken')

//@desc    register a user
//route    POST/api/v1/auth/register
//access   public

exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, role, password } = req.body

    //creat user
    const user = await User.create({
        name,
        email,
        role,
        password
    })

    //Creat Token
    const token = user.getSignedJwtToken();


    res.status(200).json({ Success: true, token: token })
})


//@desc    login user
//route    POST/api/v1/auth/login
//access   private

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    //validate email & password Entered
    if (!email || !password) {
        return next(new errorResponse("Please Enter an email and password", 400))
    }
    //Check For User
    const user = await User.findOne({ email: email }).select('+password')
    if (!user) {
        return next(new errorResponse(`Invalid Credentials`, 400))
    }

    //Return back jwt token
    const token = await user.getSignedJwtToken()

    res.status(400).json({ Success: true, token: token })
})