import React from 'react';
import { PaymentStatus as StatusType } from '../../types/payment.types.ts';

interface PaymentStatusProps {
  status: StatusType;
  error?: string | null;
}

export const PaymentStatus: React.FC<PaymentStatusProps> = ({ status, error }) => {
  if (status === 'idle') return null;

  return (
    <div className={`payment-status ${status}`}>
      {status === 'processing' && (
        <div className="processing">
          <div className="spinner"></div>
          Processing your payment...
        </div>
      )}
      {status === 'success' && (
        <div className="success">
          Payment successful! Your balance will be updated shortly.
        </div>
      )}
      {status === 'error' && (
        <div className="error">
          {error || 'Payment failed. Please try again.'}
        </div>
      )}
    </div>
  );
};