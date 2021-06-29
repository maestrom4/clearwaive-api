const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

const options = {
    // 'useFindAndModify': false,
    // useNewUrlParser: true, 
    useNewUrlParser: true,
    // uri_decode_auth: false,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    // authSource:'admin'
}


module.exports = function() {
    const db = config.get('db');
    const message = `Connected to ${db}... `;
    mongoose.connect(db, options).then(() => winston.info(message));
}