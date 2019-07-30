require("dotenv").config();
const mongoose = require("mongoose"); // mongoDB middleware lib
mongoose.set('useFindAndModify', false); // Do NOT use "true" or mongoose will use a deprecated mongoDB API method

// Get the URI from .env config
const dbURI = process.env.MONGODB_URI;
console.log("attempting connection to uri: ", dbURI);

mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then(() => console.log("Connection successful"))
  .catch(err => console.log("Connection failed. Check URI/DB Service status", err));

// Define the MongoDB schema for Person objects
const schema = new mongoose.Schema({
  name: String,
  number: String
});

// We replace part of the callback that serializes each Person obj to JSON format to remove unwanted properties and
// convert the _id obj to a string.
schema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

// Build a model using the schema and call it "Person". The collection will be automatically pluralized and named "people"
// Mongoose will only link the name of the model with an existing model in a mongoDB db if their names are exactly the same
// Notice the use of node style exports instead of ES6 exports
module.exports = mongoose.model("Person", schema);
