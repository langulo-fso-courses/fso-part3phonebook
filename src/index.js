const contactFile = require("./contacts.json");
const express = require("express");
const parser = require("body-parser");
const PORT = 3001;

let persons = contactFile.persons  // Make in-memory copy of persons array

const app = express();
app.use(parser.json());

// parent
app.get('/', (req, res) => {
    console.log('/', req)
    res.send('<h1>Parent request</h1>')
})

// all persons
app.get('/api/persons', (req, res) => {
    console.log('/persons', 'get all persons', req)
    res.json(persons)
})

// specific contact
app.get('/api/persons/:id', (req, res) => {
    console.log('/persons', 'get one', req)
    
})

// new contact
app.post('/api/persons', (req, res) => {
    console.log('/persons', 'post', req)
})

// update contact
app.put('/api/persons/:id', (req, res) => {
    console.log('/persons', 'put', req)
})

// delete contact
app.delete('/api/persons/:id', (req, res) => {
    console.log('/persons', 'delete', req)
    const noteId = req.id
    
})

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`)
});
