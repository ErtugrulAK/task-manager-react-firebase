import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'; // We need the auth service from our firebase config
import { onAuthStateChanged } from 'firebase/auth';

// Create a context
const AuthContext = React.createContext();

// Create a custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Create a provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // To check if the user state is loaded

  useEffect(() => {
    // onAuthStateChanged is a listener that runs whenever the user logs in or out
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false); // We're done loading the user state
    });

    // Unsubscribe from the listener when the component unmounts
    return unsubscribe;
  }, []);

  const value = {
    currentUser
  };

  // The provider makes the auth state (currentUser) available to all child components
  // We don't render the children until we're done loading the user state
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}