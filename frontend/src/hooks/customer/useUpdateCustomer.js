// src/hooks/customer/useUpdateCustomer.js

import { useState } from 'react';

const useUpdateCustomer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCustomer = async (customerId, customerDetails) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(`http://localhost:3000/customer/${customerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ customerDetails })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred while updating the customer');
      }

      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateCustomer, isLoading, error };
};

export default useUpdateCustomer;