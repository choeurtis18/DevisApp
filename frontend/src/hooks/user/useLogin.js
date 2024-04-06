// src/hooks/user/useLogin.js

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setError(null); 
    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.data.token); 
        navigate('/'); 
      } else {
        throw new Error(data.message || 'Une erreur est survenue lors de la connexion.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return { login, error };
};

export default useLogin;
