import { useState } from 'react';

const useAddOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addOrder = async (orderDetails) => {
    setIsLoading(true);
    let result = false;

    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(`http://localhost:3000/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ orderDetails })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred while adding the order');
      }
      result = { response: true, orderId: data.orderId }; 
    } catch (error) {
      setError(error.message);
      result = false; 
    } finally {
      setIsLoading(false);
      return result; 
    }
  };

  return { addOrder, isLoading, error };
};

export default useAddOrder;