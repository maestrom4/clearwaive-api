
const winston = require("winston");


module.exports = function(err, req, res, next) {
    winston.error(err.message, err);
    // const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    // winsoton.log('error', err.message);
    res.status(500).send("Something failed");
}
