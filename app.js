const express = require('express');
const app = express();
const todoRoute = require('./server/routes/todo-route');
const bodyParser = require('body-parser')
const cors = require('cors');
// const path = require('path');
// const publicDir = path.join(__dirname,'public');

// app.use(express.static(publicDir));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use(todoRoute);

app.listen(3000,() => {
    console.log('Server is running..');
})