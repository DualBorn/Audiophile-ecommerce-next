/**
 * Order confirmation email API route
 * Uses Nodemailer to send emails via SMTP
 */
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, customerName, orderId, items, totals, shippingAddress } = body

    if (!to || !customerName || !orderId || !items || !totals) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate SMTP credentials
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      return NextResponse.json(
        { error: 'SMTP credentials not configured' },
        { status: 500 }
      )
    }

    // Configure SMTP transporter
    const smtpPort = parseInt(process.env.SMTP_PORT || '587')
    const useSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465
    const transporterConfig: any = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: smtpPort,
      secure: useSecure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      connectionTimeout: 20000,
      socketTimeout: 20000,
      greetingTimeout: 20000,
      pool: false,
      maxConnections: 1,
      maxMessages: 1,
    }
    
    if (!useSecure) {
      transporterConfig.tls = {
        rejectUnauthorized: false, // Allow self-signed certs in dev
      }
    }
    
    const transporter = nodemailer.createTransport(transporterConfig)

    // Verify SMTP connection
    try {
      await transporter.verify()
    } catch (verifyError: any) {
      let errorMessage = 'SMTP connection failed'
      let helpfulHint = ''
      
      if (verifyError.code === 'EAUTH' || verifyError.responseCode === 535) {
        errorMessage = 'Gmail authentication failed'
        helpfulHint = 'Use an App Password, not your regular Gmail password. Generate at: https://myaccount.google.com/apppasswords'
      } else if (verifyError.code === 'ETIMEDOUT') {
        errorMessage = 'SMTP connection timeout'
        helpfulHint = 'Try changing SMTP_PORT to 465 in .env.local'
      }
      
      return NextResponse.json(
        { 
          error: errorMessage, 
          details: verifyError instanceof Error ? verifyError.message : 'Unknown error',
          hint: helpfulHint,
        },
        { status: 500 }
      )
    }

    // Build email HTML template
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #D87D4A;
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background-color: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 8px 8px;
          }
          .order-summary {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
          }
          .item:last-child {
            border-bottom: none;
          }
          .total {
            font-weight: bold;
            font-size: 18px;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid #333;
          }
          .button {
            display: inline-block;
            background-color: #D87D4A;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
          }
          .button a{
          color: white;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            color: #666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Thank You for Your Order, ${customerName}!</h1>
          <p>Order #${orderId}</p>
        </div>
        <div class="content">
          <p>Dear ${customerName},</p>
          <p>We're excited to confirm your order has been received and is being processed.</p>
          
          <div class="order-summary">
            <h2>Order Summary</h2>
            ${items
              .map(
                (item: any) => `
              <div class="item">
                <div>
                  <strong>${item.name}</strong>
                  <br>
                  <small>Quantity: ${item.quantity} × $${item.price.toLocaleString()}</small>
                </div>
                <div>$${(item.price * item.quantity).toLocaleString()}</div>
              </div>
            `
              )
              .join('')}
            
            <div class="item">
              <div>Subtotal:</div>
              <div> $${totals.subtotal.toLocaleString()}</div>
            </div>
            <div class="item">
              <div>Shipping:</div>
              <div> $${totals.shipping.toLocaleString()}</div>
            </div>
            <div class="item">
              <div>VAT (included):</div>
              <div> $${totals.taxes.toLocaleString()}</div>
            </div>
            <div class="total">
              <div style="display: flex; justify-content: space-between;">
                <span>Grand Total:</span>
                <span> $${totals.grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div style="margin-top: 30px;">
            <h3>Shipping Address</h3>
            <p>
              ${shippingAddress.address}<br>
              ${shippingAddress.city}, ${shippingAddress.zip}<br>
              ${shippingAddress.country}
            </p>
          </div>

          <p>You will receive another email once your order ships.</p>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://audiophilehngtask.com'}/order-confirmation/${orderId}" class="button">
              View Your Order
            </a>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <h3>Need Help?</h3>
            <p>If you have any questions about your order, please contact our support team:</p>
            <p>
              <strong>Email:</strong> support@audiophile.com<br>
              <strong>Phone:</strong> +1 (555) 123-4567<br>
              <strong>Hours:</strong> Monday - Friday, 9am - 5pm EST
            </p>
          </div>
        </div>
        <div class="footer">
          <p>&copy; 2025 Audiophile. All rights reserved.</p>
        </div>
      </body>
      </html>
    `

    const info = await transporter.sendMail({
      from: `"Audiophile" <${process.env.SMTP_USER || 'noreply@audiophile.com'}>`,
      to,
      replyTo: 'support@audiophile.com',
      subject: `Order Confirmation #${orderId}`,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
        'List-Unsubscribe': '<mailto:unsubscribe@audiophile.com>',
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
      messageId: `order-${orderId}@audiophile.com`,
      priority: 'high',
      html: htmlContent,
      text: `
        Thank You for Your Order!
        
        Order #${orderId}
        
        Dear ${customerName},
        
        We're excited to confirm your order has been received and is being processed.
        
        Order Summary:
        ${items.map((item: any) => `- ${item.name} (${item.quantity}x) - $${item.price * item.quantity}`).join('\n')}
        
        Subtotal: $${totals.subtotal}
        Shipping: $${totals.shipping}
        VAT: $${totals.taxes}
        Grand Total: $${totals.grandTotal}
        
        Shipping Address:
        ${shippingAddress.address}
        ${shippingAddress.city}, ${shippingAddress.zip}
        ${shippingAddress.country}
        
        You will receive another email once your order ships.
        
        View Your Order: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://audiophile.com'}/order-confirmation/${orderId}
        
        Need Help?
        If you have any questions about your order, please contact our support team:
        Email: support@audiophile.com
        Phone: +1 (555) 123-4567
        Hours: Monday - Friday, 9am - 5pm EST
        
        © 2025 Audiophile. All rights reserved.
      `,
    })

    return NextResponse.json(
      { success: true, messageId: info.messageId },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { 
        error: 'Failed to send email', 
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

