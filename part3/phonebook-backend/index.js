const express = require('express')
const morgan = require('morgan')
require('dotenv').config()

const Person = require('./models/person')
const errorHandler = require('./middleware/errorHandling')
morgan.token('postData', function getId (req) {
  //console.log(req.body);
  return req.body ? JSON.stringify(req.body) : null
})


const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] :response-time ms :postData'))



app.get('/info', (req, res, next) => {
  const now = new Date().toString()

  Person.find({}).then(people => {
    if (!people) return res.sendStatus(404)
    res.send(`<div>Phonebook has info for ${people.length} people </div> <div>${now}</div>`)
  }).catch(error => next(error))

})

app.get('/api/persons', (req, res, next) => {
  // return all  the people in the phonebook

  Person.find({}).then(result => {
    res.status(200).json(result)
  }).catch(error => next(error))

})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Person.findById(id).then(result => {
    if (result !== null) {
      res.json(result)
    } else {
      res.sendStatus(404)
    }
  }).catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {

  let data = req.body

  if(!data.name || !data.number){
    return res.status(400).send({ error: 'Missing name or number from body' })
  }
  // else if (phoneBook.some((item) => item.name === data.name)) {
  //   return res.status(400).send({error: "name must be unique"});
  // }

  // if data is valid
  const newPerson = new Person({
    name: data.name,
    number: data.number
  })
  newPerson.save().then(result => {
    res.json(result)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (req,res,next) => {
  const { name, number } = req.body
  const id = req.params.id

  Person.findById(id).then(person => {
    if (!person) {
      return res.sendStatus(404)
    }
    person.name = name
    person.number = number
    return person.save().then((updatedPerson) => {
      res.json(updatedPerson)
    })
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req,res,next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(() => {
      res.sendStatus(204)
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
