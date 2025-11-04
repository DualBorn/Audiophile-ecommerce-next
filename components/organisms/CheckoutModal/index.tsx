'use client'

/**
 * Checkout Success Modal Component
 * 
 * This modal appears after a successful checkout. It shows:
 * - Thank you message
 * - Order summary (items ordered)
 * - Grand total
 * - "Back to home" button
 * 
 * We preserve cart items when the modal opens because the cart
 * gets cleared immediately after order submission, but we still
 * want to show what was ordered in the modal.
 */

import React, { useState } from 'react'
import {
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  Heading,
  Text,
  Flex,
  Button,
  Stack,
  Box,
  Image,
} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'

import { clearCart, cartItems } from '@/store/CartSlice'
import { useModal } from '@/context/modal-context'
import SummaryItem from '@/components/molecules/SummaryItem'
import { SHIPPING_FEE, TAX_RATE } from '@/constants/fees'

const CheckoutModal = (): React.JSX.Element => {
  // Get current cart items from Redux store
  const currentItems = useSelector(cartItems)
  
  // Track if user wants to see all items or just the first one
  const [showMore, setShowMore] = useState(false)
  
  // Preserve items and totals from checkout
  const [preservedItems, setPreservedItems] = useState<typeof currentItems>([])
  const [preservedTotals, setPreservedTotals] = useState<{
    cartTotal: number
    tax: number
    grandTotal: number
  } | null>(null)
  
  const { isCheckoutModalOpen, onCheckoutModalClose } = useModal()
  const dispatch = useDispatch()

  /**
   * Capture items and totals when modal opens
   * 
   * First try to get from sessionStorage (set by CheckoutForm before clearing cart)
   * If not available, try to get from current cart items
   * This ensures we always show the correct order summary even after cart is cleared
   */
  React.useEffect(() => {
    if (isCheckoutModalOpen) {
      // First, try to get from sessionStorage (captured before cart was cleared)
      const storedItems = sessionStorage.getItem('checkoutItems')
      const storedTotals = sessionStorage.getItem('checkoutTotals')
      
      if (storedItems) {
        try {
          const parsed = JSON.parse(storedItems)
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPreservedItems(parsed)
            // Clear sessionStorage after using it
            sessionStorage.removeItem('checkoutItems')
          }
        } catch (e) {
          console.error('Failed to parse stored checkout items:', e)
        }
      }
      
      if (storedTotals) {
        try {
          const parsed = JSON.parse(storedTotals)
          setPreservedTotals(parsed)
          // Clear sessionStorage after using it
          sessionStorage.removeItem('checkoutTotals')
        } catch (e) {
          console.error('Failed to parse stored checkout totals:', e)
        }
      }
      
      // If no stored items, try current cart items (fallback)
      if (currentItems.length > 0 && preservedItems.length === 0) {
        setPreservedItems([...currentItems])
      }
    }
  }, [isCheckoutModalOpen, currentItems, preservedItems.length])
  
  // Calculate totals from preserved items if we don't have stored totals
  const calculateTotals = () => {
    if (preservedTotals) {
      return preservedTotals
    }
    
    // Calculate from preserved items
    const cartTotal = preservedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const tax = cartTotal * TAX_RATE
    const grandTotal = cartTotal + tax + SHIPPING_FEE
    
    return { cartTotal, tax, grandTotal }
  }
  
  const { grandTotal } = calculateTotals()

  // Use preserved items if available, otherwise use current items
  // This ensures we always show something in the modal
  const items = preservedItems.length > 0 ? preservedItems : currentItems

  /**
   * Handle "Back to home" button click
   * 
   * When user clicks this button, we close the modal and
   * clear the cart (if it hasn't been cleared already).
   */
  const handleClick = () => {
    onCheckoutModalClose()
    dispatch(clearCart())
  }

  /**
   * Handle modal close
   * 
   * When the modal closes (by clicking outside or pressing ESC),
   * we also clear the cart.
   */
  const onModalClose = () => {
    onCheckoutModalClose()
    dispatch(clearCart())
  }

  return (
    <DialogRoot
      open={isCheckoutModalOpen}
      closeOnInteractOutside={false}
      closeOnEscape={false}
      onOpenChange={(details) => {
        if (!details.open) onModalClose()
      }}
    >
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent
          p={{ base: '2rem', md: '3rem' }}
          mx={{ base: '1.5rem', md: '2rem' }}
          maxWidth={{ sm: '25.6875rem', md: '33.75rem' }}
        >
        <Image
          src="/images/shared-images/desktop/icon-check-mark.svg"
          boxSize="4rem"
          aria-hidden="true"
          alt=""
          mb={{ base: '1.5rem' }}
        />
        <Heading
          textTransform="uppercase"
          lineHeight="1.125"
          fontSize={{ base: '1.5rem', sm: '2rem' }}
          mb={{ base: '1.125rem', md: '1.5rem' }}
        >
          Thank you{' '}
          <Box as="span" display="block">
            For your order
          </Box>
        </Heading>
        <Text mb={{ base: '1.375rem', md: '2rem' }}>
          You will receive an email confirmation shortly.
        </Text>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          borderRadius="0.5rem"
          overflowY="hidden"
          alignItems="stretch"
          mb={{ base: '1.5rem', md: '3rem' }}
        >
          <Box
            bg="gray"
            flexBasis="55%"
            flexGrow={1}
            display={items.length === 1 ? 'flex' : 'block'}
            alignItems="center"
          >
            <Stack
              as="ul"
              gap="1.5rem"
              px="1.5rem"
              pt="1.5rem"
              pb={items.length === 1 ? '1.5rem' : '0'}
              width="100%"
              listStyleType="none"
            >
              {items.slice(0, showMore ? items.length : 1).map(item => (
                <Box as="li" key={item.id}>
                  <SummaryItem item={item} />
                </Box>
              ))}
            </Stack>
            {items.length > 1 && (
              <Box textAlign="center" py="1rem">
                {/* @ts-ignore - Custom recipe variant "link" */}
                <Button
                  // @ts-ignore
                  variant="link"
                  fontSize="0.75rem"
                  textTransform="initial"
                  fontWeight="bold"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore
                    ? 'View less'
                    : `and ${items.length - 1} other item(s)`}
                </Button>
              </Box>
            )}
          </Box>

          <Flex
            bg="black"
            px={{ base: '1.5rem', md: '2rem' }}
            pt={{ base: '0.9375rem' }}
            py={{ base: '1.125rem', md: '2.625rem' }}
            flexBasis="45%"
            direction="column"
            justify={showMore ? 'flex-end' : 'center'}
          >
            <Text color="textLight" textTransform="uppercase" mb="0.5rem">
              Grand Total
            </Text>
            <Text color="white" fontWeight="bold">
              $ {grandTotal.toLocaleString()}
            </Text>
          </Flex>
        </Flex>
        <Link href="/">
          {/* @ts-ignore - Custom recipe variant "primary" */}
          <Button 
            cursor="pointer" 
            onClick={handleClick}
            // @ts-ignore
            variant="primary"
            className="px-10 py-[1.125rem]"
            style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingTop: '1.125rem', paddingBottom: '1.125rem' }}
          >
            Back to home
          </Button>
        </Link>
      </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  )
}

export default CheckoutModal
