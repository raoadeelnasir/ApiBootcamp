//importing the monoose schema model
const Bootcamp = require('../models/Bootcamp')
//ErrorResponse class
const errorResponse = require('../utils/errorResponse')

////AsyncHandler midleware
const asyncHandler = require('../midleware/async')


//@desc    get all Bootcamps
//route    /api/v1/bootcamps
//access   public
exports.getbootcamps = asyncHandler(async (req, res, next) => {
    // console.log(req.query);
    let query;

    let reqQuery = { ...req.query }//copy req.query

    //as select treated as an id So 
    //Fields to exclude which i want not to match
    const removeFields = ['select']

    //loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param])

    console.log(reqQuery);
    //Creat query string
    let querystr = JSON.stringify(reqQuery) //to get string properties

    //creat operators (e.g $gt,$gte,$lt,$lte)
    querystr = querystr.replace(/\b()gt|gte|lt|lte|in\b/g, match => `$${match}`) //regular expression to get money sign
    // console.log(querystr);

    //finds match items
    query = Bootcamp.find(JSON.parse(querystr))

    //Select Fields
    if (req.query.select) {
        //"split" method turn comma seprated values to array and "join" method removes comma and add space
        const fields = req.query.select.split(',').join(' ')
        // console.log(fields); log for dev
        query = query.select(fields)
    }

    //execute query
    const bootcamp = await query
    res.status(200).json({ success: true, count: bootcamp.length, data: bootcamp })
});

//@desc    post single Bootcamp
//route    /api/v1/bootcamps/:id
//access   public
exports.creatbootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body)
    res.status(200).json({ success: true, data: bootcamp })
});

//@desc    get single Bootcamp
//route    /api/v1/bootcamps/:id
//access   private
exports.getsinglebootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)
    //this error is responsible for if id is not correct
    if (!bootcamp) {
        // here we use the ErrorResponse class classify the error
        return next(new errorResponse(`Server error Id not Founded ${req.params.id}`, 400))  //Always return bcz u can't send header again
    }
    //this error is responsible for if id is not correctly formated
    res.status(200).json({ success: true, data: bootcamp })
})

//@desc    update single Bootcamp
//route    /api/v1/bootcamps/:id
//access   private
exports.updatebootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!bootcamp) {
        return next(new errorResponse(`Server error Id not Founded ${req.params.id}`, 400))
    }
    res.status(200).json({ success: true, data: bootcamp })
})


//@desc    Delete Bootcamp
//route    /api/v1/bootcamps/:id
//access   private
exports.deletebootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
        return next(new errorResponse(`Server error Id not Founded ${req.params.id}`, 400))
    }
    res.status(200).json({ success: true, data: {} })
})