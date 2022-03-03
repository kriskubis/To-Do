const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating our MongoDB schema for this model
const TodoSchema = new Schema({  
    text: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: String,
        default: Date.now()
    }
})

//.Model function compiles a model for us afte we specify the name and schema to follow
const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;