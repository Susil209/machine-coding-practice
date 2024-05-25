/* eslint-disable react/prop-types */
import { useState } from "react"

export default function AddTodo({onAddTodo}) {

    const [title, setTitle] = useState('')

    return (
        <>
            <input 
                placeholder="Add todo"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />

            <button 
                style={{marginLeft: '5px'}}
                onClick={() => {
                    setTitle('');
                    onAddTodo(title);
                }}
            >Add</button>
        </>
    )
}