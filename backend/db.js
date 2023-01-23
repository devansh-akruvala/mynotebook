const mongoose = require("mongoose")
const mongoURI = "mongodb://0.0.0.0:27017/mynotebook"

const connectToMongo = () =>{
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI,(err) =>{
        if(err)
        console.log(err)
        else
        console.log("Connected to mongo successful")})
}

module.exports = connectToMongo;