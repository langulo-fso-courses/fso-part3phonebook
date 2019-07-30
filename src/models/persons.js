require("dotenv").config();
var uniqueValidator = require('mongoose-unique-validator');  // This fails to build on git, I'd like it out ASAP
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
// Define validation rules for the schema fields. Attempts to violate schema constraints will throw exceptions
// Note that adding/changing constraints changes the definition of the schema
const schema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    unique: true  // This is bad because "unique" already HAS behavior in mongoose, but that's the fso spec
  }
});


// Apply the uniqueValidator plugin to userSchema.
schema.plugin(uniqueValidator);

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
