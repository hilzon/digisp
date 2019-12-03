const express = require('express')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const fileUpload = require('express-fileupload')
const cors = require('cors')

app.use(cors())

mongoose.Promise = global.Promise
const dbs = "mongodb+srv://babastudio:studio123@dilo-ojx6f.mongodb.net/babahome?retryWrites=true&w=majority"
mongoose.connect(dbs)
  .then(db => console.log('db connected'))

  .catch(err => console.log(err))


// Middlewares
app.use(morgan())

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(express.static('public'))
app.use(fileUpload())


// Routes
// app.use('/users', require('./routers/users'))
require('./routers/router')(app)

// Start the server
const port = process.env.PORT || 3000
app.listen(port)
console.log(`Server is listening at ${port}`)

