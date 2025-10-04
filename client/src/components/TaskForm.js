import React, { useState } from 'react';
import './TaskForm.css';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { useAuth } from '../context/AuthContext'; // Import useAuth to get the current user

function TaskForm() {
  const [taskText, setTaskText] = useState('');
  const { currentUser } = useAuth(); // Get the current user from our context

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (taskText.trim() === '') return;
    // Ensure that a user is logged in before allowing a task to be added
    if (!currentUser) {
      console.error("No user is logged in to add a task.");
      return;
    }

    try {
      // Add a new document to the 'tasks' collection
      await addDoc(collection(db, "tasks"), {
        text: taskText,
        status: 'pending',
        createdAt: serverTimestamp(),
        userId: currentUser.uid // This line is crucial
      });
      console.log("Task added!");
      setTaskText('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Add a new task..." 
        className="task-input"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button type="submit" className="task-button">Add Task</button>
    </form>
  );
}

export default TaskForm;