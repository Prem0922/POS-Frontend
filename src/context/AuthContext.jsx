import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated on mount
    const token = localStorage.getItem('pos_token');
    const storedUserName = localStorage.getItem('pos_userName');
    
    if (token && storedUserName) {
      setIsAuthenticated(true);
      setUserName(storedUserName);
    }
    setIsLoading(false);
  }, []);

  const login = (token, userName) => {
    localStorage.setItem('pos_token', token);
    localStorage.setItem('pos_userName', userName);
    setIsAuthenticated(true);
    setUserName(userName);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('pos_token');
    localStorage.removeItem('pos_userName');
    setIsAuthenticated(false);
    setUserName(null);
    navigate('/login');
  };

  const value = {
    isAuthenticated,
    userName,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 