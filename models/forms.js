const mongoose = require('mongoose');
const Joi = require("@hapi/joi");

const formDataSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    page1: {
        firstname: { type: String, required: true },
        lastname:  { type: String, required: true },
        address: { type: String, required: true },
        address2: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        zip: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        country: { type: String, required: true },
    },
    page2: {
        sign1:{ type: String, required: true },
        sign2:{ type: String, required: true },
    },
    page3: {
        answer1: { type: Boolean, required: true },
        answer2: { type: Boolean, required: true },
        answer3: { type: Boolean, required: true },
        answer4: { type: Boolean, required: true },
        answer5: { type: Boolean, required: true },
        answer6: { type: Boolean, required: true },
        answerState:{ type: String, required: true },
    },
    page4: {
        answer1: { type: Boolean, required: true },
        answer2: { type: Boolean, required: true },
        answer3: { type: Boolean, required: true },
        answer4: { type: Boolean, required: true },
        answer5:{ type: String, required: true },
    },
    page5: {
        answer1: { type: Boolean, required: true },
        answer2: { type: Boolean, required: true },
        answer3: { type: Boolean, required: true },
        answer4: { type: Boolean, required: true },
        answer5: { type: Boolean, required: true },
        answer6: { type: Boolean, required: true },
    },
    page6: {
        answer1: { type: Boolean, required: true },
        answer2: { type: Boolean, required: true },
        answer3: { type: Boolean, required: true },
        answer4: { type: Boolean, required: true },
    },
    page7: {
        answer1: { type: Boolean, required: true },
        answer2: { type: Boolean, required: true },
    },
    page8: {
        answer1: { type: Boolean, required: true },
        answer2: { type: Boolean, required: true },
        answer3: { type: Boolean, required: true },
        answer4: { type: Boolean, required: true },
        answer5: { type: Boolean, required: true },
        answer6: { type: Boolean, required: true },
        answer7: { type: Boolean, required: true },
    },
    page9: {
        answer1: { type: Boolean, required: true },
        answer2: { type: Boolean, required: true },
        answer3: { type: Boolean, required: true },
        answer4: { type: Boolean, required: true },
        answer5: { type: Boolean, required: true },
        answer6: { type: Boolean, required: true },
    },
    page10: {
        answer1:{ type: String, required: true },
        answer2:{ type: String, required: true },
    },
    page11: {
        answer1:{ type: String, required: true },
    },
    page12: {
        answer1:{ type: String, required: true },
        answer2:{ type: String, required: true },
    },
    page13: {
        answer1:{ type: String, required: true },
    },
    date: {
        type: Date,
        default: Date.now
    },
    success: { type: Boolean, required: true },
})

const getformDataSchema = () => {
    return mongoose.model('Form', formDataSchema);
}

const Form = getformDataSchema();

const validateForm = (formData) => {
    console.log('Formdata: ', formData);
    const schema = {
        "id": Joi.number().required(),
        "page1": Joi.object({
            "firstname": Joi.string().required(),
            "lastname":  Joi.string().required(),
            "address": Joi.string().required(),
            "address2": Joi.string().required(),
            "state": Joi.string().required(),
            "city": Joi.string().required(),
            "zip": Joi.string().required(),
            "phone": Joi.string().required(),
            "email": Joi.string().required(),
            "country": Joi.string().required(),
        }),
        
        "page2": Joi.object({
            "sign1":Joi.string().required(),
            "sign2":Joi.string().required(),
        }),

        "page3": Joi.object({
            "answer1": Joi.boolean().required(),
            "answer2": Joi.boolean().required(),
            "answer3": Joi.boolean().required(),
            "answer4": Joi.boolean().required(),
            "answer5": Joi.boolean().required(),
            "answer6": Joi.boolean().required(),
            "answerState": Joi.string().required(),
        }),
        "page4": Joi.object({
            "answer1": Joi.boolean().required(),
            "answer2": Joi.boolean().required(),
            "answer3": Joi.boolean().required(),
            "answer4": Joi.boolean().required(),
            "answer5": Joi.string().required(),
        }),
        "page5": Joi.object({
            "answer1": Joi.boolean().required(),
            "answer2": Joi.boolean().required(),
            "answer3": Joi.boolean().required(),
            "answer4": Joi.boolean().required(),
            "answer5": Joi.boolean().required(),
            "answer6": Joi.boolean().required(),
        }),
        "page6": Joi.object({
            "answer1": Joi.boolean().required(),
            "answer2": Joi.boolean().required(),
            "answer3": Joi.boolean().required(),
            "answer4": Joi.boolean().required(),
        }),
        "page7": Joi.object({
            "answer1": Joi.boolean().required(),
            "answer2": Joi.boolean().required(),
        }),
        "page8": Joi.object({
            "answer1": Joi.boolean().required(),
            "answer2": Joi.boolean().required(),
            "answer3": Joi.boolean().required(),
            "answer4": Joi.boolean().required(),
            "answer5": Joi.boolean().required(),
            "answer6": Joi.boolean().required(),
            "answer7": Joi.boolean().required(),
        }),
        "page9": Joi.object({
            "answer1": Joi.boolean().required(),
            "answer2": Joi.boolean().required(),
            "answer3": Joi.boolean().required(),
            "answer4": Joi.boolean().required(),
            "answer5": Joi.boolean().required(),
            "answer6": Joi.boolean().required(),
        }),
        "page10": Joi.object({
            "answer1": Joi.string().required(),
            "answer2": Joi.string().required(),
        }),
        "page11": Joi.object({
            "answer1": Joi.string().required(),
        }),
        "page12": Joi.object({
            "answer1": Joi.string().required(),
            "answer2": Joi.string().required(),
        }),
        "page13": Joi.object({
            "answer1": Joi.string().required(),
        }),
        // "date": Joi.string().date(),
        "success": Joi.boolean().required(),
    }

    return Joi.validate(formData, schema);
}

module.exports = {
    Form: Form,
    validate: validateForm,
    formDataSchema: formDataSchema
};
  