// src/hooks/order/useGetOrder.js

import { useState, useEffect } from 'react';

const useGetOrder = (orderId) => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/order/${orderId}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'An error occurred while fetching the order');
        }
        
        setOrder(data.order);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]); // Exécuter ce hook chaque fois que l'ID de la commande change

  return { order, isLoading, error };
};

export default useGetOrder;
