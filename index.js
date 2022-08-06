require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.static('build'))
app.use(express.json())
const morgan = require('morgan')
app.use(morgan('tiny'))
const cors = require('cors')
app.use(cors())
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

app.get('/api/persons/:id', (request, response, next) => {  // haetaa id urlissa ja saadaa vastaavan id tiedot
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    }
    else {
      response.status(404).end()
    }
  })
  .catch(error => next(error)) // jos laitetaa väärä id nii kertoo mikä vikana
  })    // eli siis kun mentii elsen kautta ja saatii errori ni catch hoitaa errorin ja siirtää sen
   // next metodii joka sit printtaa errorin näytölle
   // errorit määritellää errorhandlerissa alempana ja annetaa omat selitykset erroreille...

   app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)  // poistetaan annettu id databasesta
      .then(result => {           // jos ei löydy id nii sama errori -> errorhandleriin
        response.status(204).end()
      })
      .catch(error => next(error))
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

    const person = new Person({
      id: generateId(),
      name: body.name,
      number: body.number,
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })
  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
  
    next(error)
  }
  
  // tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!
  app.use(errorHandler)
  
  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

  //eli alota tai tsekkaa onko 3.16 valmis
  //delete pitäs toimia
