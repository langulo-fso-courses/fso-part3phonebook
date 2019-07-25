const contactFile = require("./contacts.json");
const express = require("express");
const parser = require("body-parser");
const corsMiddleWare = require("cors");
// const customMorgan = require("./MorganTokenizer");

let persons = contactFile.persons; // Make in-memory copy of persons array
const app = express();
// Allows the server to deliver static files (Here, to deliver the frontend built app)
app.use(express.static('build'));
app.use(corsMiddleWare());  // Allow cross origin requests
app.use(parser.json());
// app.use(customMorgan);  // logger

// info
app.get("/info", (req, res) => {
  const requestTime = new Date();
  const html = `<p>Phonebook has info for ${
    persons.length
  } people</p> <p>${requestTime}</p>`;
  res.send(html);
});

// all persons
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

// specific person
app.get("/api/persons/:id", (req, res) => {
  // Get the person id from the params of the request
  const personId = Number(req.params.id);
  const person = persons.find(p => p.id === personId);
  // Check if we have a valid person
  if (person) {
    // Return the serialized person
    res.json(person);
  } else {
    // Not found, send error
    res.status(404).send();
  }
});

/**
 * Returns null for good requests or an error obj for bad ones
 * @param {*} newPerson
 * @param {*} personsList
 */
const validateNewPerson = (newPerson, personsList) => {
  try {
    if (!newPerson.name.length) {
      return { error: "name must not be empty" };
    }
    if (!newPerson.number.length) {
      return { error: "number must not be empty" };
    }
    const repeat = personsList.find(p => p.name === newPerson.name);
    if (repeat) {
      return { error: "name must be unique" };
    }
  } catch (err) {
    return { error: "missing attribute" };
  }
};

// new contact
app.post("/api/persons", (req, res) => {
  // If you do this, you change the original, DONT DO IT
  // const newPerson = req.body;
  // This however creates a copy, so it's ok
  const newPerson = JSON.parse(JSON.stringify(req.body));
  // if the body's not empty, save the person, else return an error
  let error = validateNewPerson(newPerson, persons);
  if (!error) {
    newPerson.id = Math.floor(Math.random() * 10000);
    persons = persons.concat(newPerson);
    //res.status(202).send();  // This is the correct response
    res.json(newPerson); // This is the response that works without fixing the front
  } else {
    res.status(400).json(error);
  }
});

// update contact
app.put("/api/persons/:id", (req, res) => {});

// delete contact
app.delete("/api/persons/:id", (req, res) => {
  // Get the person id from the params of the request
  const personId = Number(req.params.id);
  const prevLen = persons.length;
  persons = persons.filter(p => p.id !== personId);
  // If the list is shorter, we succeeded
  if (persons.length !== prevLen) {
    res.status(200).send();
  } else {
    // Not found, send error
    res.status(404).send();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
