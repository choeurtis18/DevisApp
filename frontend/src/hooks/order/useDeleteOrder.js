// src/hooks/order/useDeleteOrder.js

import { useState } from 'react';

const useDeleteOrder = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const deleteOrder = async (orderId) => {
    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/order/${orderId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Could not delete the order.');
      }
      
      return true;
    } catch (error) {
      setError(error.message);
      return false; // Indique que la suppression a échoué
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteOrder, isDeleting, error };
};

export default useDeleteOrder;