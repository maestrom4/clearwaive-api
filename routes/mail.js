

"use strict";
const express = require('express');
const name = 'Dan';
const user = 'dnlmts96@gmail.com';
const path = require('path');
const router = express.Router();
const basePath = path.join(__dirname, '../');
const config = require("config");

const nodeMailer = require("nodemailer");

router.post('/', async (req, res) => {
    const emailpwd = config.get("emailpwd");
    const transporter = nodeMailer.createTransport({
        service: "Gmail",
        auth: {
            user: user,
            pass: emailpwd
        }
    });
    
    // For json email
    // {
    //     "subject": "Test",
    //     "text": "I am sending an email from nodemailer!",
    //     "to": "maestro.m4@gmail.com",
    //     "from": "",
    //     "attachments":  [{ "filename": "clearwaive-2021-02-22T232824.101.pdf", "path": ""}]   
    // }

    const messageOptions = req.body;
    messageOptions.from = user;

    const filename = messageOptions.attachments[0].filename;
    messageOptions.attachments[0].path = `${basePath}public/documents/${filename}`;
    const result = await transporter.sendMail(messageOptions);

    if (!result) return res.status(400).send({ success: false, message: 'Mail not sent!'});
    res.status(200).send({ success: true, message: 'Mail sent!'});
});

module.exports = {
    router: router,
}
