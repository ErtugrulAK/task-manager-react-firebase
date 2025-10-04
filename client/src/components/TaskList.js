import React, { useState, useEffect } from 'react';
import './TaskList.css';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";
import { AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import TaskItem from './TaskItem';
import { useAuth } from '../context/AuthContext';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setTasks([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    let taskQuery;
    const baseCollection = collection(db, "tasks");

    if (filter === 'all') {
      taskQuery = query(
        baseCollection, 
        where("userId", "==", currentUser.uid),
        orderBy("createdAt", "desc")
      );
    } else {
      taskQuery = query(
        baseCollection, 
        where("userId", "==", currentUser.uid),
        where("status", "==", filter),
        orderBy("createdAt", "desc")
      );
    }

    const unsubscribe = onSnapshot(taskQuery, (querySnapshot) => {
      const tasksData = [];
      querySnapshot.forEach((doc) => {
        tasksData.push({ ...doc.data(), id: doc.id });
      });
      setTasks(tasksData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser, filter]);

  return (
    <div className="task-list-container">
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'active' : ''}>Pending</button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
      </div>

      <h2>My Tasks</h2>
      <div className="task-list">
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <AnimatePresence>
            {tasks.map(task => (
              <TaskItem 
                key={task.id} 
                task={task}
                isEditing={editingTaskId === task.id}
                setEditingTaskId={setEditingTaskId}
              />
            ))}
            {tasks.length === 0 && !loading && <p>No tasks yet. Add one!</p>}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default TaskList;