const express = require("express");

const app = express();

let phonebook = [
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

app.get("/api/persons", (request, response) => {
  response.json(phonebook);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  const numToGet = phonebook.find(number => number.id === id);

  if (numToGet){
    response.json(numToGet);
  } else {
    response.sendStatus(404);
  }
});


app.get("/info", (req, res) => {
  const now = new Date().toString();
  res.send(
    `<div>Phonebook has info for ${phonebook.length} people </div> <div>${now}</div>`
  );
});




const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
