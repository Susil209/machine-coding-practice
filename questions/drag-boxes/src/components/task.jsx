/* eslint-disable react/prop-types */
import { useState } from "react";

export default function Task({ todo, onChange, onDelete}) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;

  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={(e) => {
            onChange({ ...todo, title: e.target.value });
          }}
        />

        <button
          style={{ marginLeft: "5px" }}
          onClick={() => setIsEditing(false)}
        >
          Save
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button
          style={{ marginLeft: "5px" }}
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
      </>
    );
  }

  return (
    <>
        <input 
            type="checkbox"
            value={todo.done}
            onChange={e => {
                onChange({...todo, done: e.target.checked})
            }}
        />
        {todoContent}
        <button
            style={{marginLeft: '10px'}}
            onClick={() => onDelete(todo.id)}
        >
            Delete
        </button>
    </>
  );
}
