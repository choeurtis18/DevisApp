// src/hooks/material/useAddMaterial.js

import { useState } from 'react';

const useDeleteMaterial = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteMaterial = async (materialId) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/material/${materialId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred while deleting the material');
      }

      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteMaterial, isLoading, error };
};

export default useDeleteMaterial;