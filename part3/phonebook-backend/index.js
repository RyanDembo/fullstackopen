const express = require("express");
const morgan = require("morgan");
require('dotenv').config();

const Person = require('./models/person');
const { default: mongoose } = require("mongoose");
let phoneBook;
morgan.token('postData', function getId (req) {
  //console.log(req.body);
  return req.body ? JSON.stringify(req.body) : null;
})


const app = express();
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] :response-time ms :postData'));



app.get("/info", (req, res) => {
  const now = new Date().toString();

 Person.find({}).then(result => {
    res.send(
    `<div>Phonebook has info for ${result.length} people </div> <div>${now}</div>`
  );
  }).catch( error => {
    console.error(error.message);
    response.status(500).json({message: 'Internal Server Error'});
  })

});

app.get("/api/persons", (request, response) => {
  // return all  the people in the phonebook

  Person.find({}).then(result =>{
    response.status(200).json(result);
  }).catch( error => {
    console.error(error.message);
    response.status(500).json({message: 'Internal Server Error'});
  })
  
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  Person.findById(id).then(result => {
    if (result !== null) {
      response.json(result);
    } else {
      response.sendStatus(404);
    }
  }).catch(error => {
    console.error(error);

    if (error instanceof mongoose.CastError) {
      response.sendStatus(404);
      return;
    }
    response.status(500).json({message: 'Internal Server Error'});
  })

});

app.post('/api/persons', (req,res) => {

  let data = req.body;

  if(!data.name || !data.number){
    return res.status(400).send({error: 'Missing name or number from body'});
  } else if (phoneBook.some((item) => item.name === data.name)) {
    return res.status(400).send({error: "name must be unique"});
  }

  // if data is valid
  const id = generateId();
  data = {...data, "id": id}
  phoneBook = phoneBook.concat(data);
  res.json(data);
})

app.delete("/api/persons/:id", (req,res) => {
  const id = req.params.id;
  const found = phoneBook.find(entry => entry.id === id)
  if (found === undefined) {
      return res.status(400).send()
  }
  phoneBook = phoneBook.filter(entry => entry.id !== id)
  res.status(204).send()
})

const generateId = () => {
  const max = 10000000000
  return Math.floor(Math.random() * max).toString();
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
