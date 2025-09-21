import React, { useEffect, useState } from "react";
import { getTodos, addTodo, toggleTodo, deleteTodo,editTodo } from "./services/api";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAdd = async (text) => {
    const newTodo = await addTodo(text);
    setTodos([...todos, newTodo]);
  };

 const handleToggle = async (id) => {
    const updated = await toggleTodo(id);
    setTodos(todos.map(t => (t._id === id ? updated : t)));
  };
  

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter(t => t._id !== id));
  };
 const handleEdit = async (id, newText) => {
  const updated = await editTodo(id, newText);
  setTodos(todos.map(t => (t._id === id ? updated : t)));
};
 return (
  <div className="app">
    <h1>✅ To-Do App</h1>
    <TodoForm onAdd={handleAdd} />
    <TodoList
      todos={todos}
      onToggle={handleToggle}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  </div>
);
}

export default App;
