// We use this library for interacting with the mongodb atlas service
const mongoose = require("mongoose");

// Check the CLI arguments (passed in the process.argv array)
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
if (!password) {
  console.log("Password missing!");
  process.exit(1);
}

// Atlas will create a new DB if the name does not match an existing one
const dbName = "phonebook-app";
const dbURI = `mongodb+srv://fosapps:${password}@luisangulo-ucxal.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// DB ops are async, so the example code from fos part3c won't work.
// The code in the "once" callback will run when the connection opens
mongoose.connect(dbURI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
// Hacky solution. In a real API, to avoid this callback nesting, we can use Events to prevent the app from starting in a "broken"
// (I.E. "Still waiting for connection, but listening for requests that may cause errors") state, like so:

/*
expressApp.on('ready', function() { 
  expressApp.listen(3000, function(){ 
    console.log("app is ready"); 
}); 
}); 
mongoose.connect( "mongodb://localhost/mydb" );
mongoose.connection.once('open', function() { 
// All OK - fire (emit) a ready event. 
expressApp.emit('ready'); 
});
*/

db.once("open", () => {
  const contactSchema = new mongoose.Schema({ name: String, number: String });
  const Contact = mongoose.model("Contact", contactSchema);
  if (name && number) {
    const contact = new Contact({ name, number });
    contact
      .save()
      .then(res => console.log(`Added ${name}, number ${number} to phonebook`))
      .then(() => mongoose.connection.close());
  } else {
    Contact.find({})
      .then(result => result.forEach(note => console.log(note)))
      .then(() => mongoose.connection.close());
  }
});
