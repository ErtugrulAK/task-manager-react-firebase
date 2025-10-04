import React, { useState } from 'react';
import './TaskItem.css';
import { db } from '../firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { motion } from 'framer-motion'; // Import motion
import { FaTrash } from 'react-icons/fa'; // Import a trash icon

function TaskItem({ task, isEditing, setEditingTaskId }) {
  const [editText, setEditText] = useState(task.text);

  const handleStatusChange = async () => {
    const taskDocRef = doc(db, 'tasks', task.id);
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    await updateDoc(taskDocRef, { status: newStatus });
  };
  
  const handleDelete = async () => {
    const taskDocRef = doc(db, 'tasks', task.id);
    await deleteDoc(taskDocRef);
  };

  const handleUpdate = async () => {
    const taskDocRef = doc(db, 'tasks', task.id);
    await updateDoc(taskDocRef, { text: editText });
    setEditingTaskId(null);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setEditingTaskId(null);
  };

  const handleEditClick = () => {
    setEditingTaskId(task.id);
  }

  return (
    <motion.div 
      className="task-item"
      layout // This tells Framer Motion to animate layout changes
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="task-content">
        <input 
          type="checkbox"
          checked={task.status === 'completed'}
          onChange={handleStatusChange}
          className="task-checkbox"
        />
        {isEditing ? (
          <input 
            type="text" 
            value={editText} 
            onChange={(e) => setEditText(e.target.value)} 
            className="edit-input"
          />
        ) : (
          <p className={task.status === 'completed' ? 'task-text completed' : 'task-text'}>
            {task.text}
          </p>
        )}
      </div>
      <div className="task-actions">
        {isEditing ? (
          <>
            <button onClick={handleUpdate} className="save-button">Save</button>
            <button onClick={handleCancel} className="cancel-button">Cancel</button>
          </>
        ) : (
          <>
            <button onClick={handleEditClick} className="edit-button">Edit</button>
            <button onClick={handleDelete} className="delete-button">
              <FaTrash />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default TaskItem;