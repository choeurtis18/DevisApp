// src/hooks/material/useAddMaterial.js

import { useState } from 'react';

const useAddMaterial = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addMaterial = async (materialDetails, orderId) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(`http://localhost:3000/material`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ materialDetails, orderId })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred while adding the material');
      }

      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { addMaterial, isLoading, error };
};

export default useAddMaterial;