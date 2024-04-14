// src/hooks/order/useGetOrderServices.js

import { useState, useEffect } from 'react';

const useUpdateOrder = (orderId) => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token'); 
        const response = await fetch(`http://localhost:3000/order/${orderId}/services`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'An error occurred while fetching the services');
        }

        setServices(data.services);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchServices();
    }
  }, [orderId]); 

  return { services, isLoading, error };
};

export default useUpdateOrder;
