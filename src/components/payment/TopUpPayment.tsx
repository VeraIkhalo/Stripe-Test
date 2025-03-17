import React, { useState } from 'react';
import { useStripe, useElements, Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AmountSelector } from './AmountSelector';
import { CardInput } from './CardInput';
import { PaymentStatus } from './PaymentStatus';
import { usePayment } from '../../hooks/usePayment.ts';
import { PaymentAmount } from '../../types/payment.types.ts';
import '../../styles/payment.css';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

const TopUpPaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { status, setStatus, error, setError, initializePayment } = usePayment();
  const [selectedAmount, setSelectedAmount] = useState<PaymentAmount | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements || !selectedAmount) {
      setError('Please select an amount and enter card details');
      return;
    }

    setStatus('processing');

    try {
      // 1. Initialize payment on our backend
      const { clientSecret } = await initializePayment(selectedAmount);

      // 2. Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        }
      });

      if (result.error) {
        setStatus('error');
        setError(result.error.message || 'An unknown error occurred');
        return;
      }

      setStatus('success');
      
      // Optional: Redirect to success page
      // setTimeout(() => {
      //   window.location.href = '/payment/success';
      // }, 2000);

    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Payment failed');
    }
  };

  return (
    <div className="top-up-payment">
      <h2>Top Up Your Balance</h2>
      
      <form onSubmit={handleSubmit}>
        <AmountSelector
          selectedAmount={selectedAmount}
          onAmountSelect={setSelectedAmount}
          disabled={status === 'processing'}
        />

        <CardInput
          disabled={status === 'processing'}
          onChange={() => {
            if (status === 'error') {
              setStatus('idle');
              setError(null);
            }
          }}
        />

        <button
          type="submit"
          className="submit-button"
          disabled={!stripe || !selectedAmount || status === 'processing'}
        >
          {status === 'processing' ? 'Processing...' : `Pay $${selectedAmount?.toFixed(2) || '0.00'}`}
        </button>

        <PaymentStatus status={status} error={error} />
      </form>
    </div>
  );
};

// Wrapper component with Stripe Elements
export const TopUpPayment: React.FC = () => (
  <Elements stripe={stripePromise}>
    <TopUpPaymentForm />
  </Elements>
);