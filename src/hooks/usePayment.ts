import { useState } from 'react';
import { PaymentAmount, PaymentStatus, PaymentResponse } from '../types/payment.types';
import { API_ENDPOINTS } from '../constants/payment.constants';

export const usePayment = () => {
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const initializePayment = async (amount: PaymentAmount): Promise<PaymentResponse> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await fetch(API_ENDPOINTS.INITIALIZE_PAYMENT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount })
      });

      if (!response.ok) {
        throw new Error('Payment initialization failed');
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment initialization failed');
      throw err;
    }
  };

  return {
    status,
    setStatus,
    error,
    setError,
    initializePayment
  };
};