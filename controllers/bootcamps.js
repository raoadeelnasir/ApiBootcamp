//importing the monoose schema model
const Bootcamp = require('../models/Bootcamp')

//@desc    get all Bootcamps
//route    /api/v1/bootcamps
//access   public
exports.getbootcamps = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.find()
        res.status(200).json({ success: true, data: bootcamp })

    } catch (err) {
        console.log(err.message);
        res.status(400).json({ success: false })

    }

}
//@desc    get single Bootcamp
//route    /api/v1/bootcamps/:id
//access   private
exports.getsinglebootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id)

        if (!bootcamp) {
            return res.status(404).json({ success: false })  //Always return bcz u can't send header again
        }

        res.status(200).json({ success: true, data: bootcamp })

    } catch (err) {
        console.log(err.message);
        res.status(400).json({ success: true })
    }
}

//@desc    update single Bootcamp
//route    /api/v1/bootcamps/:id
//access   private
exports.updatebootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!bootcamp) {
            return res.status(404).json({ success: false })  //Always return bcz u can't send header again
        }
        res.status(200).json({ success: true, data: bootcamp })
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ success: false })

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
        console.log(err.message);
        res.status(400).json({ success: false })
    }

}
//@desc    Delete Bootcamp
//route    /api/v1/bootcamps/:id
//access   private
exports.deletebootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if (!bootcamp) {
            return res.status(404).json({ success: false })  //Always return bcz u can't send header again
        }

        res.status(200).json({ success: true, data: {} })
    } catch (err) {
        console.log(err.message);
        res.status(404).json({ success: false })
    }
}
