const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//Allosws us to use json content type in api
app.use(express.json());
//Stop any cross origin errors
app.use(cors());

//Specify database URL and port to listen to (CHANGE TO ENV VARIABLES LATER!!)
const mongoURL = "mongodb+srv://Kristian:Denmark123@stuck-overflow.h3djc.mongodb.net/mern-todo?retryWrites=true&w=majority";
const port = 3001;

//Connect to our database 
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})  .then(() => console.log("Connected to DB "))
    .catch(console.error);

//Setup listening
app.listen(port, () => console.log("Listening on port" + port));

//Importing model so we can use it in our app
const Todo = require("./models/Todo");

//Creating routes
app.get("/todos", async(req, res) => {
    //mode.fins() returns all the documents from our table
    const todos = await Todo.find();

    //return json list of our documents
    res.json(todos);
})

app.post("/todo/new", (req, res) => {
    //Create new instance of our model (document) and inside its text field put everything in the body.text variable
    const todo = new Todo({
        text: req.body.text
    });
    //save our new document with mongoose
    todo.save();
    //return our newly saved doc so we can display it on our client
    res.json(todo);
});

app.delete("/todo/delete/:id", async (req, res) => {
    //Using mongoose function to find document and delete it by specifing its ID which we are getting from our url (/:id) - the url parameter has to match the bracket
    const result = await Todo.findByIdAndDelete(req.params.id)
    res.json(result);
})

app.get('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.complete = !todo.complete;

	todo.save();

	res.json(todo);
})