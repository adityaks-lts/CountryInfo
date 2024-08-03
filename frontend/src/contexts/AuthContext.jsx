import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from 'react-jwt';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const user = decodeToken(token);
      setAuth({ token, user });
    }
  }, []);

  const login = (token) => {
    const user = decodeToken(token);
    setAuth({ token, user });
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
