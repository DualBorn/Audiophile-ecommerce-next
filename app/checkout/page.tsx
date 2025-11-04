import type { Metadata } from 'next'
import CheckoutPageTemplate from '@/components/templates/CheckoutPage'

export const metadata: Metadata = {
  title: 'Audiophile shop - checkout',
}

export default function CheckoutPage() {
  return <CheckoutPageTemplate />
}

