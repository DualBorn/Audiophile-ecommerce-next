import { createSystem, defaultConfig } from '@chakra-ui/react'

import Button from './components/button'
import Text from './components/text'
import Input from './components/input'

const theme = createSystem(
  defaultConfig,
  {
    theme: {
      tokens: {
        colors: {
          bg: { value: '#ffffff' },
          accent: { value: '#d87d4a' },
          accentLight: { value: '#fbaf85' },
          gray: { value: '#f1f1f1' },
          lightGray: { value: '#d3d3d3' },
          white: { value: '#fff' },
          black: { value: '#191919' },
          text: { value: 'rgba(0,0,0,0.5)' },
          textLight: { value: 'rgba(255,255,255,0.5)' },
          divider: { value: 'rgba(255,255,255,0.1)' },
          placeholder: { value: 'rgba(0,0,0,.4)' },
          inputBorder: { value: '#CFCFCF' },
          inputError: { value: '#CD2C2C' },
        },
        fonts: {
          heading: { value: `'Manrope', sans-serif` },
          body: { value: `'Manrope', sans-serif` },
        },
        sizes: {
          container: {
            lg: { value: '72.375rem' },
          },
        },
      },
      semanticTokens: {},
      recipes: {
        button: Button,
        text: Text,
        input: Input,
      },
      textStyles: {},
      layerStyles: {},
    },
  }
)

export default theme
