//@desc    get all Bootcamps
//route    /api/v1/bootcamps
//access   public
exports.getbootcamps = (req, res, next) => {
    res.status(200).json({ success: true, msg: "Show all bootcamps", hello: req.hello })

}
//@desc    get single Bootcamp
//route    /api/v1/bootcamps/:id
//access   private
exports.getsinglebootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: "Show single bootcamp" })

}

//@desc    update single Bootcamp
//route    /api/v1/bootcamps/:id
//access   private
exports.updatebootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `update bootcamp ${req.params.id}` })

}

//@desc    post single Bootcamp
//route    /api/v1/bootcamps/:id
//access   public
exports.creatbootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Creat bootcamp` })

}
//@desc    Delete Bootcamp
//route    /api/v1/bootcamps/:id
//access   private
exports.deletebootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Delete Bootcamp ${req.params.id}` })

}
