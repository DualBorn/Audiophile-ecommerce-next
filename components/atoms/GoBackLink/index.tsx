'use client'

import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { ReactElement } from 'react'

const GoBackLink = (): ReactElement => {
  const router = useRouter()

  return (
    <Button
      as="button"
      variant="ghost"
      onClick={() => router.back()}
      mt={{ base: '1rem', sm: '2rem', lg: '5rem' }}
      fontSize="0.9375rem"
      textTransform="capitalize"
    >
      Go back
    </Button>
  )
}

export default GoBackLink
