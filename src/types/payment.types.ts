export type PaymentAmount = 10 | 20 | 50 | 100;

export type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

export interface PaymentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export interface PaymentError {
  message: string;
  code?: string;
}