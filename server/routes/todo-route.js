const express = require('express');
const Route = express.Router();
const Todo = require('../data/todo');

Route.get('/', async(req, res) => {
    const todos = await Todo.find({});
    res.send(todos);
})

Route.delete('/task/:id', async(req, res) => {
    const id = req.params.id;
    try{
        await Todo.findByIdAndRemove({_id:id});
        res.send({success:'true'});
    }catch(e){
        res.send({success:'false'});
    }
})

Route.post('/save', (req, res) => {
    // console.log(req.body);
    try{
        const newTodo = new Todo({task:req.body.task, isDone:false});
        newTodo.save();
        res.send(newTodo);        
    }catch(error){
        res.send({success:false,error});
    }
})

Route.put('/toggle/:id', async(req, res) => {
    // console.log(id);
    try{
        await Todo.findByIdAndUpdate({_id:req.params.id}, {
            isDone:req.body.isDone
        });
        res.send({success:true});
    }catch(error) {
        res.send({success:false,error})
    }
    // console.log(todo);
})

module.exports = Route;