const mongoose = require('mongoose');
const Joi = require("@hapi/joi");
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 255, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 8, max: 1024 },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const getUser = () => {
    return mongoose.model('Users', userSchema);
}

const User = getUser();

const validateUser = (user) => {
    const schema = {
        name: Joi.string().required().min(5).max(255),
        // email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }

    return Joi.validate(user, schema);  
}

module.exports = {
    User: User,
    validateUser: validateUser, 
    userSchema: userSchema
}