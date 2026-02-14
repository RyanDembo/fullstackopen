const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://demboryan_db_user:${password}@cluster0.8txai5j.mongodb.net/noteApp?appName=Cluster0`

//set this because we want to search for items directly, even if its not in the Model's schema
mongoose.set('strictQuery',false)

// use ipv4, which is why we specify family:4
mongoose.connect(url, { family: 4 });


// define the SCHEMA
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({}).then(result =>{
  result.forEach(note => {
    console.log(note);
  })
  mongoose.connection.close();
})

// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   console.log(result);
  
//   mongoose.connection.close()
// })

