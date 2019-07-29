const express = require("express");
const parser = require("body-parser");
const corsMiddleWare = require("cors");
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
app.get("/api/persons/:id", (req, res) => {
  const personId = req.params.id;
  Person.findById(personId)
    .then(person => {
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).send(); // Not found, send error
      }
    })
    .catch(error => {
      console.log("get error: ", error);
      res.status(400).send({ error: " malformatted id " }); // a bad ID is the only way this could fail
    });
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

app.post("/api/persons", (req, res) => {
  const personData = JSON.parse(JSON.stringify(req.body));
  // let error = validateNewPerson(personData, persons);
  let clientError = null;
  if (!clientError) {
    console.log('persondata', personData);
    
    const newPerson = new Person(personData);
    console.log('newperson:', newPerson)
    newPerson.save()
    .then(person => res.json(person.toJSON()))
    .catch(err => res.status(400).send('Error creating person: ', err))
  } else {
    res.status(400).json(clientError);
  }
});

app.put("/api/persons/:id", (req, res) => {
  console.log('Put request');
  
});

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
