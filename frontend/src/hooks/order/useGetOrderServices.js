// src/hooks/order/useGetOrderServices.js

import { useState, useEffect } from 'react';

const useGetOrderServices = (orderId) => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/order/${orderId}/services`);
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

export default useGetOrderServices;