'use client'

import React, { useState } from 'react'
import { Box, Heading, Text, Button, HStack, Spinner } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'

import { Product } from '@/models/Product'
import { addItemToCart } from '@/store/CartSlice'
import ProductQuantity from '@/components/atoms/ProductQuantity'

const ProductDescription = ({ product }: { product: Product }): React.JSX.Element => {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const dispatch = useDispatch()

  const addToCart = async () => {
    if (isAdding) return
    
    setIsAdding(true)
    // Brief delay for UX feedback
    await new Promise(resolve => setTimeout(resolve, 300))
    
    dispatch(
      addItemToCart({
        id: product.id,
        shortName: product.shortName,
        cartImage: product.cartImage,
        price: product.price,
        quantity,
      })
    )
    
    setIsAdding(false)
  }

  const increment = () => {
    setQuantity(state => state + 1)
  }

  const decrement = () => {
    if (quantity <= 1) return
    setQuantity(state => state - 1)
  }

  return (
    <Box textAlign={{ base: 'left' }} flexBasis={{ sm: '60%', lg: '50%' }}>
      <Heading
        as="h2"
        textTransform="uppercase"
        fontSize={{ base: '1.75rem', lg: '2.5rem' }}
        letterSpacing="0.0625rem"
        mb={{ base: '1.5rem' }}
        maxWidth={{ base: '13ch' }}
      >
        {product.new && (
          <Box
            as="strong"
            display="block"
            textTransform="uppercase"
            color="accent"
            fontSize="0.875rem"
            letterSpacing="0.625rem"
            fontWeight="normal"
            mb={{ base: '1.5rem', sm: '1rem' }}
          >
            New Product
          </Box>
        )}
        {product.name}
      </Heading>
      <Text mb={{ base: '1.5rem' }} pr={{ lg: '2rem' }}>
        {product.description}
      </Text>
      <Text
        mt={{ base: '1.5rem' }}
        fontWeight="bold"
        fontSize="1.125rem"
        color="black"
      >
        $ {product?.price?.toLocaleString('en-US')}
      </Text>
      <HStack
        gap={{ base: '1rem' }}
        mt={{ base: '2rem' }}
        alignItems={{ base: 'stretch' }}
      >
        {/* Quantity selector - user can choose how many items to add */}
        <ProductQuantity
          quantity={quantity}
          increment={increment}
          decrement={decrement}
          width="7.5rem"
          height="3rem"
        />
        
        <Button 
          onClick={addToCart} 
          disabled={isAdding}
          // @ts-expect-error - Custom recipe variant
          variant="primary"
          className="px-10 py-[1.125rem]"
          style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingTop: '1.125rem', paddingBottom: '1.125rem' }}
          position="relative"
        >
          {isAdding ? (
            <HStack gap="0.5rem" justify="center">
              <Spinner size="sm" color="white" />
              <Box as="span">Adding...</Box>
            </HStack>
          ) : (
            'Add to Cart'
          )}
        </Button>
      </HStack>
    </Box>
  )
}

export default ProductDescription
