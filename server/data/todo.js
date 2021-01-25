const mongoose = require('./mongod.config');

const todoSchema = new mongoose.Schema({
    task:String,
    isDone:Boolean
})

const Todo = mongoose.model('Todo',todoSchema);

module.exports = Todo;