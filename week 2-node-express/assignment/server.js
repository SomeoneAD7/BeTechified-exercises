const express = require("express"); 
const dotenv = require("dotenv"); 
const path = require("path"); 
const { error } = require("console");

// Loads env variables from .env file 
dotenv.config(); 

const app = express(); 
const PORT = process.env.PORT || 3000; 

// JSON parsing 
app.use(express.json()); 

// Request logging 
const requestLogger = (req, res, next) => {
    console.log(`Time : ${new Date()} \nRequest : ${req.method} \nResponse : ${req.url} \n`);
    next();
}; 
app.use(requestLogger); 

/*// GET / 
app.get("/", (req, res) => {
    res.send("My Week 2 API!");
});*/ 

// Serve static HTML for GET /
app.use(express.static(path.join(__dirname, "public")));

// POST /user 
app.post("/user", (req, res) => {
    const {name, email} = req.body; 

    if (!name || !email) {
        return res.status(400).json({error: "Bad request : Missing required data."}); 
    } 
    res.status(200).send(`Hello, ${name}!`);
}); 

// GET /user/:id 
app.get("/user/:id", (req, res) => {
    const {id} = req.params; 
    res.send(`User ${id} profile`); 
}); 

// Error handling 
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).json({error : "Internal server error"});
}
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
}); 