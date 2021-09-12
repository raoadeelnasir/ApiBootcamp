const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter a Name"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            "Please enter a valid Email"]
    },
    role: {
        type: String,
        enum: ["user", 'publisher'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
        minlength: 6,
        select: false
    },
    resetPassword: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})


//Lets Encypt Password
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


//Sign JWT and return 
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this.id, }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TOKEN_EXPIRES
    })
}



module.exports = mongoose.model("User", UserSchema)