const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const printPhonebook = () => {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
};

const addPerson = (name, num) => {
  const newPerson = new Person({
    name: name,
    number: num,
  });

  newPerson.save().then((result) => {
    console.log("Person Saved!");
    console.log(result);

    mongoose.connection.close();
  });
};

switch (process.argv.length) {
  case 2:
    printPhonebook();
    break;
  case 4:
    addPerson(process.argv[2], process.argv[3]);
    break;

  default:
    console.log("improper arguments");
    process.exit(2);
    break;
}
