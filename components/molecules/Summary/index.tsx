/**
 * Checkout Summary Component
 * 
 * This component shows the order summary on the checkout page.
 * It displays:
 * - List of items in the cart
 * - Order totals (subtotal, shipping, VAT, grand total)
 * - "Continue & Pay" button with loading state
 * 
 * When the user clicks "Continue & Pay", it submits the checkout form.
 */

import {
  Box,
  Heading,
  Text,
  Image,
  HStack,
  Stack,
  Button,
  Spinner,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'

import { cartItems } from '@/store/CartSlice'
import { SHIPPING_FEE } from '@/constants/fees'
import SummaryLine from '@/components/molecules/SummaryLine'
import useCartTotals from '@/hooks/useCartTotals'
import { Dispatch, SetStateAction, useEffect } from 'react'

const Summary = ({
  isDisabled,
  setIsDisabled,
  isSubmitting,
}: {
  isDisabled: boolean
  setIsDisabled: Dispatch<SetStateAction<boolean>>
  isSubmitting?: boolean
}): React.JSX.Element => {
  // Get cart items from Redux store
  const items = useSelector(cartItems)
  
  // Calculate cart totals (subtotal, tax, grand total)
  // This hook does all the math for us
  const { cartTotal, tax, grandTotal } = useCartTotals()

  /**
   * Auto-disable form if cart is empty
   * 
   * If the cart has no items, we disable the form so the user
   * can't submit an empty order. This runs whenever the cart changes.
   */
  useEffect(() => {
    setIsDisabled(items.length < 1)
  }, [items, setIsDisabled])

  return (
    <Box
      px={{ base: '1.5rem', sm: '2rem' }}
      py={{ base: '2rem' }}
      bg="white"
      flexGrow={{ lg: 1 }}
    >
      <Heading fontSize={{ base: '1.125rem' }} letterSpacing="0.0806rem">
        Summary
      </Heading>
      {items.length > 0 ? (
        <Stack as="ul" gap="1.5rem" mt="2rem" listStyleType="none">
          {items.map(item => (
            <Box as="li" key={item.id}>
              <HStack align="center" gap="1.5rem">
              <Image
                src={item.cartImage}
                borderRadius="0.5rem"
                boxSize="4rem"
              />
              <Box width="100%">
                <HStack justify="space-between" width="100%">
                  <Text
                    fontWeight="bold"
                    fontSize="0.9375rem"
                    color="black"
                    textTransform="uppercase"
                  >
                    {item.shortName}
                  </Text>
                  <Text
                    fontWeight="bold"
                    fontSize="0.9375rem"
                    alignSelf="flex-start"
                  >
                    x{item.quantity}
                  </Text>
                </HStack>

                <Text fontWeight="bold" fontSize="0.875rem">
                  $ {item.price.toLocaleString('en-US')}
                </Text>
              </Box>
              </HStack>
            </Box>
          ))}
        </Stack>
      ) : (
        <Text textAlign="center" mt="1.5rem" fontWeight="bold">
          No Items in cart
        </Text>
      )}

      {/* Order totals section */}
      <Box mt="2rem">
        {/* Show subtotal, shipping, and VAT */}
        <SummaryLine name="total" amount={cartTotal} />
        <SummaryLine name="shipping" amount={SHIPPING_FEE} />
        <SummaryLine name="vat (included)" amount={tax} />
        
        {/* Grand total - highlighted with special styling */}
        <SummaryLine
          name="Grand Total"
          amount={grandTotal}
          mt="1.5rem"
          grandTotal
        />
        
        {/* Submit button - submits the checkout form */}
        {/* @ts-expect-error - Custom recipe variant (Chakra UI v3) */}
        <Button 
          type="submit" 
          width="100%" 
          mt="2rem" 
          disabled={isDisabled || isSubmitting} // Disable if cart is empty or already submitting
          variant="primary"
          className="px-10 py-[1.125rem]"
          style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingTop: '1.125rem', paddingBottom: '1.125rem' }}
          position="relative"
        >
          {/* Show loading spinner and "Processing..." text while order is being processed */}
          {isSubmitting ? (
            <HStack gap="0.5rem" justify="center">
              <Spinner size="sm" color="white" />
              <Box as="span">Processing...</Box>
            </HStack>
          ) : (
            // Normal state - just show "Continue & Pay" text
            'Continue & Pay'
          )}
        </Button>
      </Box>
    </Box>
  )
}

export default Summary
