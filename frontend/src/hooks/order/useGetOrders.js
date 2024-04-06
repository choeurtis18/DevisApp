// src/hooks/order/useGetOrders.js

import { useState, useEffect } from 'react';

const useGetOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/order');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'An error occurred while fetching orders');
        }

        setOrders(data.orders);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []); 

  return { orders, isLoading, error };
};

export default useGetOrders;
