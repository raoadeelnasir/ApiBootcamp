const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

//@desc manogoose_Schema

const bootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Your Name'],
        unique: true,
        trim: true,
        maxlenghth: [50, "Name is Too long, Max Limit is 50 char"]
    },
    slug: String,
    description: {
        type: String,
        required: [true, "Enter the Desc please"],
        maxlenghth: [500, "Max desc may be in 500 chars"]
    },
    website: {
        type: String,
        // Javascript regex url
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            "Please Use a valid url with HTTP OR HHTPS"
        ]
    }
    ,
    phone: {
        type: String,
        maxlenghth: [20, "Max num is 20"]
    },
    email: {
        type: String,
        match: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            "Please enter a valid Email"]
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    location: {
        // GeoJson Point location in mongoose
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            // required: true
        },
        coordinates: {
            type: [Number],
            // required: true,
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
    },
    careers: {
        //Creers may Array
        type: [String],
        required: true,
        enum: [
            "Web dev",
            "Web Scraping",
            "Node js",
            "Android dev",
            "others"
        ]
    },
    averageRating: {
        type: String,
        min: [1, "rating should be atleast one"],
        max: [10, 'rating may not exeed 10']
    },
    averageCost: Number,
    photo: {
        type: String,
        default: "no-photo.jpg"
    },
    housing: {
        type: Boolean,
        default: false
    },
    jobAssistance: {
        type: Boolean,
        default: false
    },
    jobGuarantee: {
        type: Boolean,
        default: false
    },
    acceptGi: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

//Creat each Bootcamp Slug
// pre is mongoose func it run before saving dataObject to database
bootcampSchema.pre('save', function (next) { //use standard function instead of using arrow func 
    this.slug = slugify(this.name, { lower: true })
    next()
})

module.exports = mongoose.model('Bootcamp', bootcampSchema)
