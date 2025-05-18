const express = require("express");

const app = express();
app.use(express.json())
let phoneBook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];


app.get("/info", (req, res) => {
  const now = new Date().toString();
  res.send(
    `<div>Phonebook has info for ${phoneBook.length} people </div> <div>${now}</div>`
  );
});

app.get("/api/persons", (request, response) => {
  response.json(phoneBook);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  const numToGet = phoneBook.find(number => number.id === id);

  if (numToGet){
    response.json(numToGet);
  } else {
    response.sendStatus(404);
  }
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

const generateId = () => {
  const max = 10000000000
  return Math.floor(Math.random() * max);
}

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
