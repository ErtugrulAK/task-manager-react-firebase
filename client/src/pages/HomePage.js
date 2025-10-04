import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import '../App.css'; // We can still use some of the main app styles

function HomePage() {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully.");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="task-manager-container">
      <header className="App-header">
        <h1>Task Manager</h1>
        <div className="user-info">
          <span className="user-email">{currentUser.email}</span>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </header>
      <main className="App-main-content">
        <TaskForm />
        <TaskList />
      </main>
    </div>
  );
}

export default HomePage;