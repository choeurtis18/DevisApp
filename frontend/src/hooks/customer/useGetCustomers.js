// src/hooks/customer/useGetCustomer.js

import { useState, useEffect } from 'react';

const useGetCustomers = (customerId) => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);    
      
      try {
        const token = localStorage.getItem('token'); 
        const response = await fetch('http://localhost:3000/customer', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'An error occurred while fetching orders');
        }

        setCustomers(data.customers);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return { customers, isLoading, error };
};

export default useGetCustomers;
