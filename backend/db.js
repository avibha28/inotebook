const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/inotebook'
connectToMongo().catch(err => console.log(err));

async function connectToMongo() {
  await mongoose.connect(mongoURI).then(
      ()=>{console.log("connected to mongodb")}
  )
}

module.exports = connectToMongo;