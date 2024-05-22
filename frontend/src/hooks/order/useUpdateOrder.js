// src/hooks/order/useUpdateOrder.js

import { useState } from 'react';

const useUpdateOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateOrder = async (orderId, orderDetails, customerDetails) => {
    setIsLoading(true);


    orderDetails.customer_id = customerDetails._id;

    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(`http://localhost:3000/order/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ orderDetails })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred while updating the order');
      }

      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateOrder, isLoading, error };
};

export default useUpdateOrder;