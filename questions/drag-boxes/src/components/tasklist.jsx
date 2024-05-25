import Task from "./task";

/* eslint-disable react/prop-types */
export default function TaskList({todos, onChangeTodo, onDeleteTodo}) {
    return(
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>
                    <Task 
                        todo={todo}
                        onChange={onChangeTodo}
                        onDelete={onDeleteTodo}
                    />
                </li>
            ))}
        </ul>
    )
}