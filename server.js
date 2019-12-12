const express = require('express')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')  
// const Chat = require('./models/Chatdetail')

// Chat
// const socketIO = require('socket.io')
// const server = http.createServer(app)


const app = express()
const fileUpload = require('express-fileupload')
const cors = require('cors')
// const cloudinary = require('cloudinary').v2

// cloudinary.config({
//   cloud_name: 'dmqynegtc',
//   api_key: '917568763833465',
//   api_secret: 'jiRHVzQE3is3dIjiKwnaS_QnP0Q'
// });

app.use(cors())

mongoose.Promise = global.Promise
const dbs = "mongodb+srv://babastudio:studio123@dilo-ojx6f.mongodb.net/fibernet?retryWrites=true&w=majority"
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



// mongoose.connect('mongodb://localhost/babahome')
//     .then((db) => console.log('db connected'))
//     .catch((err) => console.log(err))

// const  mongoose  = require("mongoose");
// // mongoose.Promise  = require("bluebird");
// const  url  =  "mongodb://localhost:27017/chat";
// const  connect  =  mongoose.connect(url, { useNewUrlParser: true  });
// // module.exports  =  connect;

// const server = http.createServer(app)
// const io = socketIO(dbs)


// Routes
// app.use('/users', require('./routers/users'))
require('./routers/router')(app)

// Start the server
const port = process.env.PORT || 3000
app.listen(port)
console.log(`Server is listening at ${port}`)

