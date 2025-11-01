/**
 * Checkout form validation schema using Zod
 * Validates all checkout form fields
 */
import { z } from 'zod';

export const checkoutSchema = z.object({
  // Billing Details
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),

  // Shipping Info
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().min(1, 'ZIP code is required').max(10, 'ZIP code is too long'),
  country: z.string().min(1, 'Country is required'),

  // Payment Details
  paymentMethod: z.enum(['eMoney', 'cashOnDelivery']),
  eMoneyNumber: z.string().optional(),
  eMoneyPIN: z.string().optional(),
}).refine(
  (data) => {
    // If eMoney is selected, both eMoneyNumber and eMoneyPIN must be provided
    if (data.paymentMethod === 'eMoney') {
      return data.eMoneyNumber && data.eMoneyPIN;
    }
    return true;
  },
  {
    message: 'e-Money number and PIN are required',
    path: ['eMoneyNumber'],
  }
);

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

