import React from 'react'
import { Stack } from '@chakra-ui/react'

import CategoryLink from '@/components/molecules/CategoryLink'
import { links } from '@/lib/links'

const CategoriesLinks = (): React.JSX.Element => {
  return (
    <Stack
      as="ul"
      direction={['column', 'row']}
      gap={{ base: '4rem', sm: '0.625rem', md: '0.625rem', lg: '1.875rem' }}
      mt={{ base: '5.75rem', sm: '9.25rem', lg: '12.5rem' }}
      justify="space-between"
      align="stretch"
    >
      {links.slice(1).map(link => (
        <CategoryLink {...link} key={link.id} />
      ))}
    </Stack>
  )
}

export default CategoriesLinks
