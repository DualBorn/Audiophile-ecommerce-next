'use client'

import { Box, Center } from '@chakra-ui/react'
import React from 'react'

type RadioProps = {
  value?: string
  checked?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  children: React.ReactNode
} & React.InputHTMLAttributes<HTMLInputElement>

const Radio: React.FC<RadioProps> = ({ value, checked, onChange, children, ...props }): React.JSX.Element => {
  return (
    <Box
      as="label"
      border="1px solid"
      borderColor="inputBorder"
      py="1rem"
      borderRadius="0.5rem"
      fontWeight="bold"
      fontSize="0.875rem"
      display="block"
      pl="3.25rem"
      position="relative"
      mb="1rem"
      cursor="pointer"
      css={{
        'input:checked ~ div::after': {
          transform: 'scale(1)',
        },
        '&:focus-within': {
          borderColor: 'var(--chakra-colors-accent)',
        },
      }}
    >
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
        {...props}
      />
      <Center
        width="20px"
        height="20px"
        border="1px solid"
        borderColor="inputBorder"
        borderRadius="50%"
        position="absolute"
        left="1rem"
        pointerEvents="none"
        _after={{
          content: "''",
          position: 'absolute',
          bg: 'accent',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          transform: checked ? 'scale(1)' : 'scale(0)',
          transition: 'transform 0.3s linear',
        }}
      />
      {children}
    </Box>
  )
}

export default Radio
