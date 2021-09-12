const mongoose = require("mongoose")
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

module.exports = mongoose.model("User", UserSchema)