import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';
import Create from './Create';

function Home() {
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5690/get')
            .then(result => {
                if (Array.isArray(result.data)) {
                    setTodo(result.data);
                } else {
                    console.error("API response is not an array:", result.data);
                }
            })
            .catch(err => console.error("Error fetching tasks:", err));
    }, []);

    const handleEdit = (id, currentStatus) => {
        axios.put(`http://localhost:5690/update/${id}`, { done: !currentStatus })
            .then(result => {
                setTodo(todo.map(item => 
                    item._id === id ? { ...item, done: !currentStatus } : item
                ));
            })
            .catch(err => console.log("Error updating task:", err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5690/delete/${id}`)
            .then(result => {
                setTodo(todo.filter(item => item._id !== id));
            })
            .catch(err => console.log("Error deleting task:", err));
    };
    

    return (
        <div className="home">
            <h2>Hannah's To-Do List</h2>
            <Create />
            {
                todo.length === 0 
                ? <div className="task"><h2>Yay, no tasks!</h2></div>
                : todo.map((todoItem) => (
                    <div className="task" key={todoItem._id}>
                        <div className='checkbox' onClick={() => handleEdit(todoItem._id, todoItem.done)}>
                            {todoItem.done ? <BsFillCheckCircleFill className='icon' /> : 
                              <BsCircleFill className='icon' />}
                            <p className={todoItem.done ? 'done' : ''}>{todoItem.task}</p>
                        </div>
                        <div>
                            <span>
                                <BsFillTrashFill className='icon' onClick={() => handleDelete(todoItem._id)}/> 
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Home;
