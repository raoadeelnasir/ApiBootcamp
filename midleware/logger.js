//desc creating own custom midleware  //such as morgan(dev)
const logger = (req, res, next) => {
    req.hello = "helloworld"
    console.log("Midle ware accepted");
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next()
}
module.exports = logger
