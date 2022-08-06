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

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(person => {
    response.json(person)
    })
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

    const person = new Person({
      id: generateId(),
      name: body.name,
      number: body.number,
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })

  
  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
  // 3.1 -> 3.7 tehty
  // 3.c alkaa....->