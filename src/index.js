const express = require("express");
const parser = require("body-parser");
const corsMiddleWare = require("cors");
const badIdMiddleWare = require("./errors/malformed_id");
const badEndpointMiddleWare = require("./errors/unknown_endpoint");
const badPersonMiddleWare = require("./errors/invalid_person");
const Person = require("./models/persons"); // Person mongoose model
const app = express();
// Allows the server to deliver static files (Here, to deliver the frontend built app)
app.use(express.static("build"));
app.use(corsMiddleWare()); // Allow cross origin requests
app.use(parser.json());

// html sample page for devtesting
app.get("/info", (req, res) => {
  Person.find({})
    .then(people => {
      // people is an array of person objs in the atlas db
      const requestTime = new Date();
      const html = `<p>Phonebook has info for ${
        people.length
      } people</p> <p>${requestTime}</p>`;
      res.status(200).send(html);
    })
    .catch(err => {
      console.log("/info response error: ", err.message);
      res.status(400).send(err.message);
    });
});

// all persons
app.get("/api/persons", (req, res) => {
  Person.find({})
    .then(people => {
      res.json(people.map(person => person.toJSON()));
    })
    .catch(err => {
      console.log("/info response error: ", err.message);
      res.status(400).send();
    });
});

// specific person
app.get("/api/persons/:id", (req, res, next) => {
  const personId = req.params.id;
  Person.findById(personId)
    .then(person => {
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).send(); // Not found, send error
      }
    })
    .catch(error => next(error));
});

// New person
app.post("/api/persons", (req, res, next) => {
  // Note that we're no longer validating the person obj.
  // The validations are now handled client-side
  const newPerson = new Person(req.body);
  newPerson
    .save()
    .then(person => res.json(person.toJSON()))
    .catch(error => next(error));  // Delegate error handling to middleware
});

app.put("/api/persons/:id", (req, res) => {
  // TODO: Test using the body directly
  console.log(req.body)
  Person.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedPerson => res.json(updatedPerson.toJSON()))
    // Use error handling middleware
    .catch(error => next(error));
});

// TODO: Remember to test the frontend
app.delete("/api/persons/:id", (req, res, next) => {
  const contactId = req.params.id;
  Person.findByIdAndRemove(contactId)
    .then(result => res.status(204).end())
    // Pass the error to middleware handler instead of resolving here
    .catch(err => next(err));
});

app.use(badEndpointMiddleWare); // Third to last executed middleware
app.use(badPersonMiddleWare); // Second to last executed middleware
app.use(badIdMiddleWare); // Last executed middleware

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
