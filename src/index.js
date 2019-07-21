const contactFile = require("./contacts.json");
const express = require("express");
const parser = require("body-parser");
const PORT = 3001;

let persons = contactFile.persons  // Make in-memory copy of persons array

const app = express();
app.use(parser.json());

// parent
app.get('/', (req, res) => {
    res.send('<h1>Parent request</h1>')
})

// info
app.get('/info', (req, res) => {
    const requestTime = new Date()
    const html = `<p>Phonebook has info for ${persons.length} people</p> <p>${requestTime}</p>`
    res.send(html)
})

// all persons
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

// specific person
app.get('/api/persons/:id', (req, res) => {    
    // Get the person id from the params of the request
    const personId = Number(req.params.id)
    const person = persons.find(p => p.id === personId)
    // Check if we have a valid person
    if (person) {
        // Return the serialized person
        res.json(person)
    } else {
        // Not found, send error
        res.status(404).send()
    }
})

// new contact
app.post('/api/persons', (req, res) => {
    
})

// update contact
app.put('/api/persons/:id', (req, res) => {
    
})

// delete contact
app.delete('/api/persons/:id', (req, res) => {
    const personId = Number(req.params.id)
})

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`)
});
