const User = require("../models/user");
const asyncHandler = require("../midleware/async")
const errorResponse = require('../utils/errorResponse')

//@desc    register a user
//route    POST /api/v1/auth/register
//access   public


exports.register = asyncHandler(async (req, res, next) => {


    res.status(200).json({ Success: true })
})