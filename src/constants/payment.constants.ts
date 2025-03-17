// Payment amounts available for selection
export const PAYMENT_AMOUNTS = {
  SMALL: 10,
  MEDIUM: 20,
  LARGE: 50,
  EXTRA_LARGE: 100
};

// API endpoints for payment processing
export const API_ENDPOINTS = {
  INITIALIZE_PAYMENT: '/api/payments/initialize',
  CONFIRM_PAYMENT: '/api/payments/confirm'
};

// Stripe card element styling options
export const STRIPE_CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};