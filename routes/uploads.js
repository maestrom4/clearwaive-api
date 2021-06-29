const auth = require('../middleware/auth');
const express = require('express');
const path = require('path');
const router = express.Router();
var fs = require('fs');
// // Error messages and codes
const stat404 = '404';
const stat400 = '400';
const stat500 = '500';
const err404Msg = 'The course with the given ID was not found!';

const basePath = path.join(__dirname, '../');

// default options
router.post('/', (req, res) => {
    if(req.files === null) {
        return res.status(stat404).json({ msg: 'No file uploaded'})
    }

    const file = req.files.file;
    const fileNameSplit = file.name.split('.');
    const timestampFilename = fileNameSplit[0] + '-' + Date.now() + '.' + fileNameSplit[1]

    file.mv(`${basePath}/public/uploads/${timestampFilename}`, err => {
        if(err) {
            return res.status(stat500).send(err)
        }

        res.json({ fileName: timestampFilename, filePath: `${basePath}uploads/${timestampFilename}` })
    })
});

router.delete ('/', function (req, res, next) {
    const fileName = `${basePath}/public/uploads/` + req.body.fileName;
    fs.unlink(fileName,(err) => {
        if(err) throw err;
        res.status(200).send({ success: true, message: 'Deleted' });
    });
 
})

module.exports =  {
    router: router,
};
  