import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Box } from '@chakra-ui/react'

const Logo = (): React.JSX.Element => {
  return (
    <Box lineHeight="0">
      <Link href="/" style={{ textDecoration: 'none' }}>
        <Image
          src="/images/shared-images/desktop/logo.svg"
          height={25}
          width={144}
          alt="Audiophile logo - Home"
        />
      </Link>
    </Box>
  )
}

export default Logo
