
const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports = function() {

    winston.exceptions.handle(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtException.log', handleExceptions : true }))

    process.on('unhandledRejection', (ex) => {
        throw ex;
        // winston.error(ex.message, ex);
        // process.exit(1);
    });

    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    // winston.add(new winston.transports.MongoDB({
    //     db: 'mongodb://localhost:27017/playground',
    //     level: 'error'
    // }));
}