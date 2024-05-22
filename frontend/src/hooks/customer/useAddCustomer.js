import { useState } from 'react';

const useAddCustomer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addCustomer = async (customerDetails) => {
    setIsLoading(true);
    let success = false; 

    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(`http://localhost:3000/customer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ customerDetails })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred while adding the customer');
      }
      
      success = true;
    } catch (error) {
      setError(error.message);
      success = false; 
    } finally {
      setIsLoading(false);
      return success; 
    }
  };

  return { addCustomer, isLoading, error };
};

export default useAddCustomer;
