import React, { useState } from 'react';
import axios from 'axios';

function Create() {
    const [task, setTask] = useState("");

    const handleAdd = () => {
        if (!task.trim()) {
            alert("Task cannot be empty");
            return;
        }

        axios.post('http://localhost:5690/add', { task })
            .then(result => {
                console.log("Task added:", result.data);
                setTask(""); // Clear input field
            })
            .catch(err => console.error("Error adding task:", err));
    };

    return (
        <div className="create_form">
            <input 
                type="text" 
                value={task} 
                onChange={(e) => setTask(e.target.value)} 
                placeholder="Enter a task" 
            />
            <button type="button" onClick={handleAdd}> Add Task </button>
        </div>
    );
}

export default Create;
