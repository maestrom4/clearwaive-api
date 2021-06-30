const auth = require('../middleware/auth');
const express = require('express');
const { Form, validate } = require('../models/forms');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;

// // Error messages and codes
const stat404 = '404';
const stat400 = '400';
const err404Msg = 'The course with the given ID was not found!';

// // Get all
// async function findById(id) {

//     return await Customers.findOne({_id: new ObjectID(id)}) 
// }
  
router.get('/', auth, async(req, res) => {
    const result = await Form.find();
    res.send(result);
});

// Get by ID
router.get('/:id', auth, async(req, res) => {
    const form = await Form.findOne({_id: new ObjectID(req.params.id)}, console.log)  // ok
    if (!form) return res.status(stat404).send(err404Msg);
    res.send(form);
})
// Post add

router.post('/', auth, async(req, res) => {
    const error = validate(req.body);
    if (!error) return res.status(400).send(error.details[0].message);
    const rb = await req.body;
    const form = await new Form({
        id: rb.id,
        page1: {
            firstname: rb.page1.firstname,
            lastname:  rb.page1.lastname,
            address: rb.page1.address,
            address2: rb.page1.address2,
            state: rb.page1.state,
            city: rb.page1.city,
            zip: rb.page1.zip,
            phone: rb.page1.phone,
            email: rb.page1.email,
            country: rb.page1.country,
        },
        page2: {
            sign1: rb.page2.sign1,
            sign2: rb.page2.sign2,
        },
        page3: {
            answer1: rb.page3.answer1,
            answer2: rb.page3.answer2,
            answer3: rb.page3.answer3,
            answer4: rb.page3.answer4,
            answer5: rb.page3.answer5,
            answer6: rb.page3.answer6,
            answerState: rb.page3.answerState,
        },
        page4: {
            answer1:rb.page4.answer1,
            answer2:rb.page4.answer2,
            answer3:rb.page4.answer3,
            answer4:rb.page4.answer4,
            answer5:rb.page4.answer5,
        },
        page5: {
            answer1:rb.page5.answer1,
            answer2:rb.page5.answer2,
            answer3:rb.page5.answer3,
            answer4:rb.page5.answer4,
            answer5:rb.page5.answer5,
            answer6:rb.page5.answer6,
        },
        page6: {
            answer1:rb.page6.answer1,
            answer2:rb.page6.answer2,
            answer3:rb.page6.answer3,
            answer4:rb.page6.answer4,
        },
        page7: {
            answer1:rb.page7.answer1,
            answer2:rb.page7.answer2,
        },
        page8: {
            answer1:rb.page8.answer1,
            answer2:rb.page8.answer2,
            answer3:rb.page8.answer3,
            answer4:rb.page8.answer4,
            answer5:rb.page8.answer5,
            answer6:rb.page8.answer6,
            answer7:rb.page8.answer7,
        },
        page9: {
            answer1:rb.page9.answer1,
            answer2:rb.page9.answer2,
            answer3:rb.page9.answer3,
            answer4:rb.page9.answer4,
            answer5:rb.page9.answer5,
            answer6:rb.page9.answer6,
        },
        page10: {
            answer1: rb.page10.answer1,
            answer2: rb.page10.answer2,
        },
        page11: {
            answer1: rb.page11.answer1,
        },
        page12: {
            answer1: rb.page12.answer1,
            answer2: rb.page12.answer2,
        },
        page13: {
            answer1: rb.page13.answer1,
        },
        success: rb.success
    });
    form.save();
    res.status(200).send({ success: true });
});

// // Put
router.put('/:id', auth, async(req, res) => {
    const rb = await req.body;
    const { error } = validate(rb);
    if (error) return res.status(stat400).send(error.details[0].message);
    const form = await Form.findOneAndUpdate({ _id: req.params.id}, {
        $set: {
            "page1": {
                "firstname": rb.page1.firstname,
                "lastname":  rb.page1.lastname,
                "address": rb.page1.address,
                "address2": rb.page1.address2,
                "state": rb.page1.state,
                "city": rb.page1.city,
                "zip": rb.page1.zip,
                "phone": rb.page1.phone,
                "email": rb.page1.email,
                "country": rb.page1.country,
            },
            "page2": {
                "sign1": rb.page2.sign1,
                "sign2": rb.page2.sign2,
            },
            "page3": {
                "answer1": rb.page3.answer1,
                "answer2": rb.page3.answer2,
                "answer3": rb.page3.answer3,
                "answer4": rb.page3.answer4,
                "answer5": rb.page3.answer5,
                "answer6": rb.page3.answer6,
                "answerState": rb.page3.answerState,
            },
            "page4": {
                "answer1":rb.page4.answer1,
                "answer2":rb.page4.answer2,
                "answer3":rb.page4.answer3,
                "answer4":rb.page4.answer4,
                "answer5":rb.page4.answer5,
            },
            "page5": {
                "answer1":rb.page5.answer1,
                "answer2":rb.page5.answer2,
                "answer3":rb.page5.answer3,
                "answer4":rb.page5.answer4,
                "answer5":rb.page5.answer5,
                "answer6":rb.page5.answer6,
            },
            "page6": {
                "answer1":rb.page6.answer1,
                "answer2":rb.page6.answer2,
                "answer3":rb.page6.answer3,
                "answer4":rb.page6.answer4,
            },
            "page7": {
                "answer1":rb.page7.answer1,
                "answer2":rb.page7.answer2,
            },
            "page8": {
                "answer1":rb.page8.answer1,
                "answer2":rb.page8.answer2,
                "answer3":rb.page8.answer3,
                "answer4":rb.page8.answer4,
                "answer5":rb.page8.answer5,
                "answer6":rb.page8.answer6,
                "answer7":rb.page8.answer7,
            },
            "page9": {
                "answer1":rb.page9.answer1,
                "answer2":rb.page9.answer2,
                "answer3":rb.page9.answer3,
                "answer4":rb.page9.answer4,
                "answer5":rb.page9.answer5,
                "answer6":rb.page9.answer6,
            },
            "page10": {
                "answer1": rb.page10.answer1,
                "answer2": rb.page10.answer2,
            },
            "page11": {
                "answer1": rb.page11.answer1,
            },
            "page12": {
                "answer1": rb.page12.answer1,
                "answer2": rb.page12.answer2,
            },
            "page13": {
                "answer1": rb.page13.answer1,
            },
            "success": rb.success
        }
    }, { new: true });
   
    if (!form) return res.status(stat404).send(err404Msg);

    res.send(form);
});

// // Delete
router.delete('/:id', auth, async(req, res) => {
    const form = await Form.findOneAndDelete({ _id: req.params.id });  // ok
    if (!form) return res.status(stat404).send(err404Msg);
    res.send(form);
});
 
module.exports = {
    router: router,
    // database: {
    //     findById: findById
    // }
};
  