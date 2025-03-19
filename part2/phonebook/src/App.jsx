import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const handleAddingName = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already in the Phonebook!`);
      setNewName("");
    } else {
      // add the name nd number to the persons
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName("");
    }
  };

  const renderNumbers = () => {
    if (search === "") {
      return persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ));
    } else {
      return persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      ).map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter by name:{" "}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <form onSubmit={handleAddingName}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
        </div>
        <div>
          number:{" "}
          <input
            type="tel"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {renderNumbers()}
    </div>
  );
};

export default App;
