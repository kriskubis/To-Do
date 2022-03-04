import {useState, useEffect} from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const API_BASE = "http://localhost:3001"
  //empty array brackets at the end cause this to only trigger when the page loads
  useEffect(()=>{
     GetTodos();
  }, [])

  const GetTodos = ()  =>{
    fetch(API_BASE + "/todos")
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error: ", err)); 
  }
/* arrow function, same as this where (a) is argument
     async (a) => {
        return a + 100;
} */

  const completeTodo = async id => {
		const data = await fetch(API_BASE + '/todo/complete/' + id).then(res => res.json());

		setTodos(todos => todos.map(todo => {
			if (todo._id === data._id) {
				 todo.complete = data.complete;
			}

			return todo;
		}));
		
	}
  
  const deleteTodo = async id =>{
     const data = await fetch(API_BASE + "/todo/delete/" + id, {method: "DELETE"})
    .then(res=>res.json());
    console.log(data);
    setTodos(todos => todos.filter(todo => todo._id !== data._id));
  }

  const addTodo = async () =>{
     const data = await fetch(API_BASE + "/todo/new", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: newTodo
      })
     }).then(res => res.json());
     //take the current todo array and add the new one from data
     setTodos([...todos, data]);
     //hide our popup and set newTodo state to nothing
     setPopupActive(false);
     setNewTodo("");
  }

  return (
    <div className="App">
      <h1>Welcome User 👋</h1>
      <h4>Here are your tasks</h4>
      <div className="todos">
				{todos.length > 0 ? todos.map(todo => (
					<div className={
						"todo" + (todo.complete ? " is-complete" : "")
					} key={todo._id} onClick={() => completeTodo(todo._id)} >
						<div className="checkbox" ></div>

						<div className="text">{todo.text}</div>

						<div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
					</div>
				)) : (
					<p>You currently have no tasks</p>
				)}
			</div>
      <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

      {popupActive ? (
        <div className="popup">
           <div className="closePopup" onClick={() => setPopupActive(false )}>X</div>
          <div className="content">
            <h3>Add task </h3>
            <input 
            className="add-todo-input" 
            type="text"
            onChange={e => setNewTodo(e.target.value)}
            value={newTodo}></input>
            <div className="button" onClick={addTodo}>Create task </div>
          </div>
        </div>
      ):""}
    </div>
  );
}

export default App;
