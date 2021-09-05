//importing the monoose schema model
const Bootcamp = require('../models/Bootcamp')
//ErrorResponse class

//@desc    get all Bootcamps
//route    /api/v1/bootcamps
//access   public
exports.getbootcamps = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.find()
        res.status(200).json({ success: true, data: bootcamp })

    } catch (err) {
        //next(err)//instead of this as it return html like error we use custom ErrorHandler
        //form errorHandler
        next(err)

    }
}
//@desc    post single Bootcamp
//route    /api/v1/bootcamps/:id
//access   public
exports.creatbootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body)
        res.status(200).json({ success: true, data: bootcamp })
    } catch (err) {
        console.log(err);
    }

}
//@desc    get single Bootcamp
//route    /api/v1/bootcamps/:id
//access   private
exports.getsinglebootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id)
        //this error is responsible for if id is not correct
        if (!bootcamp) {
            // here we use the ErrorResponse class classify the error
            return res.status(400).json({ success: false }) //Always return bcz u can't send header again
        }
        //this error is responsible for if id is not correctly formated
        res.status(200).json({ success: true, data: bootcamp })

    } catch (err) {
        next(err)
    }
}

//@desc    update single Bootcamp
//route    /api/v1/bootcamps/:id
//access   private
exports.updatebootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!bootcamp) {
            return res.status(400).json({ success: false })   //Always return bcz u can't send header again
        }
        res.status(200).json({ success: true, data: bootcamp })
    } catch (err) {
        next(new ErrorResponse(`Server Error No id founded ${req.params.id}`, 404))

    }
}


//@desc    Delete Bootcamp
//route    /api/v1/bootcamps/:id
//access   private
exports.deletebootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if (!bootcamp) {
            return res.status(400).json({ success: false })//Always return bcz u can't send header again
        }
        res.status(200).json({ success: true, data: {} })
    } catch (err) {
        console.log(err);
    }
}
