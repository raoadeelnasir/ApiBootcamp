//desc creating own custom midleware
const logger = (req, res, next) => {
    req.hello = "helloworld"
    console.log("Midle ware accepted");
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next()
}
module.exports = logger
