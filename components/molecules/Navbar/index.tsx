import { Container, Flex } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import Logo from '@/components/atoms/Logo'
import MenuIcon from '@/components/atoms/MenuIcon'
import CartIcon from '@/components/atoms/CartIcon'
import NavLinks from '@/components/molecules/NavLinks'

const Navbar = (): ReactElement => {
  return (
    <Container maxW="container.lg" px={6} mx="auto">
      <Flex
        justify="space-between"
        position="relative"
        zIndex="modal"
        pb={{ base: 0, sm: 8 }}
        borderBottom={{ base: '1px solid', sm: '1px solid' }}
        borderColor="divider"
      >
        <MenuIcon />
        <Logo />
        <NavLinks />
        <CartIcon />
      </Flex>
    </Container>
  )
}

export default Navbar
