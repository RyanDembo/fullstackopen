import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Form from "./components/Form";
import Numbers from "./components/Numbers";
import Notification  from "./components/Notification";
import NumbersService from "./services/Numbers-Service";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notif, setNotif] = useState({});

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
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        // use PUT to replace the number for the name with a new one
        let personToUpdate = persons.find((person) => person.name === newName)
        personToUpdate = {...personToUpdate, number: newNumber};
        NumbersService.update(personToUpdate).then((response) => {
          setPersons(
            persons.map((person) =>
              person.id === response.id
                ? { ...person, number: response.number }
                : person
            )
          );
          sendNotif(`Updated ${response.name}`, false);
        })
        .catch(error => {
          if (error.code === "ERR_BAD_REQUEST") {
          // display the error on our notif service
          return sendNotif(error?.response?.data?.error ?? "Something Went Wrong", true);
        }
          if (error.request.status === 404) {
            sendNotif(
              ` Information of ${newName} has already been removed from the server`,
              true
            );
          }
          
        });

      } else {
        setNewName("");
        setNewNumber("");
      }
    } else {
      // add the name and number to the persons on the server

      NumbersService.create({ name: newName, number: newNumber })
      .then(createResponse => {
        setPersons(persons.concat(createResponse));
        sendNotif(`Added ${createResponse.name}`, false);
        setNewName("");
        setNewNumber("");
      })
      .catch(err => {
        if (err.code === "ERR_BAD_REQUEST") {
          // desiplay the error on our notif service
          return sendNotif(err?.response?.data?.error ?? "Something Went Wrong", true);
        }
        console.error(err);
      });
    }
  };

  const handleDeleteNumber = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      NumbersService.del(person.id)
        .then((deletedNumberId) => {
          setPersons(persons.filter((person) =>  person.id !== deletedNumberId))
        })
        .catch((error) => console.error(error));
    }
  };

  const sendNotif = (text, isError) => {
    setNotif({text: text, isError: isError});
    setTimeout(() => {setNotif({})}, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {notif}/>
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
      <Numbers search={search} persons={persons} handleDelete={handleDeleteNumber}/>
    </div>
  );
};

export default App;
