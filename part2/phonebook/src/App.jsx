import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Form from "./components/Form";
import Numbers from "./components/Numbers";
import NumbersService from "./services/Numbers-Service";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    NumbersService.getAll()
      .then((initialPersons) => {
        // retrieve the persons data, then update the state
        setPersons(initialPersons);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleAddingName = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already in the Phonebook!`);
      setNewName("");
    } else {
      // add the name nd number to the persons on the server

      NumbersService.create({ name: newName, number: newNumber })
      .then(createResponse => {
        setPersons(persons.concat(createResponse));
        setNewName("");
        setNewNumber("");
      })
      .catch(error => console.error(error));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter by name: <Search search={search} setSearch={setSearch} />
      </div>
      <Form
        onSubmit={handleAddingName}
        newName={newName}
        newNumber={newNumber}
        onChangeName={(e) => setNewName(e.target.value)}
        onChangeNumber={(e) => setNewNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      <Numbers search={search} persons={persons} />
    </div>
  );
};

export default App;
