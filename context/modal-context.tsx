'use client';

import { createContext, useEffect, useContext, ReactNode } from 'react'
import { useDisclosure } from '@chakra-ui/react'

type ContextProps = {
  isCartModalOpen: boolean
  onCartModalOpen: () => void
  onCartModalClose: () => void
  isCheckoutModalOpen: boolean
  onCheckoutModalOpen: () => void
  onCheckoutModalClose: () => void
}

const initialState = {
  isCartModalOpen: false,
  onCartModalOpen: () => undefined,
  onCartModalClose: () => undefined,
  isCheckoutModalOpen: false,
  onCheckoutModalOpen: () => undefined,
  onCheckoutModalClose: () => undefined,
}

const ModalContext = createContext<ContextProps>(initialState)

export const useModal = (): ContextProps => {
  return useContext(ModalContext)
}

const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    open: isCartModalOpen,
    onOpen: onCartModalOpen,
    onClose: onCartModalClose,
  } = useDisclosure()

  const {
    open: isCheckoutModalOpen,
    onOpen: onCheckoutModalOpen,
    onClose: onCheckoutModalClose,
  } = useDisclosure()

  useEffect(() => {
    isCartModalOpen || isCheckoutModalOpen
      ? (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = 'initial')
  }, [isCartModalOpen, isCheckoutModalOpen])

  return (
    <ModalContext.Provider
      value={{
        isCartModalOpen,
        onCartModalOpen,
        onCartModalClose,
        isCheckoutModalOpen,
        onCheckoutModalOpen,
        onCheckoutModalClose,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export default ModalContextProvider

