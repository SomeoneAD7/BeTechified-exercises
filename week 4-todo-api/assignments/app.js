const express = require("express"); 
const app = express(); 
app.use(express.json());  
require("dotenv").config(); 
const cors = require("cors"); // for tesing API on browser. Cross Origin Resource Sharing 
app.use(cors("*")); 

let todos = [
    {
        id: 1,
        task: "Do week 4 assignment", 
        completed: true, 
        dueDate: "2026-10-16"
    }, 
    {
        id: 2, 
        task: "Do exam", 
        completed: false, 
        dueDate: "2026-10-03" 
    }
]; 

// test
app.get("/", (req, res) => {
    res.send("TODO API ready!");
}); 

// get all todos
app.get("/todos", (req, res) => {
    res.status(200).json(todos);
}); 

// get one todo 
app.get("/todos/:id", (req, res) => {
    const todo = todos.find((t) => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({error: "Task not found"});
    res.status(200).json(todo); 
}); 

// create new todo 
app.post("/todos", (req, res) => {
    const {task} = req.body; 
    if (!task) return res.status(400).json({error: "Task required"}); 
    const newTodo = {id: todos.length + 1, task: req.body.task, completed: false, dueDate: req.body.dueDate || null}; 
    todos.push(newTodo); 
    res.status(201).json(newTodo);
});  

// edit todo 
app.patch("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id); 
    const todo = todos.find((t) => t.id === id); 
    if (!todo) return res.status(404).json("Todo not found"); 
    Object.assign(todo, req.body); 
    res.status(200).json(todo); 
}); 

// delete todo 
app.delete("todos/:id", (req, res) => {
    const id = parseInt(req.params.id); 
    const len = todos.length; 
    todos = todos.filter((t) => t.id !== id); 
    if (todos.length === len) return res.status(404).json("Todo not found"); 
    res.status(204).send(); 
}); 

const errorHandler = (err, req, res, next) => {
    res.status(500).json({error: "Server error"}); 
    next(); 
}; 
app.use(errorHandler);

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});