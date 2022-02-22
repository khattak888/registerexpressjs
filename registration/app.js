const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeRouter = require('./routers/homeRouter')
const app = express();
const port = process.env.PORT || '8080';

//database connection
mongoose.connect("mongodb://localhost:27017/studentsdata", {useNewUrlparser:true})
const db = mongoose.connection;
db.on("error",()=>{
    console.log("error in connection");
})
db.once('open',()=>{
    console.log("connected");
})

//template engine
app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: false}))
//parse application/json
app.use(bodyParser.json())

//static file
app.use(express.static('public'))


//load router
app.use('/', homeRouter)

app.listen(port, ()=>{
    console.log(`Server listening to the port ${port}`);
})
