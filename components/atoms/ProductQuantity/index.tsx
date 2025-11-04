import { Flex, Button as ChakraButton, Center } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

const ProductQuantity = ({
  quantity,
  increment,
  decrement,
  width,
  height,
}: {
  quantity: number
  increment: () => void
  decrement: () => void
  width: string
  height: string
}): ReactElement => {
  return (
    <Flex bg="gray" alignItems="center" width={width} height={height}>
      <Button sign="-" handleClick={decrement} />
      <Center fontSize="0.8125rem" fontWeight="bold" width="20%">
        {quantity}
      </Center>
      <Button sign="+" handleClick={increment} />
    </Flex>
  )
}

const Button = ({
  sign,
  handleClick,
}: {
  sign: string
  handleClick: () => void
}): ReactElement => {
  return (
    <ChakraButton
      onClick={handleClick}
      width="40%"
      height="100%"
      color="text"
      fontSize="0.9375rem"
      fontWeight="bold"
      border="none"
      p="0"
      bg="transparent"
      _hover={{
        bg: 'lightGray',
        color: 'accent',
      }}
    >
      {sign}
    </ChakraButton>
  )
}

export default ProductQuantity
