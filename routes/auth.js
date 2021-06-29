const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require("@hapi/joi");
const _ = require('lodash');
const { User } = require('../models/users');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;

// Error messages
const stat404 = '404';
const err404Msg = 'The course with the given ID was not found!';
const stat400 = '400';
const err400Msg = 'Invalid email or password!';

function logServerErrorAndRespond(err, friendlyMessage, res, statusCode = 500) {
    res.status(statusCode).send(`${friendlyMessage}: ${err.message}`);
}

const getUsers = async() => {
    return await User.find().select(["i_d", "name", "email"]).sort("title");
}

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const user = await User.findOne({ "email": req.body.email });
        if(!user) return res.status(stat400).send(err400Msg);

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send(err400Msg);
        
        const token = user.generateAuthToken();

        res.send(token);
    } catch(err) {
        logServerErrorAndRespond(err, `Error trying to create user`, res);
    }
});

const validate = async(req) => {
    // console.log('user validator', await user);
    const schema = {
        email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().required(),
    }

    return Joi.validate(req, schema);  
}

module.exports = {
    router: router,
    user: User,
}
