require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const morgan = require('morgan')
app.use(morgan('tiny'))
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
const Person = require('./models/person')

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/info', (request, response) => {
    const entries = persons.length
    const date = new Date ()
    response.send(`<p>Phonebook has info for ${entries} people</p> <p>${date}</p>`)
  })
  
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  })

app.get('/api/persons/:id', (request, response) => {   
    const id = Number(request.params.id)     // request params hakee url/path ja hakee numeroa? vai ID? Number vaihtaa id string to number
    const person = persons.find(person => person.id === id)   // find id that matches the parameter...persons/id ja assign se "person"
  
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })

const generateId = () => {
    const min = Math.ceil(0)
    const max = Math.floor(10000)
    const randomID =  Math.floor(Math.random() * (max - min + 1) + min)
    return (randomID)}

app.post('/api/persons', (request, response) => {   
    const body = request.body                  // HOX! body on tärkeä koska se hakee contenttia->se pitää määrittää

    if (!body.name) {
        return response.status(400).json({ 
          error: 'name missing' 
        })
      }
    if (!body.number) {
        return response.status(400).json({ 
            error: 'number missing' 
          })
    }
    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({ 
            error: 'name has to be unique' 
    })}
    

    const person = {
      id: generateId(),
      name: body.name,
      number: body.number,
      }
  
    persons = persons.concat(person)
  
    response.json(person)    // hox POST-method nii halutaa et vastataan yhdellä "ihmisellä" jotta se POSTAA sivulle uuden henkilö
  })

  
  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
  // 3.1 -> 3.7 tehty
  // 3.c alkaa....->