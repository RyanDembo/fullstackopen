import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas"}]);
  const [newName, setNewName] = useState("");

  const handleAddingName = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)){
      alert(`${newName} is already in the Phonebook!`)
      setNewName("");
    } else {
      // add the name to the persons
      setPersons(persons.concat({name: newName}));
      setNewName("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddingName}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map( person => <div key ={person.name}>{person.name}</div>)}
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
