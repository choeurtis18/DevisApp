// src/hooks/material/useUpdateMaterial.js

import { useState } from 'react';

const useUpdateMaterial = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateMaterial = async (materialId, materialDetails) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(`http://localhost:3000/material/${materialId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ materialDetails })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred while updating the material');
      }

      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateMaterial, isLoading, error };
};

export default useUpdateMaterial;