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

    //as select ,sort treated as an id So 
    //Fields to exclude which i want not to match
    const removeFields = ['select', 'sort', 'page', 'limit']

    //loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param])

    // console.log(reqQuery);
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

    //sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    }//else we want to sort bootcamps default by the date
    else {
        query = query.sort('--createdAt')
    }

    //pagination
    const page = parseInt(req.query.page, 10) || 1 //default set is page 1
    const limit = parseInt(req.query.limit, 10) || 100 //defulat each page show only 100 bootcamps
    //skip
    const startIndex = (page - 1) * limit;
    query = query.skip(startIndex).limit(limit)

    //for pagination next and previous pages
    const endIndex = page * limit;
    const total_documents = await Bootcamp.countDocuments();


    //execute query
    const bootcamp = await query

    //pagination result
    const pagination = {}

    //next pages
    if (endIndex < total_documents) {
        pagination.next = {
            page: page + 1,
            limit: limit
        }
    }
    //previous pages
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit: limit
        }
    }
    res.status(200).json({ success: true, count: bootcamp.length, pagination: pagination, data: bootcamp })
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