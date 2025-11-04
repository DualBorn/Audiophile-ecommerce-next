import { Button } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

const SkipLink = (): ReactElement => {
  return (
    <Button
      as="a"
      href="#main"
      position="absolute"
      left="1rem"
      top="6.25rem"
      zIndex="skipLink"
      transform="translateX(-200%)"
      _focus={{
        transform: 'translateX(0)',
      }}
      transition="transform 0.3s ease-out"
    >
      Skip to content
    </Button>
  )
}

export default SkipLink
