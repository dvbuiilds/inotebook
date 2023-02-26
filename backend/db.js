const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/inotebook";
mongoose.set('strictQuery', true);
const connectToMongoDB = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log('connected to mongo successfully!.');
    })
}

module.exports = connectToMongoDB;