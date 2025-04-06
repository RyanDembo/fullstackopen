import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Form from "./components/Form";
import Numbers from "./components/Numbers"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(()=> {
    axios.get('http://localhost:3001/persons').then((response) => {
      // retrieve the persons data, then update the state
      setPersons(response.data);
    })
  },[]);

  const handleAddingName = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already in the Phonebook!`);
      setNewName("");
    } else {
      // add the name nd number to the persons
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName("");
      setNewNumber("");
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
      <Numbers search={search} persons={persons}/>
    </div>
  );
};

export default App;
