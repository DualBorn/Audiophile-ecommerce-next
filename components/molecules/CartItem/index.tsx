import { Box, Text, HStack } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import React, { ReactElement } from 'react'
import ProductQuantity from '@/components/atoms/ProductQuantity'
import type { CartItem } from '@/models/CartItem'
import { increaseQuantity, decreaseQuantity } from '@/store/CartSlice'

const CartItemComponent: React.FC<{ item: CartItem }> = ({ item }): ReactElement => {
  const dispatch = useDispatch()

  const increment = () => {
    dispatch(increaseQuantity(item.id))
  }
  const decrement = () => {
    dispatch(decreaseQuantity(item.id))
  }

  return (
    <HStack justify="space-between" align="center">
      <HStack align="center" gap="1rem">
        <Image src={item.cartImage} width={64} height={64} alt="" style={{ borderRadius: '.5rem' }} />
        <Box ml="1rem">
          <Text
            fontWeight="bold"
            fontSize="0.9375rem"
            color="black"
            textTransform="uppercase"
          >
            {item.shortName}
          </Text>
          <Text fontWeight="bold" fontSize="0.875rem">
            $ {item.price.toLocaleString('en-US')}
          </Text>
        </Box>
      </HStack>
      <ProductQuantity
        quantity={item.quantity}
        increment={increment}
        decrement={decrement}
        width="6rem"
        height="2rem"
      />
    </HStack>
  )
}

export default CartItemComponent
