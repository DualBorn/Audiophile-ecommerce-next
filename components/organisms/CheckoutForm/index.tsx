'use client'

/**
 * Checkout form - handles order submission, saves to Convex, sends confirmation email
 */

import React, { useState } from 'react'
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Image,
  HStack,
  Stack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'convex/react'
import { useSelector, useDispatch } from 'react-redux'
import { api } from '@/convex/_generated/api'

import FormLegend from '@/components/atoms/FormLegend'
import FormField from '@/components/molecules/FormField'
import Radio from '@/components/atoms/Radio'
import Summary from '@/components/molecules/Summary'
import { useModal } from '@/context/modal-context'

import { cartItems, clearCart } from '@/store/CartSlice'
import useCartTotals from '@/hooks/useCartTotals'
import { SHIPPING_FEE } from '@/constants/fees'
import { sendOrderConfirmationEmail } from '@/lib/email'
import { products } from '@/data/products'

type Inputs = {
  name: string
  emailAddress: string
  phoneNumber: string
  address: string
  ZIPCode: string
  city: string
  country: string
  eMoneyNumber: number
  eMoneyPin: number
}

const CheckoutForm = (): React.JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur' })
  
  const { onCheckoutModalOpen } = useModal()
  const options = ['e-Money', 'Cash on Delivery']
  const [checkedOption, setCheckedOption] = useState(options[0])
  const [isDisabled, setIsDisabled] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const items = useSelector(cartItems)
  const { cartTotal, tax, grandTotal } = useCartTotals()
  const dispatch = useDispatch()
  const createOrder = useMutation(api.orders.create)
  
  // Debug Convex connection on mount
  React.useEffect(() => {
    console.log('🔍 Checking Convex connection...')
    console.log('🔗 Convex URL from env:', process.env.NEXT_PUBLIC_CONVEX_URL ? 
      process.env.NEXT_PUBLIC_CONVEX_URL.substring(0, 40) + '...' : 'NOT SET')
    
    if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
      console.error('❌ NEXT_PUBLIC_CONVEX_URL is not set!')
    } else if (!process.env.NEXT_PUBLIC_CONVEX_URL.includes('.convex.cloud')) {
      console.warn('⚠️ Convex URL format might be wrong')
    } else {
      console.log('✅ Convex URL format looks correct')
    }
  }, [])

  const handleChange = (value: string) => {
    setCheckedOption(value)
  }

  // Cart only stores shortName, but orders need full name and slug
  const getProductDetails = (itemId: number) => {
    const product = products.find(p => p.id === itemId)
    return product
      ? { name: product.name, slug: product.slug }
      : { name: 'Unknown Product', slug: `product-${itemId}` }
  }

  const handleFormSubmit = async (data: Inputs) => {
    if (isDisabled || isSubmitting || items.length === 0) {
      return
    }

    setIsSubmitting(true)

    try {
      const orderData = {
        customer: {
          name: data.name,
          email: data.emailAddress,
          phone: data.phoneNumber,
        },
        shipping: {
          address: data.address,
          city: data.city,
          country: data.country,
          zip: data.ZIPCode,
        },
        items: items.map(item => {
          const productDetails = getProductDetails(item.id)
          return {
            id: item.id.toString(),
            slug: productDetails.slug,
            name: productDetails.name,
            price: item.price,
            quantity: item.quantity,
          }
        }),
        totals: {
          subtotal: cartTotal,
          shipping: SHIPPING_FEE,
          taxes: tax,
          grandTotal: grandTotal,
        },
      }

      // Save to Convex with timeout to prevent hanging
      const orderPromise = createOrder(orderData)
      let timeoutId: NodeJS.Timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error('Convex connection timeout'))
        }, 15000)
      })
      
      const orderId = await Promise.race([orderPromise, timeoutPromise]) as string
      clearTimeout(timeoutId!)

      // Send confirmation email (non-blocking - order is already saved)
      const emailResult = await sendOrderConfirmationEmail({
        customerName: data.name,
        customerEmail: data.emailAddress,
        orderId: orderId.toString(),
        items: items.map(item => {
          const productDetails = getProductDetails(item.id)
          return {
            name: productDetails.name,
            price: item.price,
            quantity: item.quantity,
          }
        }),
        totals: {
          subtotal: cartTotal,
          shipping: SHIPPING_FEE,
          taxes: tax,
          grandTotal: grandTotal,
        },
        shippingAddress: {
          address: data.address,
          city: data.city,
          zip: data.ZIPCode,
          country: data.country,
        },
      })

      if (!emailResult.success) {
        console.error('Email sending failed:', emailResult.error)
      }

      // Store items and totals BEFORE clearing cart
      // This ensures the modal can show the correct order summary
      if (items.length > 0) {
        sessionStorage.setItem('checkoutItems', JSON.stringify(items))
        sessionStorage.setItem('checkoutTotals', JSON.stringify({
          cartTotal,
          tax,
          grandTotal,
        }))
      }

      onCheckoutModalOpen()
      dispatch(clearCart())

    } catch (error) {
      console.error('Checkout error:', error)
      alert(`Failed to process your order: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Prevent default form submission to avoid page reload
  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    handleSubmit(handleFormSubmit)(e as React.FormEvent<HTMLFormElement>)
  }

  return (
    <Box
      as="form"
      // Use react-hook-form's handleSubmit to validate before calling our async handler
      onSubmit={onFormSubmit}
      // @ts-ignore - noValidate is a valid HTML form attribute
      noValidate={true}
    >
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        alignItems={{ lg: 'start' }}
        gap={{ base: '2rem' }}
        mt={{ base: '1.5rem' }}
      >
      <Box
        bg="white"
        borderRadius="0.5rem"
        px={{ base: '1.5rem', sm: '1.75rem', lg: '3rem' }}
        pt={{ base: '1.5rem', sm: '1.875rem', lg: '3.625rem' }}
        pb={{ base: '2rem', lg: '3rem' }}
        maxWidth={{ lg: '45.625rem' }}
        flex={{ lg: '1 1 65%' }}
      >
        <Heading as="h1" fontSize={{ base: '1.75rem' }} mb={{ base: '2rem' }}>
          Checkout
        </Heading>
        <Box as="fieldset" mb="2rem">
          <FormLegend>Billing Details</FormLegend>
          <SimpleGrid
            gridTemplateColumns={{ base: '1fr', sm: '1fr 1fr' }}
            gap={{ base: '1rem' }}
          >
            <FormField
              {...register('name', {
                required: 'Field cannot be empty',
                pattern: {
                  value: /^[^<>%$#^*]*$/,
                  message: 'Wrong format',
                },
              })}
              aria-invalid={errors.name ? 'true' : 'false'}
              errors={errors.name}
              label="Name"
              placeholder="Godfather (DualBorn)"
            />
            <FormField
              {...register('emailAddress', {
                required: 'Field cannot be empty',
                pattern: {
                  value: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/,
                  message: 'Wrong format',
                },
              })}
              aria-invalid={errors.emailAddress ? 'true' : 'false'}
              errors={errors.emailAddress}
              label="Email Address"
              type="email"
              placeholder="godfather@mail.com"
            />
            <FormField
              {...register('phoneNumber', {
                required: 'Field cannot be empty',
              })}
              aria-invalid={errors.phoneNumber ? 'true' : 'false'}
              errors={errors.phoneNumber}
              label="Phone Number"
              placeholder="+1 202-555-0136"
            />
          </SimpleGrid>
        </Box>
        <Box as="fieldset" mb="2rem">
          <FormLegend>Shipping Info</FormLegend>
          <SimpleGrid
            gridTemplateColumns={{ base: '1fr', sm: '1fr 1fr' }}
            gridTemplateAreas={{ sm: '"a a" "b c" "d ."' }}
            gap={{ base: '1em', sm: '1rem' }}
          >
            <FormField
              {...register('address', {
                required: 'Field cannot be empty',
              })}
              aria-invalid={errors.address ? 'true' : 'false'}
              errors={errors.address}
              gridArea={{ sm: 'a' }}
              label="Your Address"
              placeholder="1137 Williams Avenue"
            />
            <FormField
              {...register('ZIPCode', {
                required: 'Field cannot be empty',
                pattern: {
                  value: /^[0-9]{5}(?:-[0-9]{4})?$/,
                  message: 'Wrong format',
                },
              })}
              aria-invalid={errors.ZIPCode ? 'true' : 'false'}
              errors={errors.ZIPCode}
              label="ZIP Code"
              type="email"
              placeholder="10001"
              gridArea={{ sm: 'b' }}
            />
            <FormField
              {...register('city', {
                required: 'Field cannot be empty',
              })}
              aria-invalid={errors.city ? 'true' : 'false'}
              errors={errors.city}
              label="City"
              placeholder="New York"
              gridArea={{ sm: 'c' }}
            />
            <FormField
              {...register('country', {
                required: 'Field cannot be empty',
              })}
              aria-invalid={errors.country ? 'true' : 'false'}
              errors={errors.country}
              label="Country"
              placeholder="United States"
              gridArea={{ sm: 'd' }}
            />
          </SimpleGrid>
        </Box>
        <Box as="fieldset">
          <FormLegend>Payment Details</FormLegend>
          <SimpleGrid
            gridTemplateColumns={{ base: '1fr', sm: '1fr 1fr' }}
            gap={{ sm: '1rem' }}
          >
            <Text color="black" fontWeight="bold" fontSize="0.75rem" mb={2}>
              Payment Method
            </Text>
            <Box>
              {options.map(value => (
                <Radio
                  key={value}
                  value={value}
                  checked={checkedOption === value}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleChange(value)
                    }
                  }}
                  name="paymentMethod"
                >
                  {value}
                </Radio>
              ))}
            </Box>
          </SimpleGrid>
          {checkedOption === options[0] ? (
            <SimpleGrid
              gridTemplateColumns={{ base: '1fr', sm: '1fr 1fr' }}
              gap={{ base: '1rem' }}
              mt={{ base: '1rem' }}
            >
              <FormField
                {...register('eMoneyNumber', {
                  required: 'Field cannot be empty',
                  pattern: {
                    value: /^[0-9]{9}$/,
                    message: 'Wrong format',
                  },
                })}
                aria-invalid={errors.eMoneyNumber ? 'true' : 'false'}
                errors={errors.eMoneyNumber}
                label="e-Money Number"
                placeholder="238521993"
                type="number"
              />
              <FormField
                {...register('eMoneyPin', {
                  required: 'Field cannot be empty',
                  pattern: {
                    value: /^[0-9]{4}$/,
                    message: 'Wrong format',
                  },
                })}
                aria-invalid={errors.eMoneyPin ? 'true' : 'false'}
                errors={errors.eMoneyPin}
                label="e-Money PIN"
                placeholder="6891"
                type="number"
              />
            </SimpleGrid>
          ) : (
            <HStack align="center" gap="2rem" mt="1.5rem">
              <Image src="/images/checkout/icon-cash-on-delivery.svg" />
              <Text>
                The ‘Cash on Delivery’ option enables you to pay in cash when
                our delivery courier arrives at your residence. Just make sure
                your address is correct so that your order will not be
                cancelled.
              </Text>
            </HStack>
          )}
        </Box>
      </Box>
      {/* Pass isSubmitting to Summary to disable button during order processing */}
      <Summary 
        isDisabled={isDisabled || isSubmitting} 
        setIsDisabled={setIsDisabled}
        isSubmitting={isSubmitting}
      />
      </Stack>
    </Box>
  )
}

export default CheckoutForm
