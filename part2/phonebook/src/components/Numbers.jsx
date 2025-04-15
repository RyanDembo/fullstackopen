import NumbersService from "../services/Numbers-Service";
import Number from "./Number";

const Numbers = ({ search, persons, handleDelete}) => {
  const renderNumbers = () => {
    if (search === "") {
      return persons.map((person) => (
        <Number key = {person.id} person={person} handleDelete={handleDelete}/>
      ));
    } else {
      return persons
        .filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((person) => (
          <Number key = {person.id} person={person} handleDelete={handleDelete}/>
        ));
    }
  };

  return <>{renderNumbers()}</>;
};

export default Numbers;
