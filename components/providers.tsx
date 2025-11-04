'use client';

import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { ConvexProvider } from 'convex/react';
import store from '@/store';
import theme from '@/styles/theme';
import { convex } from '@/lib/convex';
import ModalContextProvider from '@/context/modal-context';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import CartModal from '@/components/organisms/CartModal';
import CheckoutModal from '@/components/organisms/CheckoutModal';
import Overlay from '@/components/atoms/Overlay';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={theme}>
      <ConvexProvider client={convex}>
        <Provider store={store}>
          <ModalContextProvider>
            <Box bg="#ffffff" minH="100vh">
              <Header />
              {children}
              <Footer />
            </Box>
            <CartModal />
            <CheckoutModal />
            <Overlay />
          </ModalContextProvider>
        </Provider>
      </ConvexProvider>
    </ChakraProvider>
  );
}

