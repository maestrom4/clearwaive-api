const error = require('../middleware/error');
// const config = require('config');
const express = require('express');
const fileUpload = require('express-fileupload');
const forms = require('../routes/forms');
const mail = require('../routes/mail.js');
const uploads = require('../routes/uploads');
const users = require('../routes/users');
const auth = require('../routes/auth');
const home = require('../routes/home');


module.exports = function(app) {
    app.use(express.json());
    app.use(fileUpload({ safeFileNames: true, preserveExtension: true }));

    app.use('/api/mail', mail.router); // 
    app.use('/api/uploads', uploads.router); // 
    app.use('/api/forms', forms.router); // 
    app.use('/api/users', users.router); // 
    app.use('/api/auth', auth.router); // 
    app.use('/', home); // To be use for home
    app.use(error);
}