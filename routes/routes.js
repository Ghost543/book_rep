const express=require('express')
const Joi = require('joi')

const model= require('../models/models')

const router = express.Router()
router.get('/',(req,res)=>{
    model.find()
        .then(books => {
            res.status(200).json(books);
        })
        // .catch(err =>{
        //     res.send(err[0].message)
        //     console.log(err[0].message);
        // })
})

router.post('/',(req,res)=>{
    let { error } = inputValidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const book = {
        title: req.body.title,
        author: req.body.author,
        isAvailable: req.body.isAvailable
    }
    model.create(book)
        .then(()=>{
            res.status(201).send(`Successfully created a book ${book}`)
        })
})

function inputValidation(course) {
    const schema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        isAvailable:Joi.bool().required()
    })
    const result = schema.validate(course)
    return result;
}
module.exports = router