import React, { useState } from "react";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && newText.trim()) {
      onEdit(todo._id, newText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={`todo ${todo.completed ? "completed" : ""}`}>
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <span>{todo.text}</span>
      )}
      <div>
        <button onClick={() => onToggle(todo._id)}>
          {todo.completed ? "Undo" : "Complete"}
        </button>
        <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
        <button onClick={() => onDelete(todo._id)}>Delete</button>
      </div>
    </div>
  );
}

export default TodoItem;
