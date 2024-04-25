// src/hooks/service/useAddService.js

import { useState } from 'react';

const useAddService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addService = async (serviceDetails, orderId) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(`http://localhost:3000/service`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ serviceDetails, orderId })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred while adding the service');
      }

      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { addService, isLoading, error };
};

export default useAddService;