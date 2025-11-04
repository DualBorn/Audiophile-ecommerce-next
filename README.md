# Audiophile E-commerce Website

A full-stack e-commerce website for an audio equipment store, built with Next.js, React, and Convex. This project features a complete shopping cart system, checkout flow, order management, and automated email confirmations.

## What This Project Does

This is a pixel-perfect e-commerce website for selling headphones, speakers, and earphones. Users can browse products by category, view detailed product pages, add items to their cart, and complete purchases. When an order is placed, the system automatically saves the order to Convex database and sends a confirmation email to the customer.

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Chakra UI v3** - Component library and styling
- **Redux Toolkit** - State management for cart and UI
- **Framer Motion** - Animations and transitions
- **React Hook Form** - Form validation and handling
- **Zod** - Schema validation
- **React Intersection Observer** - Scroll animations
- **clsx** - Conditional class names utility

### Backend
- **Convex** - Backend-as-a-service for database and real-time features
- **Nodemailer** - Email sending via SMTP
- **Next.js API Routes** - Server-side API endpoints

### Development Tools
- **TypeScript** - Type safety
- **ESLint** - Code linting
- **Husky** - Git hooks
- **Commitlint** - Commit message linting
- **Tailwind CSS** - Utility-first CSS

## Features

### Shopping Experience
- **Product Browsing**: Browse products by category (headphones, speakers, earphones)
- **Product Details**: View detailed product pages with images, features, specifications, and included items
- **Shopping Cart**: Add/remove items, adjust quantities, view cart totals
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop

### Checkout Flow
- **Form Validation**: Comprehensive form validation with inline error messages
- **Payment Options**: Support for e-money and cash on delivery
- **Order Summary**: Real-time order summary with itemized breakdown
- **Order Processing**: Loading states and visual feedback during checkout

### Order Management
- **Order Storage**: Orders automatically saved to Convex database
- **Order Confirmation**: Customers receive HTML email confirmation with order details
- **Order Tracking**: Unique order IDs for each purchase

### User Experience
- **Animations**: Smooth page transitions and scroll animations
- **Accessibility**: Skip links, ARIA labels, keyboard navigation
- **Modal Management**: Cart and checkout confirmation modals
- **Loading States**: Visual feedback during async operations

## Project Structure

```
audiophile-ecommerce-next/
├── app/                          # Next.js App Router pages
│   ├── [category]/              # Dynamic category pages
│   │   └── [slug]/              # Dynamic product pages
│   ├── api/
│   │   └── send-email/          # Email sending API route
│   ├── checkout/                # Checkout page
│   └── page.tsx                 # Homepage
├── components/
│   ├── atoms/                   # Basic reusable components
│   ├── molecules/               # Composite components
│   ├── organisms/               # Complex feature components
│   └── templates/               # Page-level templates
├── convex/                      # Convex backend functions
│   ├── orders.ts               # Order mutations and queries
│   └── schema.ts               # Database schema
├── store/                       # Redux store and slices
│   ├── CartSlice.ts            # Cart state management
│   ├── UISlice.ts              # UI state (modals, navigation)
│   └── index.ts                # Store configuration
├── lib/                         # Utility functions
│   ├── convex.ts               # Convex client setup
│   ├── email.ts                # Email sending utilities
│   ├── products.ts             # Product data helpers
│   ├── links.ts                 # Navigation links
│   ├── localStorage.ts          # LocalStorage utilities
│   └── toaster.ts              # Toast notifications
├── data/                        # Static data
│   └── products.ts             # Product catalog
├── constants/                   # Application constants
│   └── fees.ts                 # Shipping and tax constants
├── context/                     # React context providers
│   └── modal-context.tsx       # Modal state management
├── hooks/                       # Custom React hooks
│   └── useCartTotals.tsx       # Cart totals calculation hook
├── models/                      # TypeScript type definitions
│   ├── CartItem.ts             # Cart item type
│   ├── Product.ts               # Product type
│   └── Params.ts                # Route params types
├── components/                  # React components
│   └── providers.tsx           # App providers (Redux, Convex, Chakra)
└── styles/                      # Theme and styling
    ├── theme.ts                # Chakra UI theme configuration
    └── components/              # Component-specific styles
        ├── button.ts            # Button component styles
        ├── input.ts             # Input component styles
        └── text.ts              # Text component styles
```

## Getting Started

### Prerequisites

- Node.js 18+ (or use pnpm/npm/yarn)
- pnpm (recommended) or npm/yarn
- A Convex account (free tier works)
- SMTP email credentials (Gmail App Password or other SMTP provider)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd audiophile-ecommerce-next
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up Convex**
   ```bash
   npx convex dev
   ```
   This will create a `.env.local` file with your Convex URL.

4. **Configure environment variables**
   
   Create or update `.env.local` with the following:
   ```env
   # Convex (automatically added by 'npx convex dev')
   NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

   # SMTP Email Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password

   # Site URL (for email links)
   NEXT_PUBLIC_SITE_URL=https://your-site.com
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables Explained

### Convex
- `NEXT_PUBLIC_CONVEX_URL` - Your Convex deployment URL. Get this by running `npx convex dev` or from your Convex dashboard.

### Email (SMTP)
- `SMTP_HOST` - Your SMTP server (e.g., `smtp.gmail.com` for Gmail)
- `SMTP_PORT` - Port number (587 for TLS, 465 for SSL)
- `SMTP_SECURE` - Set to `true` for SSL (port 465), `false` for TLS (port 587)
- `SMTP_USER` - Your email address
- `SMTP_PASSWORD` - Your email password or app password (Gmail requires App Password)

### Site Configuration
- `NEXT_PUBLIC_SITE_URL` - Your deployed site URL (used in email links)

## Setting Up Email (Gmail Example)

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate an App Password**:
   - Go to Google Account → Security → App passwords
   - Create a new app password for "Mail"
   - Copy the 16-character password
3. **Use the App Password** in `SMTP_PASSWORD` (not your regular Gmail password)

For other email providers, check their SMTP settings documentation.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Create production build
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking

## How It Works

### Adding to Cart
1. User selects quantity and clicks "Add to Cart"
2. Product added to Redux cart state
3. Cart icon updates with item count
4. Loading state shows on button during add

### Checkout Process
1. User fills out checkout form (billing, shipping, payment)
2. Form validates all fields with real-time error messages
3. On submit:
   - Order data saved to Convex database
   - Confirmation email sent via Nodemailer
   - Cart cleared
   - Success modal displayed with order summary

### Order Storage
- Orders stored in Convex with:
  - Customer details (name, email, phone)
  - Shipping address (address, city, country, zip)
  - Items (product ID as string, name, slug, price, quantity)
  - Totals (subtotal, shipping, taxes, grand total)
  - Order status (confirmed, pending, or cancelled) and timestamp

### Email Sending
- When checkout completes, API route `/api/send-email` is called
- Nodemailer sends HTML email with:
  - Personalized greeting
  - Order ID
  - Itemized order summary
  - Shipping address
  - Support contact information
  - "View Your Order" link

## Database Schema

The Convex database has one table: `orders`

```typescript
{
  customer: {
    name: string
    email: string
    phone: string
  }
  shipping: {
    address: string
    city: string
    country: string
    zip: string
  }
  items: Array<{
    id: string
    name: string
    slug: string
    price: number
    quantity: number
  }>
  totals: {
    subtotal: number
    shipping: number
    taxes: number
    grandTotal: number
  }
  status: "confirmed" | "pending" | "cancelled"
  createdAt: number
}
```

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Import project to Vercel**
3. **Add environment variables** in Vercel dashboard
4. **Deploy**

### Environment Variables for Production

Make sure to add all environment variables in your deployment platform:
- `NEXT_PUBLIC_CONVEX_URL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `NEXT_PUBLIC_SITE_URL`

### Convex Production Deployment

For production, use Convex production deployment:
```bash
npx convex deploy
```

Update `NEXT_PUBLIC_CONVEX_URL` in your production environment with the production Convex URL.

## File Submission

The project includes an `order-confirmation-email-template.html` file that shows the HTML structure of the confirmation email sent to customers. This matches the actual email sent by the system.

## Troubleshooting

### Convex Connection Issues
- Make sure `NEXT_PUBLIC_CONVEX_URL` is correct
- Ensure Convex dev server is running (`npx convex dev`)
- Check browser console for connection errors

### Email Not Sending
- Verify SMTP credentials are correct
- For Gmail, make sure you're using an App Password, not your regular password
- Check SMTP port (587 for TLS, 465 for SSL)
- Check firewall/network settings if getting timeout errors

### Build Errors
- Run `pnpm install` to ensure all dependencies are installed
- Check TypeScript errors with `pnpm type-check`
- Clear `.next` folder and rebuild if needed

## License

This project is private and proprietary.

## Contact

For questions or issues, please contact the project maintainer.
