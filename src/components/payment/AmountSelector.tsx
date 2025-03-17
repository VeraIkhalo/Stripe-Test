import React from 'react';
import { PAYMENT_AMOUNTS } from '../../constants/payment.constants';
import { PaymentAmount } from '../../types/payment.types';

interface AmountSelectorProps {
  selectedAmount: PaymentAmount | null;
  onAmountSelect: (amount: PaymentAmount) => void;
  disabled?: boolean;
}

export const AmountSelector: React.FC<AmountSelectorProps> = ({
  selectedAmount,
  onAmountSelect,
  disabled = false
}) => {
  return (
    <div className="amount-selector">
      <h3>Select Amount to Top Up</h3>
      <div className="amount-options">
        {Object.entries(PAYMENT_AMOUNTS).map(([key, amount]) => (
          <button
            key={key}
            onClick={() => onAmountSelect(amount as PaymentAmount)}
            className={`amount-button ${selectedAmount === amount ? 'selected' : ''}`}
            disabled={disabled}
          >
            ${amount.toFixed(2)}
          </button>
        ))}
      </div>
    </div>
  );
};