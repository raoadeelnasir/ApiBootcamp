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