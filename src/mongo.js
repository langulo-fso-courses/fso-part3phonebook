const mongoose = require("mongoose");

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
if (!password) {
  console.log("Password missing!");
  process.exit(1);
}

const dbName = "phonebook-app";
const dbURI = `mongodb+srv://fosapps:${password}@luisangulo-ucxal.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true }).then((res) => res);
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  const contactSchema = new mongoose.Schema({ name: String, number: String });
  const Contact = mongoose.model("Contact", contactSchema);
  if (name && number) {
    const contact = new Contact({ name, number });
    contact
      .save()
      .then(res => console.log(`Added ${name}, number ${number} to phonebook`))
      .then(() => {
        console.log("Create contact close");
        mongoose.connection.close();
      });
  } else {
    Contact.find({})
      .then(result => {
        result.forEach(note => console.log(note));
      })
      .then(() => {
        console.log("Find contact close");
        mongoose.connection.close();
      });
  }
});
