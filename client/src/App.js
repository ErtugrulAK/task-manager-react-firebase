import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion'; // Import from Framer Motion
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function GuestRoute({ children }) {
  const { currentUser } = useAuth();
  return !currentUser ? children : <Navigate to="/" />;
}

// A component to handle the animated routes
function AnimatedRoutes() {
  const location = useLocation(); // This hook is needed for AnimatePresence to work with routes

  // Animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: -20
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    // AnimatePresence detects when a component is removed from the tree
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <HomePage />
              </motion.div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/login" 
          element={
            <GuestRoute>
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <LoginPage />
              </motion.div>
            </GuestRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <GuestRoute>
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <SignupPage />
              </motion.div>
            </GuestRoute>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}


function App() {
  return (
    <Router>
      <div className="App">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;