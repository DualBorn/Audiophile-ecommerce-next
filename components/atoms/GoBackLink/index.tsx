'use client'

import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

const GoBackLink = (): JSX.Element => {
  const router = useRouter()

  return (
    <Button
      as="button"
      variant="link"
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
