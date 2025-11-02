const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log("no password provided");
    process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://demboryan_db_user:${password}@cluster0.8txai5j.mongodb.net/?appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model("Person",personSchema);

const printPhonebook = () =>{
    Person.find({}).then(result => {
        result.forEach(person =>{
            console.log(person)
        })
        mongoose.connection.close();
    })
}

const addPerson = (name, num) =>{
    const newPerson = new Person({
        name: name,
        number: num
    })

    newPerson.save().then(result =>{
        console.log('Person Saved!');
        console.log(result);

        mongoose.connection.close();
    });


}

switch (process.argv.length) {
    case 3:
        printPhonebook();
        break;
    case 5:
        addPerson(process.argv[3],process.argv[4]);
        break;
    
    default:
        console.log("improper arguments");
        process.exit(2);
        break;
}

