import React from 'react'
import { Box, Text, HStack } from '@chakra-ui/react'
import Image from 'next/image'
import type { CartItem } from '@/models/CartItem'

const SummaryItem = ({ item }: { item: CartItem }): React.JSX.Element => {
  return (
    <HStack
      align="center"
      as="li"
      key={item.id}
      gap="0.5rem"
      position="relative"
      width="100%"
      css={{
        '&:last-child:not(:first-of-type)::after': {
          content: "''",
          position: 'absolute',
          width: '100%',
          height: '1px',
          left: 0,
          bottom: '-0.5rem',
          bg: 'rgba(0,0,0,.1)',
        },
      }}
    >
      <Box
        position="relative"
        width="4rem"
        height="4rem"
        flexShrink={0}
      >
        <Image 
          src={item.cartImage} 
          alt={item.shortName}
          width={64}
          height={64}
          style={{ borderRadius: '0.5rem', width: '100%', height: '100%' }}
          onError={(e) => {
            console.error('Image failed to load:', item.cartImage, item)
          }}
        />
      </Box>
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
          <Text fontWeight="bold" fontSize="0.9375rem" alignSelf="flex-start">
            x{item.quantity}
          </Text>
        </HStack>
        <Text fontWeight="bold" fontSize="0.875rem">
          $ {item.price.toLocaleString('en-US')}
        </Text>
      </Box>
    </HStack>
  )
}

export default SummaryItem
