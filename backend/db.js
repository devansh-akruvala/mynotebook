const mongoose = require("mongoose")
const mongoURI = "mongodb://localhost:27017"

const connectToMongo = () =>{
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI,() =>{console.log("Connected to mongo successful")})
}

module.exports = connectToMongo;