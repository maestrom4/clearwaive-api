const auth = require('../middleware/auth');
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validateUser} = require('../models/users');
const router = express.Router();

// Error messages
const stat400 = '400';
const err400Msg = 'User already Registered!';

function logServerErrorAndRespond(err, friendlyMessage, res, statusCode = 500) {
    res.status(statusCode).send(`${friendlyMessage}: ${err.message}`);
} 

const getUsers = async() => {
    return await User.find().select(["i_d", "name", "email"]).sort("title");
}

const createUser = async(user, res) => {
    const test = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
    const newUser = await new User(_.pick(user, ["name", "email", "password"]));
    await newUser.save();

    const token = newUser.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(newUser, ["_id", "name", "email"]));
}

router.get('/', auth, async(req, res) => {
    try {
        const userList = await getUsers();
        res.send(userList);
    } catch(ex) {
        logServerErrorAndRespond(err, `Could not get all Users`, res)
    }
});

router.get('/me', auth, async (req, res) => {
    const user = await User.findOne(req.params.id).select('-password -name -__v');
    res.send(user);
});

// router.post('/', auth, async(req, res) => {
router.post('/', async(req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const checkUser = await User.findOne({ "email": req.body.email });

        if(checkUser) return res.status(stat400).send(err400Msg);

        const user = createUser(req.body, res);

        (!user) && logServerErrorAndRespond(err, `Error trying to create user`, res);
    } catch(express) {
        logServerErrorAndRespond(err, `Error trying to create user`, res);
    }
});

module.exports = {
    router: router,
    user: User,
}
