const { boolean } = require("joi");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/books",
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then(() => console.log("Connected Successfully"))
  .catch((err) => console.error(`there as been an error ${err}`));

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  isAvailable: Boolean,
});
const model = mongoose.model("Books", bookSchema);
module.exports = model;
