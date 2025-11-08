const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("Connecting to ", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MONGODB");
  })
  .catch((err) => {
    console.error("error connecting to MongoDB: ".err.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set('toJSON', {
    transform: (doc, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        delete returnedObj.__v;
        delete returnedObj._id;
    }
})


module.exports = mongoose.model("Person", personSchema);
