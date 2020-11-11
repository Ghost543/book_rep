const express = require("express");
const Joi = require("joi");

const model = require("../models/models");

const router = express.Router();
router.get("/", (req, res) => {
  model.find().then((books) => {
    res.status(200).json(books);
  });
  // .catch(err =>{
  //     res.send(err[0].message)
  //     console.log(err[0].message);
  // })
});

router.post("/", (req, res) => {
  let { error } = inputValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const book = {
    title: req.body.title,
    author: req.body.author,
    isAvailable: req.body.isAvailable,
  };
  model.create(book).then(() => {
    res.status(201).send(`Successfully created a book ${book}`);
  });
});

router.put("/:id", async (req, res) => {
  let { error } = inputValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const book = {
    title: req.body.title,
    author: req.body.author,
    isAvailable: req.body.isAvailable,
  };
  const { err, result } = await put_book(req.params.id, book);
  if (err.length > 0) {
    return res.status(404).send(err[0]);
  }
  res.status(201).send(result);
  console.log(result);
});

async function put_book(id, data) {
  const book = await model.findById(id);
  let err404 = [];
  if (!book) {
    err404.push("Book none existing!");
  }

  book.set({
    title: data.title,
    author: data.author,
    isAvailable: data.isAvailable,
  });
  const updatedBook = await book.save();
  return { err: err404, result: updatedBook };
}

function inputValidation(course) {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    isAvailable: Joi.bool().required(),
  });
  const result = schema.validate(course);
  return result;
}
module.exports = router;
