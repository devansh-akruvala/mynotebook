const connectToMongo = require("./db")
const express = require('express')
const cors = require('cors')

connectToMongo();

const app = express()
const port = 5000


// middleware to use json
app.use(express.json())
// middleware to use cors
app.use(cors())

// available ROutes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`mynotebook app listening on port ${port}`)
})