// src/hooks/customer/useGetCustomer.js

import { useState, useEffect } from 'react';

const useGetCustomer = (customerId) => {
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!customerId) {
        setCustomer(null); // Réinitialiser le client si aucun ID n'est fourni
        return;
      }      
      
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/customer/${customerId}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'An error occurred while fetching the customer');
        }
        
        setCustomer(data.customer);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomer();
  }, [customerId]);

  return { customer, isLoading, error };
};

export default useGetCustomer;
