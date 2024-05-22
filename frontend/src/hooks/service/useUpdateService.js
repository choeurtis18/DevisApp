// src/hooks/service/useUpdateService.js

import { useState } from 'react';

const useUpdateService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateService = async (serviceId, serviceDetails) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(`http://localhost:3000/service/${serviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ serviceDetails })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred while updating the service');
      }

      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateService, isLoading, error };
};

export default useUpdateService;