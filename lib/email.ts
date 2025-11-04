/**
 * Email Utility Functions
 * 
 * This file contains helper functions for sending emails.
 * It provides a clean interface for the checkout form to send
 * order confirmation emails without directly calling the API route.
 */

/**
 * Interface for order email data
 * 
 * This defines the structure of the data we need to send an email.
 * It includes customer info, order details, items, totals, and shipping address.
 */
export interface OrderEmailData {
  customerName: string
  customerEmail: string
  orderId: string
  items: Array<{
    name: string
    price: number
    quantity: number
  }>
  totals: {
    subtotal: number
    shipping: number
    taxes: number
    grandTotal: number
  }
  shippingAddress: {
    address: string
    city: string
    zip: string
    country: string
  }
}

/**
 * Send order confirmation email
 * 
 * This function sends an order confirmation email to the customer.
 * It calls the /api/send-email API route which handles the actual
 * email sending using Nodemailer.
 * 
 * Returns a success/failure result so the checkout form knows
 * if the email was sent successfully.
 */
export async function sendOrderConfirmationEmail(
  data: OrderEmailData
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    /**
     * Call the email API route
     * 
     * We send a POST request to /api/send-email with all the order data.
     * The API route handles connecting to the SMTP server and sending the email.
     */
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: data.customerEmail,           // Customer's email address
        customerName: data.customerName,  // Customer's name
        orderId: data.orderId,            // Unique order ID from Convex
        items: data.items,                // Array of items ordered
        totals: data.totals,              // Order totals
        shippingAddress: data.shippingAddress, // Shipping address
      }),
    })

    // Get the response from the API route
    const result = await response.json()

    // If the API route returned an error, return failure
    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to send email',
      }
    }

    // If email was sent successfully, return success with message ID
    return {
      success: true,
      messageId: result.messageId,
    }
  } catch (error) {
    /**
     * Error handling
     * 
     * If something goes wrong (network error, etc.), we catch it
     * and return a failure result instead of throwing an error.
     */
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

