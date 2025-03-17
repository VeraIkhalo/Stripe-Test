import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import { STRIPE_CARD_ELEMENT_OPTIONS } from '../../constants/payment.constants';


interface CardInputProps {
  onChange?: (event: StripeCardElementChangeEvent) => void;
  disabled?: boolean;
}

export const CardInput: React.FC<CardInputProps> = ({ onChange, disabled = false }) => {
  return (
    <div className="card-input-container">
      <label>Card Details</label>
      <div className={`card-element ${disabled ? 'disabled' : ''}`}>
        <CardElement
          options={STRIPE_CARD_ELEMENT_OPTIONS}
          onChange={onChange}
        />
      </div>
    </div>
  );
};