// src/hooks/order/useGetOrderMaterials.js

import { useState, useEffect } from 'react';

const useAddOrderMaterials = (orderId) => {
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token'); 
        const response = await fetch(`http://localhost:3000/order/${orderId}/materials`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'An error occurred while fetching the materials');
        }

        setMaterials(data.materials);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchMaterials();
    }
  }, [orderId]); 

  return { materials, isLoading, error };
};

export default useAddOrderMaterials;
