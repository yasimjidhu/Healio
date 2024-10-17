import Cookies from 'js-cookie';
import React, { createContext, useContext, useState, useEffect } from "react";
import api from '../config/axiosInstance';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user data from localStorage if available
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null; // Parse if available, else return null
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // You can set user data from cookies or any other logic here if needed
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/users/login", {
        email,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Store user data and token in local storage
      const { user: userData, token } = response.data;
      setUser(userData);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData)); // Store user data
      return userData;
    } catch (axiosError) {
      setError(axiosError.response ? axiosError.response.data : axiosError.message);
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await api.post("/users/register", {
        username,
        email,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log('response of register', response);
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data
    } catch (axiosError) {
      setError(axiosError.response ? axiosError.response.data : axiosError.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');
    Cookies.remove('authToken');
  };

  return (
    <AuthContext.Provider value={{ login, register, logout, user, error }}>
      {children}
    </AuthContext.Provider>
  );
};
